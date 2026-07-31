import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const [cmsSource, indexSource, nextConfigSource, wranglerSource] =
  await Promise.all([
    readFile(new URL('../src/lib/cms.ts', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/index.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../next.config.mjs', import.meta.url), 'utf8'),
    readFile(new URL('../wrangler.jsonc', import.meta.url), 'utf8'),
  ])
const wrangler = JSON.parse(wranglerSource)
const payloadURL = new URL(wrangler.vars.NEXT_PUBLIC_PAYLOAD_URL)

assert.equal(payloadURL.protocol, 'https:')
assert.ok(!['localhost', '127.0.0.1', '::1'].includes(payloadURL.hostname))
assert.equal(payloadURL.pathname, '/')
assert.match(cmsSource, /NEXT_PUBLIC_PAYLOAD_URL is required in production/)
assert.match(cmsSource, /cache:\s*['"]no-store['"]/)
assert.match(cmsSource, /Homepage global is missing canonical published content/)
assert.match(cmsSource, /using controlled fallback/)
assert.match(indexSource, /s-maxage=30, stale-while-revalidate=60/)
assert.match(nextConfigSource, /payloadImagePattern/)
assert.match(nextConfigSource, /NEXT_PUBLIC_PAYLOAD_URL/)

console.log('Homepage production CMS configuration is valid.')
