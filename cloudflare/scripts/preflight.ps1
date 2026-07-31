[CmdletBinding()]
param(
  [switch]$RunBuilds
)

$ErrorActionPreference = 'Stop'
$project = 'locus-t-ai-backend'
$config = 'prd'

function Invoke-Checked {
  param([string]$Label, [scriptblock]$Command)
  Write-Host "[check] $Label"
  & $Command
  if ($LASTEXITCODE -ne 0) {
    throw "$Label failed with exit code $LASTEXITCODE"
  }
}

if (-not (Get-Command doppler -ErrorAction SilentlyContinue)) {
  throw 'Doppler CLI is required.'
}

$rawNames = & doppler secrets --project $project --config $config --only-names --no-check-version
if ($LASTEXITCODE -ne 0) {
  throw 'Unable to read Doppler secret names.'
}
$secretNames = $rawNames |
  ForEach-Object { ($_ -replace '[^A-Z0-9_]', '') } |
  Where-Object { $_ -match '^[A-Z][A-Z0-9_]+$' }
$required = @(
  'CLEF_BASE_DOMAIN', 'DATABASE_URL', 'PAYLOAD_DATABASE_URL',
  'NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY', 'JWT_SECRET', 'COOKIE_SECRET',
  'PAYLOAD_SECRET', 'REDIS_URL', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY',
  'CLOUDFLARE_ACCOUNT_ID', 'CLOUDFLARE_API_TOKEN',
  'CLOUDFLARE_BROWSER_RENDERING_TOKEN'
)
$missing = $required | Where-Object { $_ -notin $secretNames }
if ($missing) {
  throw "Missing Doppler production secrets: $($missing -join ', ')"
}
Write-Host '[ok] Required Doppler secret names are present.'

$probe = @'
const required = ['CLEF_BASE_DOMAIN', 'DATABASE_URL', 'PAYLOAD_DATABASE_URL', 'NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY', 'JWT_SECRET', 'COOKIE_SECRET', 'PAYLOAD_SECRET', 'REDIS_URL', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'CLOUDFLARE_ACCOUNT_ID', 'CLOUDFLARE_API_TOKEN', 'CLOUDFLARE_BROWSER_RENDERING_TOKEN']
const missing = required.filter((name) => !(process.env[name] || '').trim())
const invalid = []
if (process.env.CLEF_BASE_DOMAIN !== 'clef.com.my') invalid.push('CLEF_BASE_DOMAIN')
if (!process.env.REDIS_URL?.startsWith('rediss://')) invalid.push('REDIS_URL')
if (!process.env.DATABASE_URL?.match(/^postgres(?:ql)?:\/\//)) invalid.push('DATABASE_URL')
if (!process.env.PAYLOAD_DATABASE_URL?.match(/^postgres(?:ql)?:\/\//)) invalid.push('PAYLOAD_DATABASE_URL')
if (!process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY?.startsWith('pk_')) invalid.push('NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY')
if (['JWT_SECRET', 'COOKIE_SECRET', 'PAYLOAD_SECRET'].some((name) => (process.env[name] || '').length < 48)) invalid.push('application secrets')
console.log(JSON.stringify({ missing, invalid }))
process.exit(missing.length || invalid.length ? 1 : 0)
'@
Invoke-Checked 'Doppler value-shape checks' { doppler run --project $project --config $config --no-check-version -- node -e $probe }

$cloudflareProbe = @'
const request = async (path) => {
  const response = await fetch('https://api.cloudflare.com/client/v4' + path, {
    headers: { Authorization: 'Bearer ' + process.env.CLOUDFLARE_API_TOKEN },
    signal: AbortSignal.timeout(15000),
  })
  return { status: response.status, body: await response.json() }
}
const main = async () => {
  const account = process.env.CLOUDFLARE_ACCOUNT_ID
  const [token, zones, d1, r2] = await Promise.all([
    request('/user/tokens/verify'),
    request('/zones?name=clef.com.my'),
    request('/accounts/' + account + '/d1/database?name=clef-payload-db'),
    request('/accounts/' + account + '/r2/buckets?name_contains=clef-'),
  ])
  const zone = (zones.body.result || [])[0]
  const database = (d1.body.result || []).some((item) => item.name === 'clef-payload-db')
  const buckets = new Set((r2.body.result?.buckets || []).map((item) => item.name))
  const status = {
    tokenValid: token.body.success === true,
    zoneActive: zone?.status === 'active',
    d1Present: database,
    payloadBucketPresent: buckets.has('clef-payload-media'),
    medusaBucketPresent: buckets.has('clef-medusa-media'),
  }
  console.log(JSON.stringify(status))
  process.exit(Object.values(status).every(Boolean) ? 0 : 1)
}
main().catch((error) => { console.error('Cloudflare preflight failed: ' + error.message); process.exit(1) })
'@
Invoke-Checked 'Cloudflare zone and resource checks' { doppler run --project $project --config $config --no-check-version -- node -e $cloudflareProbe }

if ($RunBuilds) {
  Invoke-Checked 'Storefront production build' { doppler run --project $project --config $config --no-check-version -- npm --prefix clef-ecommerce run build }
  Invoke-Checked 'Payload production build' { doppler run --project $project --config $config --no-check-version -- npm --prefix clef-payload run build }
  Invoke-Checked 'Medusa production build' { doppler run --project $project --config $config --no-check-version -- npm --prefix clef-medusa/apps/backend run build }
}

Write-Host '[ready] Preflight passed. No deployment was performed.'
