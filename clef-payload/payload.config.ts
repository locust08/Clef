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
import { livePreviewURL } from './src/payload/preview'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const realpath = (value: string) => (fs.existsSync(value) ? fs.realpathSync(value) : undefined)
const isPayloadCLI = process.argv.some((value) => realpath(value)?.endsWith(path.join('payload', 'bin.js')))
const isCloudflareWorker = process.env.DEPLOYMENT_TARGET === 'cloudflare-workers'
const isProduction = process.env.NODE_ENV === 'production'
const useWranglerRemote = process.env.PAYLOAD_USE_WRANGLER_REMOTE === 'true'
const rawConfiguredServerURL =
  process.env.PAYLOAD_PUBLIC_SERVER_URL?.trim() ||
  process.env.NEXT_PUBLIC_SERVER_URL?.trim()
const configuredServerURL = rawConfiguredServerURL || 'http://localhost:3001'
const payloadSecret = process.env.PAYLOAD_SECRET?.trim()
const previewSecret = process.env.PREVIEW_SECRET?.trim()
const storefrontURL = process.env.STOREFRONT_URL?.trim()
const payloadAdminOrigin = process.env.PAYLOAD_ADMIN_ORIGIN?.trim()

if (isProduction && (!payloadSecret || payloadSecret.length < 32)) {
  throw new Error('PAYLOAD_SECRET of at least 32 characters is required in production')
}

if (isProduction && (!previewSecret || previewSecret.length < 32)) {
  throw new Error('PREVIEW_SECRET of at least 32 characters is required in production')
}

if (isProduction && (!storefrontURL || !payloadAdminOrigin)) {
  throw new Error('STOREFRONT_URL and PAYLOAD_ADMIN_ORIGIN are required in production')
}

if (isProduction && !rawConfiguredServerURL) {
  throw new Error(
    'PAYLOAD_PUBLIC_SERVER_URL or NEXT_PUBLIC_SERVER_URL is required in production',
  )
}

const serverURL = new URL(configuredServerURL)
const isLoopbackHostname = ['localhost', '127.0.0.1', '::1'].includes(
  serverURL.hostname,
)

if (
  isProduction &&
  (serverURL.protocol !== 'https:' ||
    isLoopbackHostname ||
    serverURL.username ||
    serverURL.password)
) {
  throw new Error('Payload production server URL must be a credential-free HTTPS origin')
}

const serverOrigin = serverURL.origin
const configuredAllowedOrigins = [
  ...(process.env.PAYLOAD_ALLOWED_ORIGINS?.split(',') ?? []),
  ...(storefrontURL ? [storefrontURL] : []),
  ...(payloadAdminOrigin ? [payloadAdminOrigin] : []),
]
    .map((value) => value.trim())
    .filter(Boolean)
    .map((value) => {
      const origin = new URL(value)

      if (
        isProduction &&
        (origin.protocol !== 'https:' ||
          ['localhost', '127.0.0.1', '::1'].includes(origin.hostname) ||
          origin.username ||
          origin.password)
      ) {
        throw new Error('Payload production allowed origins must use HTTPS')
      }

      return origin.origin
    })
const trustedOrigins = isProduction
  ? Array.from(new Set([serverOrigin, ...configuredAllowedOrigins]))
  : Array.from(
      new Set([
        serverOrigin,
        ...configuredAllowedOrigins,
        'http://localhost:3000',
        'http://localhost:3001',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:3001',
      ]),
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
    livePreview: {
      collections: [CategoryPages.slug, ClefEditArticles.slug],
      globals: [Homepage.slug, AllProductsPages.slug, VideoSection.slug, Footer.slug],
      url: livePreviewURL,
      breakpoints: [
        { name: 'mobile', label: 'Mobile', width: 390, height: 844 },
        { name: 'tablet', label: 'Tablet', width: 768, height: 1024 },
        { name: 'desktop', label: 'Desktop', width: 1440, height: 900 },
      ],
    },
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
        persist: process.env.PAYLOAD_WRANGLER_PERSIST_PATH
          ? { path: path.resolve(process.env.PAYLOAD_WRANGLER_PERSIST_PATH) }
          : true,
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
