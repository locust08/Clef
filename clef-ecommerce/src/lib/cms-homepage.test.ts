import assert from 'node:assert/strict'
import test from 'node:test'

import {
  DEFAULT_HOMEPAGE_CONTENT,
  getCmsBaseUrl,
  getHomepageContent,
} from './cms'

const originalNodeEnv = process.env.NODE_ENV
const originalPayloadURL = process.env.NEXT_PUBLIC_PAYLOAD_URL
const originalFetch = globalThis.fetch
const originalConsoleError = console.error
const mutableEnv = process.env as Record<string, string | undefined>

const restore = () => {
  mutableEnv.NODE_ENV = originalNodeEnv

  if (originalPayloadURL == null) {
    delete mutableEnv.NEXT_PUBLIC_PAYLOAD_URL
  } else {
    mutableEnv.NEXT_PUBLIC_PAYLOAD_URL = originalPayloadURL
  }

  globalThis.fetch = originalFetch
  console.error = originalConsoleError
}

test.afterEach(restore)

test('production CMS configuration rejects loopback and non-origin URLs', () => {
  mutableEnv.NODE_ENV = 'production'

  for (const invalidURL of [
    'http://localhost:3001',
    'https://127.0.0.1:3001',
    'https://payload.example.com/api',
  ]) {
    mutableEnv.NEXT_PUBLIC_PAYLOAD_URL = invalidURL
    assert.throws(() => getCmsBaseUrl())
  }
})

test('Homepage public request uses no credentials or draft query', async () => {
  mutableEnv.NODE_ENV = 'production'
  mutableEnv.NEXT_PUBLIC_PAYLOAD_URL = 'https://payload.example.com'
  let requestURL = ''
  let requestInit: RequestInit | undefined

  globalThis.fetch = async (input, init) => {
    requestURL = String(input)
    requestInit = init

    return new Response(
      JSON.stringify({
        id: 1,
        updatedAt: '2026-07-31T00:00:00.000Z',
        heroTitle: 'Production title',
        heroSubtitle: 'Production subtitle',
        heroImage: {
          url: 'https://payload.example.com/api/media/file/hero.png',
          alt: 'Hero',
          width: 1200,
          height: 600,
        },
        heroButtonLabel: 'Shop',
        heroButtonHref: '/shop',
        bestSellerTitle: 'Best Seller',
        bestSellerMedusaProductHandles: [],
        promotionBanners: [],
        newLaunchTitle: 'New Launch',
        newLaunchMedusaProductHandles: [],
        homepageVideos: [],
        customerReviews: [],
        sections: [{ section: 'hero', isEnabled: true }],
      }),
      {
        headers: { 'content-type': 'application/json' },
        status: 200,
      },
    )
  }

  const content = await getHomepageContent()

  assert.equal(content.heroTitle, 'Production title')
  assert.equal(
    content.heroImage?.src,
    'https://payload.example.com/api/media/file/hero.png',
  )
  assert.equal(
    requestURL,
    'https://payload.example.com/api/globals/homepage?depth=1',
  )
  assert.ok(!requestURL.includes('draft='))
  assert.equal(requestInit?.credentials, undefined)
  assert.equal(requestInit?.cache, 'no-store')
  assert.equal(
    new Headers(requestInit?.headers).get('authorization'),
    null,
  )
})

test('empty Homepage response uses a controlled fallback', async () => {
  mutableEnv.NODE_ENV = 'production'
  mutableEnv.NEXT_PUBLIC_PAYLOAD_URL = 'https://payload.example.com'
  const errors: unknown[][] = []

  console.error = (...args: unknown[]) => {
    errors.push(args)
  }
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ sections: [] }), {
      headers: { 'content-type': 'application/json' },
      status: 200,
    })

  const content = await getHomepageContent()

  assert.equal(content.heroTitle, DEFAULT_HOMEPAGE_CONTENT.heroTitle)
  assert.equal(errors.length, 1)
  assert.match(String(errors[0][0]), /controlled fallback/)
})
