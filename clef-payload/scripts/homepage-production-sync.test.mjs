import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const [configSource, homepageSource, mediaSource, syncSource, wranglerSource] =
  await Promise.all([
    readFile(new URL('../payload.config.ts', import.meta.url), 'utf8'),
    readFile(
      new URL('../src/payload/globals/HomepageGlobal.ts', import.meta.url),
      'utf8',
    ),
    readFile(
      new URL('../src/payload/collections/Media.ts', import.meta.url),
      'utf8',
    ),
    readFile(
      new URL('./sync-homepage-to-production.ts', import.meta.url),
      'utf8',
    ),
    readFile(new URL('../wrangler.jsonc', import.meta.url), 'utf8'),
  ])
const wrangler = JSON.parse(wranglerSource)

test('production D1 and R2 bindings match the Payload adapters', () => {
  assert.deepEqual(wrangler.d1_databases, [
    {
      binding: 'D1',
      database_name: 'clef-payload-db',
      database_id: '660d2a9a-f9fd-4ca5-8c7e-b72f8da809d5',
      remote: true,
    },
  ])
  assert.deepEqual(wrangler.r2_buckets, [
    {
      binding: 'R2',
      bucket_name: 'clef-payload-media',
    },
  ])
  assert.match(configSource, /sqliteD1Adapter\(\{\s*binding:\s*cloudflare!\.env\.D1/)
  assert.match(configSource, /bucket:\s*cloudflare\.env\.R2/)
})

test('production server and allowed origins fail closed', () => {
  assert.match(
    configSource,
    /PAYLOAD_PUBLIC_SERVER_URL or NEXT_PUBLIC_SERVER_URL is required in production/,
  )
  assert.match(configSource, /protocol !== ['"]https:['"]/)
  assert.match(configSource, /PAYLOAD_ALLOWED_ORIGINS/)
  assert.match(wrangler.vars.PAYLOAD_ALLOWED_ORIGINS, /clef-ecommerce/)
  assert.doesNotMatch(wrangler.vars.PAYLOAD_ALLOWED_ORIGINS, /\*/)
})

test('Homepage public reads are draft-protected and media remains public', () => {
  assert.match(homepageSource, /read:\s*publishedGlobalOrAuthenticated/)
  assert.match(homepageSource, /versions:\s*globalVersions/)
  assert.match(mediaSource, /access:\s*\{\s*read:\s*\(\)\s*=>\s*true/)
})

test('production sync is idempotent, backup-gated, and content-scoped', () => {
  assert.match(syncSource, /PAYLOAD_PRODUCTION_BACKUP_PATH/)
  assert.match(syncSource, /--apply/)
  assert.match(syncSource, /filename:\s*\{\s*equals:\s*filename/)
  assert.match(syncSource, /payload\.updateGlobal\(\{\s*slug:\s*['"]homepage['"]/)
  assert.doesNotMatch(syncSource, /collection:\s*['"]users['"]/)
  assert.doesNotMatch(syncSource, /payload\.delete/)
})
