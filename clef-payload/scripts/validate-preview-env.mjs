const required = [
  'PAYLOAD_PUBLIC_SERVER_URL',
  'PAYLOAD_ADMIN_ORIGIN',
  'STOREFRONT_URL',
  'PREVIEW_SECRET',
]

const missing = required.filter((name) => !process.env[name]?.trim())
if (missing.length) {
  throw new Error(`Missing required Payload Preview variables: ${missing.join(', ')}`)
}

if (process.env.PREVIEW_SECRET.trim().length < 32) {
  throw new Error('PREVIEW_SECRET must contain at least 32 characters')
}

for (const name of ['PAYLOAD_PUBLIC_SERVER_URL', 'PAYLOAD_ADMIN_ORIGIN', 'STOREFRONT_URL']) {
  const url = new URL(process.env[name])
  if (url.protocol !== 'https:' || url.username || url.password) {
    throw new Error(`${name} must be a credential-free HTTPS URL`)
  }
}

console.log('Payload Preview environment is valid.')
