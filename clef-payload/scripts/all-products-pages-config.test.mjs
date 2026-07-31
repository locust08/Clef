import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'

const globalPath = path.resolve('src/payload/globals/AllProductsPages.ts')
const configPath = path.resolve('payload.config.ts')
const globalSource = fs.readFileSync(globalPath, 'utf8')
const configSource = fs.readFileSync(configPath, 'utf8')

test('registers the All Products Pages global with three editing tabs', () => {
  assert.match(configSource, /AllProductsPages/)
  assert.match(configSource, /globals: \[Homepage, AllProductsPages, VideoSection, Footer\]/)
  assert.match(globalSource, /slug: 'all-products-pages'/)

  for (const label of ['Skincare', 'Personal Care', 'Fragrances']) {
    assert.match(globalSource, new RegExp(`label: '${label}'`))
  }
})

test('exposes hero, cards, and fragrance banner fields without product controls', () => {
  for (const field of [
    'heroTitle',
    'heroImage',
    'heroCtaLabel',
    'categoryCards',
    'bannerEyebrow',
    'bannerTitle',
    'bannerDescription',
    'bannerVideoUrl',
  ]) {
    assert.match(globalSource, new RegExp(`name: '${field}'`))
  }

  assert.doesNotMatch(globalSource, /topMedusaProductHandles/)
  assert.doesNotMatch(globalSource, /productHandle/i)
  assert.match(globalSource, /minRows: 4/)
  assert.match(globalSource, /maxRows: 4/)
})
