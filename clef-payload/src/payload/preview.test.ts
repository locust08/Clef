import assert from 'node:assert/strict'
import { after, before, test } from 'node:test'

import type { PayloadRequest } from 'payload'

import {
  livePreviewURL,
  publishedGlobalOrAuthenticated,
  publishedOrAuthenticated,
} from './preview'

const previousSecret = process.env.PREVIEW_SECRET
const previousStorefront = process.env.STOREFRONT_URL

before(() => {
  process.env.PREVIEW_SECRET =
    'test-only-preview-secret-with-at-least-32-characters'
  process.env.STOREFRONT_URL = 'https://storefront.example'
})
after(() => {
  if (previousSecret === undefined) delete process.env.PREVIEW_SECRET
  else process.env.PREVIEW_SECRET = previousSecret
  if (previousStorefront === undefined) delete process.env.STOREFRONT_URL
  else process.env.STOREFRONT_URL = previousStorefront
})

const request = ({
  draft = false,
  previewSecret,
  user = null,
}: {
  draft?: boolean
  previewSecret?: string
  user?: Record<string, unknown> | null
}) =>
  ({
    headers: new Headers(
      previewSecret ? { 'x-payload-preview-secret': previewSecret } : {},
    ),
    query: draft ? { draft: 'true' } : {},
    user,
  }) as unknown as PayloadRequest

test('public collection reads are constrained to published documents', () => {
  assert.deepEqual(publishedOrAuthenticated({ req: request({}) }), {
    _status: { equals: 'published' },
  })
  assert.equal(
    publishedOrAuthenticated({ req: request({ user: { id: 1 } }) }),
    true,
  )
})

test('public global draft reads are denied and server-authorized reads pass', () => {
  assert.equal(
    publishedGlobalOrAuthenticated({ req: request({ draft: true }) }),
    false,
  )
  assert.equal(
    publishedGlobalOrAuthenticated({ req: request({ draft: false }) }),
    true,
  )
  assert.equal(
    publishedGlobalOrAuthenticated({
      req: request({
        draft: true,
        previewSecret:
          'test-only-preview-secret-with-at-least-32-characters',
      }),
    }),
    true,
  )
})

test('Preview and Live Preview URLs map actual storefront routes without the secret', () => {
  const req = request({ user: { id: 1 } })
  const categoryURL = livePreviewURL({
    collectionConfig: { slug: 'category-pages' },
    data: { parentCategory: 'skincare', slug: 'anti-aging' },
    req,
  })
  const footerURL = livePreviewURL({
    data: {},
    globalConfig: { slug: 'footer' },
    req,
  })
  const productsURL = livePreviewURL({
    data: {},
    globalConfig: { slug: 'all-products-pages' },
    req,
  })

  assert.equal(new URL(categoryURL!).searchParams.get('path'), '/shop/skincare/anti-aging')
  assert.equal(new URL(footerURL!).searchParams.get('path'), '/')
  assert.equal(new URL(productsURL!).searchParams.get('path'), '/all-skincare')
  assert.equal(categoryURL!.includes(process.env.PREVIEW_SECRET!), false)
})

test('unauthenticated users cannot mint a Live Preview grant', () => {
  assert.equal(
    livePreviewURL({
      data: {},
      globalConfig: { slug: 'homepage' },
      req: request({}),
    }),
    null,
  )
})
