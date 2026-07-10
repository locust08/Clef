import path from 'path'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { CategoryPages } from './src/payload/collections/CategoryPages'
import { ClefEditArticles } from './src/payload/collections/ClefEditArticles'
import { Media } from './src/payload/collections/Media'
import { Users } from './src/payload/collections/Users'
import { Footer } from './src/payload/globals/Footer'
import { Homepage } from './src/payload/globals/Homepage'
import { VideoSection } from './src/payload/globals/VideoSection'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const smtpHost = process.env.SMTP_HOST
const smtpPort = Number(process.env.SMTP_PORT || 587)
const smtpSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465
const smtpUser = process.env.SMTP_USER
const smtpPass = process.env.SMTP_PASS
const emailFromAddress = process.env.SMTP_FROM_ADDRESS || 'no-reply@clef.local'
const emailFromName = process.env.SMTP_FROM_NAME || 'CLEF Payload'
const emailOverrideRecipient = process.env.SMTP_OVERRIDE_RECIPIENT
const shouldSkipSmtpVerify = process.env.SMTP_SKIP_VERIFY === 'true'

const emailAdapter =
  smtpHost && smtpUser && smtpPass
    ? nodemailerAdapter({
        defaultFromAddress: emailFromAddress,
        defaultFromName: emailFromName,
        overrideRecipientAddress: emailOverrideRecipient,
        skipVerify: shouldSkipSmtpVerify,
        transportOptions: {
          auth: {
            pass: smtpPass,
            user: smtpUser,
          },
          host: smtpHost,
          port: smtpPort,
          secure: smtpSecure,
        },
      })
    : undefined

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname, 'src/app/(payload)'),
      importMapFile: path.resolve(dirname, 'src/app/(payload)/admin/importMap.js'),
    },
  },
  collections: [Users, Media, CategoryPages, ClefEditArticles],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.PAYLOAD_DATABASE_URL,
      connectionTimeoutMillis: 5000,
    },
    schemaName: process.env.PAYLOAD_DATABASE_SCHEMA || 'clef_payload',
  }),
  ...(emailAdapter ? { email: emailAdapter } : {}),
  editor: lexicalEditor(),
  globals: [Homepage, VideoSection, Footer],
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001',
  secret: process.env.PAYLOAD_SECRET || 'local-development-payload-secret-change-me',
  sharp,
})
