import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { CloudflareContext, getCloudflareContext } from '@opennextjs/cloudflare'
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { r2Storage } from '@payloadcms/storage-r2'
import { buildConfig } from 'payload'
import { GetPlatformProxyOptions } from 'wrangler'

import { CategoryPages } from './src/payload/collections/CategoryPages'
import { ClefEditArticles } from './src/payload/collections/ClefEditArticles'
import { Media } from './src/payload/collections/Media'
import { Users } from './src/payload/collections/Users'
import { Footer } from './src/payload/globals/Footer'
import { AllProductsPages } from './src/payload/globals/AllProductsPages'
import { Homepage } from './src/payload/globals/HomepageGlobal'
import { VideoSection } from './src/payload/globals/VideoSection'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const realpath = (value: string) => (fs.existsSync(value) ? fs.realpathSync(value) : undefined)
const isPayloadCLI = process.argv.some((value) => realpath(value)?.endsWith(path.join('payload', 'bin.js')))
const isCloudflareWorker = process.env.DEPLOYMENT_TARGET === 'cloudflare-workers'
const isProduction = process.env.NODE_ENV === 'production'
const useWranglerRemote = process.env.PAYLOAD_USE_WRANGLER_REMOTE === 'true'
const configuredServerURL =
  process.env.PAYLOAD_PUBLIC_SERVER_URL?.trim() ||
  process.env.NEXT_PUBLIC_SERVER_URL?.trim() ||
  'http://localhost:3001'
const payloadSecret = process.env.PAYLOAD_SECRET?.trim()

if (isProduction && (!payloadSecret || payloadSecret.length < 32)) {
  throw new Error('PAYLOAD_SECRET of at least 32 characters is required in production')
}

const serverOrigin = new URL(configuredServerURL).origin
const trustedOrigins = isProduction
  ? [serverOrigin]
  : Array.from(
      new Set([serverOrigin, 'http://localhost:3001', 'http://127.0.0.1:3001']),
    )
const emailEnabled = process.env.EMAIL_ENABLED?.toLowerCase() === 'true'
const resendApiKey = process.env.RESEND_API_KEY?.trim()
const emailFromAddress = process.env.EMAIL_FROM_ADDRESS?.trim()
const emailFromName = process.env.EMAIL_FROM_NAME?.trim() || 'Clef'

const emailAdapter =
  emailEnabled && resendApiKey && emailFromAddress
    ? resendAdapter({
        apiKey: resendApiKey,
        defaultFromAddress: emailFromAddress,
        defaultFromName: emailFromName,
      })
    : undefined

let disposeWranglerProxy: (() => Promise<void>) | undefined

const cloudflare = isCloudflareWorker
  ? isPayloadCLI || useWranglerRemote
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true })
  : undefined

const imageProcessor = isCloudflareWorker ? undefined : (await import('sharp')).default

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname, 'src/app/(payload)'),
      importMapFile: path.resolve(dirname, 'src/app/(payload)/admin/importMap.js'),
    },
  },
  collections: [Users, Media, CategoryPages, ClefEditArticles],
  cors: trustedOrigins,
  csrf: trustedOrigins,
  db: isCloudflareWorker
    ? sqliteD1Adapter({ binding: cloudflare!.env.D1 })
    : postgresAdapter({
        pool: {
          connectionString: process.env.PAYLOAD_DATABASE_URL,
          connectionTimeoutMillis: 5000,
        },
        schemaName: process.env.PAYLOAD_DATABASE_SCHEMA || 'clef_payload',
      }),
  ...(emailAdapter ? { email: emailAdapter } : {}),
  editor: lexicalEditor(),
  globals: [Homepage, AllProductsPages, VideoSection, Footer],
  serverURL: configuredServerURL,
  secret: payloadSecret || 'local-development-payload-secret-change-me',
  ...(cloudflare
    ? {
        plugins: [
          r2Storage({
            bucket: cloudflare.env.R2,
            collections: { media: true },
          }),
        ],
      }
    : {}),
  ...(imageProcessor ? { sharp: imageProcessor } : {}),
})

function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${'__wrangler'.split('_').join('')}`).then(
    async ({ getPlatformProxy }) => {
      const proxy = await getPlatformProxy({
        configPath: path.resolve(dirname, 'wrangler.jsonc'),
        envFiles: [],
        environment: process.env.CLOUDFLARE_ENV,
        remoteBindings: isProduction,
      } satisfies GetPlatformProxyOptions)

      disposeWranglerProxy = proxy.dispose
      return proxy
    },
  )
}

export async function disposePayloadCloudflareProxy() {
  await disposeWranglerProxy?.()
  disposeWranglerProxy = undefined
}
