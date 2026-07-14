import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const [configSource, usersSource, packageSource] = await Promise.all([
  readFile(new URL('../payload.config.ts', import.meta.url), 'utf8'),
  readFile(new URL('../src/payload/collections/Users.ts', import.meta.url), 'utf8'),
  readFile(new URL('../package.json', import.meta.url), 'utf8'),
])
const packageJson = JSON.parse(packageSource)

test('uses the official version-matched Payload Resend adapter', () => {
  assert.equal(packageJson.dependencies['@payloadcms/email-resend'], '^3.85.2')
  assert.equal(packageJson.dependencies['@payloadcms/email-nodemailer'], undefined)
  assert.match(configSource, /resendAdapter\s*\(/)
  assert.match(configSource, /process\.env\.RESEND_API_KEY/)
  assert.match(configSource, /process\.env\.EMAIL_FROM_ADDRESS/)
  assert.doesNotMatch(configSource, /re_[A-Za-z0-9]/)
})

test('keeps password reset auth enabled and enables verification emails', () => {
  assert.match(usersSource, /auth:\s*\{[\s\S]*?verify:\s*true/)
})
