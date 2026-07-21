import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const [
  configSource,
  usersSource,
  verifierSource,
  bootstrapSource,
  trustedOriginSource,
  loginRouteSource,
  registerRouteSource,
  customWorkerSource,
  wranglerSource,
  dopplerHelperSource,
] = await Promise.all([
  readFile(new URL('../payload.config.ts', import.meta.url), 'utf8'),
  readFile(new URL('../src/payload/collections/Users.ts', import.meta.url), 'utf8'),
  readFile(new URL('./verify-production-auth.mjs', import.meta.url), 'utf8'),
  readFile(new URL('./bootstrap-production-admin.ts', import.meta.url), 'utf8'),
  readFile(new URL('../src/lib/trusted-form-origin.ts', import.meta.url), 'utf8'),
  readFile(new URL('../src/app/(first-user)/clef-login/submit/route.ts', import.meta.url), 'utf8'),
  readFile(
    new URL('../src/app/(first-user)/admin/create-first-user/register/route.ts', import.meta.url),
    'utf8',
  ),
  readFile(new URL('../custom-worker.ts', import.meta.url), 'utf8'),
  readFile(new URL('../wrangler.jsonc', import.meta.url), 'utf8'),
  readFile(new URL('./doppler-secret-safe.ps1', import.meta.url), 'utf8'),
])

test('production auth uses exact origins and fails closed without a secret', () => {
  assert.match(configSource, /cors:\s*trustedOrigins/)
  assert.match(configSource, /csrf:\s*trustedOrigins/)
  assert.match(configSource, /PAYLOAD_SECRET of at least 32 characters is required in production/)
  assert.doesNotMatch(configSource, /cors:\s*['"]\*['"]/)
  assert.doesNotMatch(configSource, /PAYLOAD_ADMIN_EMAIL|PAYLOAD_ADMIN_PASSWORD/)
})

test('production auth cookie remains secure, http-only, lax, and host-only', () => {
  assert.match(usersSource, /sameSite:\s*['"]Lax['"]/)
  assert.match(usersSource, /secure:\s*process\.env\.NODE_ENV === ['"]production['"]/)
  assert.doesNotMatch(usersSource, /domain\s*:/)
  assert.match(verifierSource, /authCookie\.httpOnly/)
  assert.match(verifierSource, /authCookie\.secure/)
})

test('production bootstrap is env-only, idempotent, and reset-gated', () => {
  assert.match(bootstrapSource, /PAYLOAD_ADMIN_EMAIL/)
  assert.match(bootstrapSource, /PAYLOAD_ADMIN_PASSWORD/)
  assert.match(bootstrapSource, /PAYLOAD_ADMIN_RESET === ['"]true['"]/)
  assert.match(bootstrapSource, /PAYLOAD_ADMIN_CHECK_ONLY === ['"]true['"]/)
  assert.match(bootstrapSource, /existing\.totalDocs === 0/)
  assert.match(bootstrapSource, /allUsers\.totalDocs > 0/)
  assert.match(bootstrapSource, /PAYLOAD_ADMIN_ALLOW_ADDITIONAL !== ['"]true['"]/)
  assert.match(bootstrapSource, /sessions:\s*\[\]/)
  assert.match(bootstrapSource, /adminAccess:\s*true/)
  assert.doesNotMatch(bootstrapSource, /\.env\.local/)
})

test('production administrator existence check is read-only and password-free', () => {
  const checkBranch = bootstrapSource.slice(
    bootstrapSource.indexOf('if (checkOnly)'),
    bootstrapSource.indexOf("let operation: 'created'"),
  )

  assert.match(checkBranch, /operation:\s*['"]checked['"]/)
  assert.match(checkBranch, /exists:\s*existing\.totalDocs === 1/)
  assert.doesNotMatch(checkBranch, /PAYLOAD_ADMIN_PASSWORD|payload\.create|payload\.update/)
})

test('an existing production administrator does not require a bootstrap password', () => {
  const existingBranch = bootstrapSource.slice(
    bootstrapSource.indexOf("operation = 'created'"),
    bootstrapSource.indexOf('const verified = await payload.findByID'),
  )

  assert.match(existingBranch, /if \(reset\)[\s\S]*requireValue\(['"]PAYLOAD_ADMIN_PASSWORD['"]\)/)
  assert.match(existingBranch, /else \{\s*operation = ['"]unchanged['"]\s*\}/)
})

test('custom credential form routes require the exact trusted origin', () => {
  assert.match(trustedOriginSource, /request\.headers\.get\(['"]origin['"]\)/)
  assert.match(trustedOriginSource, /requestOrigin === expectedOrigin/)
  assert.match(loginRouteSource, /hasTrustedFormOrigin\(request\)/)
  assert.match(registerRouteSource, /hasTrustedFormOrigin\(request\)/)
  assert.match(loginRouteSource, /status:\s*403/)
  assert.match(registerRouteSource, /status:\s*403/)
})

test('Cloudflare entry point redirects HTTP before delegating to OpenNext', () => {
  assert.equal(JSON.parse(wranglerSource).main, 'custom-worker.ts')
  assert.match(customWorkerSource, /url\.protocol === ['"]http:['"]/)
  assert.match(customWorkerSource, /url\.protocol = ['"]https:['"]/)
  assert.match(customWorkerSource, /status:\s*308/)
  assert.match(customWorkerSource, /openNextWorker\.fetch\(request, env, context\)/)
})

test('Doppler maintenance is targeted and suppresses secret-bearing output', () => {
  assert.match(dopplerHelperSource, /Read-Host[\s\S]*-AsSecureString/)
  assert.match(dopplerHelperSource, /\$null\s*=\s*.*doppler/)
  assert.match(dopplerHelperSource, /2>&1/)
  assert.match(dopplerHelperSource, /'secrets',\s*'set',\s*\$Name/)
  assert.match(dopplerHelperSource, /'secrets',\s*'delete',\s*\$Name/)
  assert.doesNotMatch(dopplerHelperSource, /doppler\s+run|--debug|--print-config/)
})
