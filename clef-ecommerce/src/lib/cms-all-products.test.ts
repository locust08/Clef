import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'

import {
  DEFAULT_ALL_PRODUCTS_PAGE_CONTENT,
  getAllProductsPageContent,
} from './cms'

const originalFetch = globalThis.fetch

test('maps All Products Pages CMS content and merges missing cards with defaults', async () => {
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        skincare: {
          heroTitle: 'CMS Skincare Hero',
          heroCtaLabel: 'Shop Skincare',
          categoryCards: [
            {
              title: 'CMS Anti Aging',
              href: '/shop/skincare/anti-aging',
              image: null,
            },
          ],
        },
      }),
      { status: 200 },
    )

  try {
    const content = await getAllProductsPageContent('skincare')

    assert.equal(content.hero.title, 'CMS Skincare Hero')
    assert.equal(content.hero.ctaLabel, 'Shop Skincare')
    assert.equal(content.categoryCards.length, 4)
    assert.equal(content.categoryCards[0]?.title, 'CMS Anti Aging')
    assert.equal(
      content.categoryCards[0]?.image.src,
      DEFAULT_ALL_PRODUCTS_PAGE_CONTENT.skincare.categoryCards[0]?.image.src,
    )
    assert.equal(content.categoryCards[3]?.title, 'Facial Mask')
  } finally {
    globalThis.fetch = originalFetch
  }
})

test('maps the Fragrance video banner without adding category cards', async () => {
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        fragrance: {
          bannerEyebrow: 'Discover',
          bannerTitle: 'CMS Fragrance Story',
          bannerDescription: 'A CMS-managed fragrance banner.',
          bannerVideoUrl: 'https://youtu.be/example',
        },
      }),
      { status: 200 },
    )

  try {
    const content = await getAllProductsPageContent('fragrance')

    assert.equal(content.categoryCards.length, 0)
    assert.equal(content.fragranceBanner?.eyebrow, 'Discover')
    assert.equal(content.fragranceBanner?.title, 'CMS Fragrance Story')
    assert.equal(content.fragranceBanner?.videoUrl, 'https://youtu.be/example')
  } finally {
    globalThis.fetch = originalFetch
  }
})

test('returns complete local defaults when Payload is offline', async () => {
  globalThis.fetch = async () => {
    throw new Error('Payload offline')
  }

  try {
    const content = await getAllProductsPageContent('personal-care')

    assert.deepEqual(
      content,
      DEFAULT_ALL_PRODUCTS_PAGE_CONTENT['personal-care'],
    )
  } finally {
    globalThis.fetch = originalFetch
  }
})

test('parent category product selection remains Medusa-only', () => {
  const source = fs.readFileSync(
    path.resolve('src/lib/category-page.ts'),
    'utf8',
  )

  assert.match(source, /getProductsByCategoryHandle/)
  assert.match(source, /getSkincareHeaderProducts/)
  assert.match(source, /getPersonalCareHeaderProducts/)
  assert.doesNotMatch(source, /topMedusaProductHandles/)
  assert.doesNotMatch(source, /getProductsByPayloadHandles/)
})
