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
const resendApiKey = process.env.RESEND_API_KEY?.trim()
const emailFromAddress = process.env.EMAIL_FROM_ADDRESS?.trim()
const emailFromName = process.env.EMAIL_FROM_NAME?.trim() || 'Clef'
const stripeSandbox = getStripeSandboxConfig()

if (emailEnabled && (!resendApiKey || !emailFromAddress)) {
  throw new Error(
    'EMAIL_ENABLED is true, but RESEND_API_KEY or EMAIL_FROM_ADDRESS is missing.',
  )
}

module.exports = defineConfig({
  modules: [
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
    databaseUrl: process.env.DATABASE_URL,
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
