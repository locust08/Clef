import path from 'path'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { CategoryPages } from './src/payload/collections/CategoryPages'
import { ClefEditArticles } from './src/payload/collections/ClefEditArticles'
import { Media } from './src/payload/collections/Media'
import { Users } from './src/payload/collections/Users'
import { Footer } from './src/payload/globals/Footer'
import { Homepage } from './src/payload/globals/HomepageGlobal'
import { VideoSection } from './src/payload/globals/VideoSection'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
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
