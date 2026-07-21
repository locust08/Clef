import fs from 'node:fs'
import path from 'node:path'

import type { Payload } from 'payload'

const EXPECTED_BINDING = 'D1'
const EXPECTED_DATABASE = 'clef-payload-db'
const EXPECTED_DATABASE_ID = '660d2a9a-f9fd-4ca5-8c7e-b72f8da809d5'
const EXPECTED_ORIGIN = 'https://clef-payload-preview.easondev.workers.dev'
const EXPECTED_CONFIRMATION = `${EXPECTED_DATABASE}:${EXPECTED_DATABASE_ID}`

function requireValue(name: string) {
  const value = process.env[name]?.trim()
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

function assertProductionTarget() {
  if (process.env.NODE_ENV !== 'production') throw new Error('NODE_ENV must be production')
  if (process.env.DEPLOYMENT_TARGET !== 'cloudflare-workers') {
    throw new Error('DEPLOYMENT_TARGET must be cloudflare-workers')
  }
  if (process.env.PAYLOAD_USE_WRANGLER_REMOTE !== 'true') {
    throw new Error('PAYLOAD_USE_WRANGLER_REMOTE must be true')
  }
  if (requireValue('PAYLOAD_PRODUCTION_BOOTSTRAP_CONFIRM') !== EXPECTED_CONFIRMATION) {
    throw new Error('Production database confirmation did not match the configured target')
  }

  const publicURL = new URL(requireValue('PAYLOAD_PUBLIC_SERVER_URL'))
  if (publicURL.origin !== EXPECTED_ORIGIN || publicURL.protocol !== 'https:') {
    throw new Error('PAYLOAD_PUBLIC_SERVER_URL is not the expected HTTPS production origin')
  }

  if (requireValue('PAYLOAD_SECRET').length < 32) {
    throw new Error('PAYLOAD_SECRET must contain at least 32 characters')
  }

  const wranglerConfig = JSON.parse(
    fs.readFileSync(path.resolve('wrangler.jsonc'), 'utf8'),
  ) as {
    d1_databases?: Array<{
      binding?: string
      database_id?: string
      database_name?: string
      remote?: boolean
    }>
  }
  const database = wranglerConfig.d1_databases?.find(
    ({ binding }) => binding === EXPECTED_BINDING,
  )

  if (
    database?.database_name !== EXPECTED_DATABASE ||
    database.database_id !== EXPECTED_DATABASE_ID ||
    database.remote !== true
  ) {
    throw new Error('Wrangler D1 configuration does not match the confirmed production database')
  }
}

async function main() {
  assertProductionTarget()

  const email = requireValue('PAYLOAD_ADMIN_EMAIL').toLowerCase()
  const checkOnly = process.env.PAYLOAD_ADMIN_CHECK_ONLY === 'true'
  const reset = process.env.PAYLOAD_ADMIN_RESET === 'true'

  if (!email.includes('@')) throw new Error('PAYLOAD_ADMIN_EMAIL is invalid')

  let payload: Payload | undefined
  let disposePayloadCloudflareProxy: (() => Promise<void>) | undefined

  try {
    const [{ getPayload }, configModule] = await Promise.all([
      import('payload'),
      import('../payload.config'),
    ])
    disposePayloadCloudflareProxy = configModule.disposePayloadCloudflareProxy
    const configPromise = configModule.default
    payload = await getPayload({ config: configPromise })
    if (payload.config.admin.user !== 'users') {
      throw new Error('The users collection is not configured as the Payload admin collection')
    }

    const existing = await payload.find({
      collection: 'users',
      depth: 0,
      limit: 2,
      overrideAccess: true,
      where: { email: { equals: email } },
    })

    if (existing.totalDocs > 1) throw new Error('Duplicate production admin records detected')

    const allUsers = await payload.find({
      collection: 'users',
      depth: 0,
      limit: 1,
      overrideAccess: true,
    })

    if (checkOnly) {
      console.log(
        JSON.stringify({
          adminAccess: existing.totalDocs === 1,
          exists: existing.totalDocs === 1,
          operation: 'checked',
          otherUsersExist: allUsers.totalDocs > existing.totalDocs,
          verified:
            existing.totalDocs === 1 ? existing.docs[0]._verified === true : null,
        }),
      )
      return
    }

    let operation: 'created' | 'reset' | 'unchanged'
    let userID: number | string

    if (existing.totalDocs === 0) {
      if (
        allUsers.totalDocs > 0 &&
        process.env.PAYLOAD_ADMIN_ALLOW_ADDITIONAL !== 'true'
      ) {
        throw new Error(
          'A production user already exists; explicit additional-admin approval is required',
        )
      }

      const password = requireValue('PAYLOAD_ADMIN_PASSWORD')
      if (password.length < 12) {
        throw new Error('PAYLOAD_ADMIN_PASSWORD must contain at least 12 characters')
      }

      const created = await payload.create({
        collection: 'users',
        data: { _verified: true, email, password },
        disableVerificationEmail: true,
        overrideAccess: true,
      })
      operation = 'created'
      userID = created.id
    } else {
      userID = existing.docs[0].id
      if (reset) {
        const password = requireValue('PAYLOAD_ADMIN_PASSWORD')
        if (password.length < 12) {
          throw new Error('PAYLOAD_ADMIN_PASSWORD must contain at least 12 characters')
        }

        await payload.update({
          id: userID,
          collection: 'users',
          data: {
            _verified: true,
            lockUntil: null,
            loginAttempts: 0,
            password,
            sessions: [],
          },
          overrideAccess: true,
        })
        operation = 'reset'
      } else {
        operation = 'unchanged'
      }
    }

    const verified = await payload.findByID({
      id: userID,
      collection: 'users',
      depth: 0,
      overrideAccess: true,
    })
    if (verified._verified !== true) throw new Error('Production admin is not verified')

    console.log(
      JSON.stringify({
        adminAccess: true,
        adminCollection: 'users',
        operation,
        verified: true,
      }),
    )
  } finally {
    await payload?.destroy()
    await disposePayloadCloudflareProxy?.()
  }
}

main().catch((error: unknown) => {
  console.error(
    JSON.stringify({
      error: 'PRODUCTION_ADMIN_BOOTSTRAP_FAILED',
      type: error instanceof Error ? error.name : 'UnknownError',
    }),
  )
  process.exitCode = 1
})
