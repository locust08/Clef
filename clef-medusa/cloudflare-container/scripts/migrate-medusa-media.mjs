import { createHash } from 'node:crypto'
import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  HeadObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { SignJWT } from 'jose'
import pg from 'pg'

const apply = process.argv.includes('--apply')
const bucket = 'clef-medusa-media'
const staticDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../apps/backend/static',
)
const required = [
  'DATABASE_URL',
  'R2_ENDPOINT',
  'R2_ACCESS_KEY_ID',
  'R2_SECRET_ACCESS_KEY',
  'R2_FILE_URL',
  'CLOUDFLARE_ACCOUNT_ID',
]

for (const name of required) {
  if (!(process.env[name] || '').trim()) throw new Error(`Missing ${name}`)
}

const contentTypes = new Map([
  ['.avif', 'image/avif'],
  ['.gif', 'image/gif'],
  ['.jpeg', 'image/jpeg'],
  ['.jpg', 'image/jpeg'],
  ['.png', 'image/png'],
  ['.webp', 'image/webp'],
])

const localFilename = (value) => {
  let url
  try {
    url = new URL(value)
  } catch {
    return null
  }

  if (!['localhost:9000', '127.0.0.1:9000'].includes(url.host)) return null
  if (!url.pathname.startsWith('/static/')) return null

  const filename = decodeURIComponent(url.pathname.slice('/static/'.length))
  if (!filename || path.basename(filename) !== filename) return null
  return filename
}

const publicUrl = (key) =>
  new URL(
    key.split('/').map(encodeURIComponent).join('/'),
    process.env.R2_FILE_URL.endsWith('/')
      ? process.env.R2_FILE_URL
      : `${process.env.R2_FILE_URL}/`,
  ).toString()

const jwt = await new SignJWT({ bucket, scope: 'object-read-write' })
  .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
  .setSubject(process.env.CLOUDFLARE_ACCOUNT_ID)
  .setIssuer(process.env.R2_ACCESS_KEY_ID)
  .setAudience(new URL(process.env.R2_ENDPOINT).host)
  .setIssuedAt()
  .setExpirationTime('3600s')
  .sign(new TextEncoder().encode(process.env.R2_SECRET_ACCESS_KEY))

const r2 = new S3Client({
  endpoint: process.env.R2_ENDPOINT,
  region: 'auto',
  forcePathStyle: true,
  requestChecksumCalculation: 'WHEN_REQUIRED',
  responseChecksumValidation: 'WHEN_REQUIRED',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: createHash('sha256').update(jwt).digest('hex'),
    sessionToken: Buffer.from(`jwt/${jwt}`).toString('base64'),
  },
})

const database = new pg.Client({ connectionString: process.env.DATABASE_URL })
await database.connect()

try {
  const [products, images, existing, localFiles] = await Promise.all([
    database.query(
      `SELECT id, thumbnail AS url
       FROM clef_medusa.product
       WHERE thumbnail LIKE 'http://localhost:9000/static/%'
          OR thumbnail LIKE 'http://127.0.0.1:9000/static/%'`,
    ),
    database.query(
      `SELECT id, url
       FROM clef_medusa.image
       WHERE url LIKE 'http://localhost:9000/static/%'
          OR url LIKE 'http://127.0.0.1:9000/static/%'`,
    ),
    r2.send(new ListObjectsV2Command({ Bucket: bucket, Prefix: 'product-media/' })),
    readdir(staticDirectory),
  ])

  const rows = [...products.rows, ...images.rows]
  const filenames = [...new Set(rows.map((row) => localFilename(row.url)).filter(Boolean))]
  const localFileSet = new Set(localFiles)
  const missing = filenames.filter((filename) => !localFileSet.has(filename))

  if (missing.length) {
    throw new Error(`Local media files are missing: ${missing.join(', ')}`)
  }

  console.log(
    JSON.stringify({
      mode: apply ? 'apply' : 'dry-run',
      productThumbnails: products.rowCount,
      imageRows: images.rowCount,
      uniqueFiles: filenames.length,
      existingR2Objects: existing.KeyCount ?? 0,
      missingFiles: missing.length,
    }),
  )

  if (!apply || filenames.length === 0) process.exitCode = 0
  else {
    const replacements = new Map()

    for (const filename of filenames) {
      const key = `product-media/${filename}`
      const body = await readFile(path.join(staticDirectory, filename))

      await r2.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: body,
          ContentType: contentTypes.get(path.extname(filename).toLowerCase()) ?? 'application/octet-stream',
          CacheControl: 'public, max-age=31536000, immutable',
        }),
      )
      await r2.send(new HeadObjectCommand({ Bucket: bucket, Key: key }))
      replacements.set(filename, publicUrl(key))
    }

    const firstUrl = replacements.values().next().value
    const publicCheck = await fetch(firstUrl, { headers: { Range: 'bytes=0-0' } })
    if (![200, 206].includes(publicCheck.status)) {
      throw new Error(`Public R2 validation failed with HTTP ${publicCheck.status}.`)
    }

    await database.query('BEGIN')
    try {
      for (const row of products.rows) {
        const filename = localFilename(row.url)
        await database.query(
          'UPDATE clef_medusa.product SET thumbnail = $1, updated_at = NOW() WHERE id = $2 AND thumbnail = $3',
          [replacements.get(filename), row.id, row.url],
        )
      }

      for (const row of images.rows) {
        const filename = localFilename(row.url)
        await database.query(
          'UPDATE clef_medusa.image SET url = $1, updated_at = NOW() WHERE id = $2 AND url = $3',
          [replacements.get(filename), row.id, row.url],
        )
      }

      await database.query('COMMIT')
    } catch (error) {
      await database.query('ROLLBACK')
      throw error
    }

    console.log(
      JSON.stringify({
        uploaded: filenames.length,
        updatedProductThumbnails: products.rowCount,
        updatedImageRows: images.rowCount,
        publicRead: true,
      }),
    )
  }
} finally {
  await database.end()
}
