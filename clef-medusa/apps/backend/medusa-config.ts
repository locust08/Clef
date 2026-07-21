import { loadEnv, defineConfig } from '@medusajs/framework/utils'
import { getStripeSandboxConfig } from './src/lib/stripe-sandbox'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

const DEFAULT_STOREFRONT_CORS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
].join(',')

const emailEnabled = process.env.EMAIL_ENABLED?.toLowerCase() === 'true'
const isProduction = process.env.NODE_ENV === 'production'
const resendApiKey = process.env.RESEND_API_KEY?.trim()
const emailFromAddress = process.env.EMAIL_FROM_ADDRESS?.trim()
const emailFromName = process.env.EMAIL_FROM_NAME?.trim() || 'Clef'
const databaseUrl = process.env.DATABASE_URL?.trim()
const redisUrl = process.env.REDIS_URL?.trim()
const r2Endpoint = process.env.R2_ENDPOINT?.trim()
const r2AccessKeyId = process.env.R2_ACCESS_KEY_ID?.trim()
const r2SecretAccessKey = process.env.R2_SECRET_ACCESS_KEY?.trim()
const r2SessionToken = process.env.R2_SESSION_TOKEN?.trim()
const r2FileUrl = process.env.R2_FILE_URL?.trim()
const stripeSandbox = getStripeSandboxConfig()

if (isProduction && !databaseUrl) {
  throw new Error('DATABASE_URL is required in production.')
}

if (isProduction && !redisUrl) {
  throw new Error('REDIS_URL is required in production.')
}

if (
  isProduction &&
  (!r2Endpoint || !r2AccessKeyId || !r2SecretAccessKey || !r2SessionToken || !r2FileUrl)
) {
  throw new Error(
    'Restricted R2 session credentials and R2_FILE_URL are required in production.',
  )
}

if (emailEnabled && (!resendApiKey || !emailFromAddress)) {
  throw new Error(
    'EMAIL_ENABLED is true, but RESEND_API_KEY or EMAIL_FROM_ADDRESS is missing.',
  )
}

module.exports = defineConfig({
  modules: [
    ...(redisUrl
      ? [
          {
            resolve: '@medusajs/medusa/caching',
            options: {
              providers: [
                {
                  resolve: '@medusajs/caching-redis',
                  id: 'redis',
                  is_default: true,
                  options: { redisUrl },
                },
              ],
            },
          },
          {
            resolve: '@medusajs/medusa/event-bus-redis',
            options: { redisUrl },
          },
          {
            resolve: '@medusajs/medusa/workflow-engine-redis',
            options: { redis: { redisUrl } },
          },
          {
            resolve: '@medusajs/medusa/locking',
            options: {
              providers: [
                {
                  resolve: '@medusajs/locking-redis',
                  id: 'redis',
                  is_default: true,
                  options: { redisUrl },
                },
              ],
            },
          },
        ]
      : []),
    ...(r2Endpoint && r2AccessKeyId && r2SecretAccessKey && r2SessionToken && r2FileUrl
      ? [
          {
            resolve: '@medusajs/medusa/file',
            options: {
              providers: [
                {
                  resolve: '@medusajs/medusa/file-s3',
                  id: 'r2',
                  is_default: true,
                  options: {
                    file_url: r2FileUrl,
                    access_key_id: r2AccessKeyId,
                    secret_access_key: r2SecretAccessKey,
                    session_token: r2SessionToken,
                    region: 'auto',
                    bucket: 'clef-medusa-media',
                    endpoint: r2Endpoint,
                    additional_client_config: {
                      requestChecksumCalculation: 'WHEN_REQUIRED',
                      responseChecksumValidation: 'WHEN_REQUIRED',
                    },
                  },
                },
              ],
            },
          },
        ]
      : []),
    {
      resolve: '@medusajs/medusa/payment',
      options: {
        providers: [
          {
            resolve: '@medusajs/medusa/payment-stripe',
            id: 'stripe',
            options: {
              apiKey: stripeSandbox.apiKey,
              webhookSecret: stripeSandbox.webhookSecret,
              capture: true,
              automatic_payment_methods: true,
              payment_description: 'Clef online order',
            },
          },
        ],
      },
    },
    ...(emailEnabled
      ? [
          {
            resolve: '@medusajs/medusa/notification',
            options: {
              providers: [
                {
                  resolve: './src/modules/resend',
                  id: 'resend',
                  options: {
                    api_key: resendApiKey,
                    channels: ['email'],
                    from: `${emailFromName} <${emailFromAddress}>`,
                    reply_to: process.env.EMAIL_REPLY_TO?.trim(),
                  },
                },
              ],
            },
          },
        ]
      : []),
  ],
  projectConfig: {
    databaseUrl,
    redisUrl,
    databaseSchema: process.env.DATABASE_SCHEMA || "clef_medusa",
    http: {
      storeCors: process.env.STORE_CORS || DEFAULT_STOREFRONT_CORS,
      adminCors: process.env.ADMIN_CORS || 'http://localhost:5173,http://localhost:9000',
      authCors: process.env.AUTH_CORS || DEFAULT_STOREFRONT_CORS,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    }
  }
})
