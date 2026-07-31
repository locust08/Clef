import { createHmac, timingSafeEqual } from 'node:crypto'

export const PREVIEW_TTL_SECONDS = 5 * 60

const previewablePaths = [
  /^\/$/,
  /^\/all-skincare$/,
  /^\/all-personal-care$/,
  /^\/fragrance$/,
  /^\/shop\/(?:skincare|personal-care|fragrance)\/[a-z0-9]+(?:-[a-z0-9]+)*$/,
  /^\/clef-edit\/[a-z0-9]+(?:-[a-z0-9]+)*$/,
]

export const isSafeLocalPath = (value: string) => {
  if (
    !value.startsWith('/') ||
    value.startsWith('//') ||
    value.includes('\\') ||
    /[\u0000-\u001f\u007f]/.test(value)
  ) {
    return false
  }

  try {
    const url = new URL(value, 'https://storefront.invalid')
    return url.origin === 'https://storefront.invalid'
  } catch {
    return false
  }
}
export const isPreviewablePath = (value: string) =>
  isSafeLocalPath(value) && previewablePaths.some((pattern) => pattern.test(value))

const getPreviewSecret = () => {
  const secret = process.env.PREVIEW_SECRET?.trim()

  if (!secret || secret.length < 32) {
    throw new Error('Preview is unavailable because PREVIEW_SECRET is not configured')
  }

  return secret
}

const sign = (path: string, expires: string) =>
  createHmac('sha256', getPreviewSecret())
    .update(`${path}\n${expires}`)
    .digest('base64url')

const safeEqual = (left: string, right: string) => {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  )
}

export const verifyPreviewGrant = ({
  expires,
  path,
  signature,
  now = Math.floor(Date.now() / 1000),
}: {
  expires: string
  path: string
  signature: string
  now?: number
}) => {
  if (!isPreviewablePath(path) || !/^\d{10}$/.test(expires)) {
    return false
  }

  const expiresAt = Number(expires)
  if (expiresAt < now || expiresAt > now + PREVIEW_TTL_SECONDS) {
    return false
  }

  return safeEqual(signature, sign(path, expires))
}

export const withDraftQuery = (path: string) => {
  const url = new URL(path, 'https://payload.invalid')
  url.searchParams.set('draft', 'true')
  return `${url.pathname}${url.search}`
}
