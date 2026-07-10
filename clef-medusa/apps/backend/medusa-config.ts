import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

const DEFAULT_STOREFRONT_CORS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
].join(',')

module.exports = defineConfig({
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
