import { randomUUID } from 'node:crypto'
import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { SignJWT } from 'jose'

const required = [
  'R2_ENDPOINT',
  'R2_ACCESS_KEY_ID',
  'R2_SECRET_ACCESS_KEY',
  'CLOUDFLARE_ACCOUNT_ID',
]
for (const name of required) {
  if (!(process.env[name] || '').trim()) throw new Error(`Missing ${name}`)
}

const jwt = await new SignJWT({
  bucket: 'clef-medusa-media',
  scope: 'object-read-write',
})
  .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
  .setSubject(process.env.CLOUDFLARE_ACCOUNT_ID)
  .setIssuer(process.env.R2_ACCESS_KEY_ID)
  .setAudience(new URL(process.env.R2_ENDPOINT).host)
  .setIssuedAt()
  .setExpirationTime('900s')
  .sign(new TextEncoder().encode(process.env.R2_SECRET_ACCESS_KEY))
const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(jwt))
const credentials = {
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join(''),
  sessionToken: btoa(`jwt/${jwt}`),
}

const client = new S3Client({
  endpoint: process.env.R2_ENDPOINT,
  region: 'auto',
  forcePathStyle: true,
  requestChecksumCalculation: 'WHEN_REQUIRED',
  responseChecksumValidation: 'WHEN_REQUIRED',
  credentials: {
    accessKeyId: credentials.accessKeyId,
    secretAccessKey: credentials.secretAccessKey,
    sessionToken: credentials.sessionToken,
  },
})
const bucket = 'clef-medusa-media'
const key = `deployment-preflight/${randomUUID()}.txt`
let wrote = false

try {
  await client.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: 'clef-r2-preflight' }))
  wrote = true
  const object = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }))
  const body = await object.Body?.transformToString()
  if (body !== 'clef-r2-preflight') throw new Error('R2 read-back validation failed.')

  let restrictedToMedusa = false
  try {
    await client.send(new ListObjectsV2Command({ Bucket: 'clef-payload-media', MaxKeys: 1 }))
  } catch (error) {
    const status = error?.$metadata?.httpStatusCode
    restrictedToMedusa = status === 401 || status === 403 || error?.name === 'AccessDenied'
  }

  if (!restrictedToMedusa) {
    throw new Error('R2 credentials are not restricted to clef-medusa-media.')
  }

  console.log(JSON.stringify({ write: true, read: true, delete: true, bucketRestricted: true }))
} finally {
  if (wrote) await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }))
}
