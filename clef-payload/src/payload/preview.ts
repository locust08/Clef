import { createHmac, timingSafeEqual } from 'node:crypto'

import type {
  CollectionConfig,
  GeneratePreviewURL,
  GlobalConfig,
  PayloadRequest,
} from 'payload'

const PREVIEW_TTL_SECONDS = 5 * 60

export const collectionVersions: NonNullable<CollectionConfig['versions']> = {
  maxPerDoc: 50,
  drafts: {
    autosave: {
      interval: 3000,
      showSaveDraftButton: true,
    },
  },
}
export const globalVersions: NonNullable<GlobalConfig['versions']> = {
  max: 50,
  drafts: {
    autosave: {
      interval: 3000,
      showSaveDraftButton: true,
    },
  },
}

const getPreviewSecret = () => {
  const secret = process.env.PREVIEW_SECRET?.trim()

  if (process.env.NODE_ENV === 'production' && (!secret || secret.length < 32)) {
    throw new Error('PREVIEW_SECRET of at least 32 characters is required in production')
  }

  return secret || 'local-preview-secret-change-me-before-production'
}

const safeEqual = (left: string, right: string) => {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  )
}

const isPreviewServiceRequest = (req: PayloadRequest) => {
  const suppliedSecret = req.headers.get('x-payload-preview-secret') || ''
  return safeEqual(suppliedSecret, getPreviewSecret())
}

const isDraftRead = (req: PayloadRequest) => {
  const draft = req.query?.draft
  return draft === true || draft === 'true'
}

export const publishedOrAuthenticated = ({ req }: { req: PayloadRequest }) => {
  if (req.user || isPreviewServiceRequest(req)) {
    return true
  }

  return {
    _status: {
      equals: 'published' as const,
    },
  }
}

export const publishedGlobalOrAuthenticated = ({
  req,
}: {
  req: PayloadRequest
}) => Boolean(req.user || isPreviewServiceRequest(req) || !isDraftRead(req))

const storefrontOrigin = () => {
  const configured = process.env.STOREFRONT_URL?.trim() || 'http://localhost:3000'
  const url = new URL(configured)

  if (
    process.env.NODE_ENV === 'production' &&
    (url.protocol !== 'https:' ||
      ['localhost', '127.0.0.1', '::1'].includes(url.hostname) ||
      url.username ||
      url.password)
  ) {
    throw new Error('STOREFRONT_URL must be a credential-free HTTPS origin in production')
  }

  return url.origin
}

const signPreviewGrant = (path: string, expires: string) =>
  createHmac('sha256', getPreviewSecret())
    .update(`${path}\n${expires}`)
    .digest('base64url')

const previewURL = (path: string, req: PayloadRequest) => {
  if (!req.user) {
    return null
  }

  const expires = String(Math.floor(Date.now() / 1000) + PREVIEW_TTL_SECONDS)
  const params = new URLSearchParams({
    path,
    expires,
    signature: signPreviewGrant(path, expires),
  })

  return `${storefrontOrigin()}/api/preview?${params.toString()}`
}

export const collectionPreview =
  (
    resolvePath: (doc: Record<string, unknown>) => string | null,
  ): GeneratePreviewURL =>
  (doc, { req }) => {
    const path = resolvePath(doc)
    return path ? previewURL(path, req) : null
  }

export const globalPreview =
  (path: string): GeneratePreviewURL =>
  (_doc, { req }) =>
    previewURL(path, req)

export const livePreviewURL = ({
  collectionConfig,
  data,
  globalConfig,
  req,
}: {
  collectionConfig?: { slug: string }
  data: Record<string, unknown>
  globalConfig?: { slug: string }
  req: PayloadRequest
}) => {
  if (!req.user) {
    return null
  }

  let path: string | null = null

  if (collectionConfig?.slug === 'category-pages') {
    const parent = typeof data.parentCategory === 'string' ? data.parentCategory : ''
    const slug = typeof data.slug === 'string' ? data.slug : ''
    path = parent && slug ? `/shop/${parent}/${slug}` : null
  } else if (collectionConfig?.slug === 'clef-edit-articles') {
    const slug = typeof data.slug === 'string' ? data.slug : ''
    path = slug ? `/clef-edit/${slug}` : null
  } else if (
    globalConfig &&
    ['homepage', 'video-section', 'footer'].includes(globalConfig.slug)
  ) {
    path = '/'
  } else if (globalConfig?.slug === 'all-products-pages') {
    path = '/all-skincare'
  }

  return path ? previewURL(path, req) : null
}
