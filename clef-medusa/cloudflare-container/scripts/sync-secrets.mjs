import { spawnSync } from 'node:child_process'
import path from 'node:path'

const required = [
  'DATABASE_URL',
  'REDIS_URL',
  'JWT_SECRET',
  'COOKIE_SECRET',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'R2_ENDPOINT',
  'R2_ACCESS_KEY_ID',
  'R2_SECRET_ACCESS_KEY',
  'R2_FILE_URL',
  'CLOUDFLARE_ACCOUNT_ID',
  'CLOUDFLARE_API_TOKEN',
]
const optional = [
  'RESEND_API_KEY',
  'EMAIL_ENABLED',
  'EMAIL_FROM_ADDRESS',
  'EMAIL_FROM_NAME',
  'EMAIL_REPLY_TO',
  'EMAIL_ADMIN_TO',
  'STOREFRONT_URL',
]
const wrangler = path.join('node_modules', 'wrangler', 'bin', 'wrangler.js')

for (const name of required) {
  if (!(process.env[name] || '').trim()) {
    throw new Error(`Missing required Doppler value: ${name}`)
  }
}

for (const name of [...required, ...optional]) {
  const value = process.env[name]?.trim()
  if (!value) continue

  const result = spawnSync(process.execPath, [wrangler, 'secret', 'put', name], {
    cwd: process.cwd(),
    input: value,
    stdio: ['pipe', 'inherit', 'inherit'],
  })

  if (result.status !== 0) {
    throw new Error(`Unable to sync Worker secret: ${name}`)
  }
}

console.log('Cloudflare Worker secrets synchronized from Doppler.')
