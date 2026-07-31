import assert from 'node:assert/strict'
import { createHmac } from 'node:crypto'
import { after, before, test } from 'node:test'

import type { NextApiRequest, NextApiResponse } from 'next'

import exitPreview from '../pages/api/exit-preview'
import preview from '../pages/api/preview'
import {
  PREVIEW_TTL_SECONDS,
  isPreviewablePath,
  isSafeLocalPath,
  verifyPreviewGrant,
  withDraftQuery,
} from './preview'

const originalSecret = process.env.PREVIEW_SECRET
const secret = 'test-only-preview-secret-with-at-least-32-characters'

before(() => {
  process.env.PREVIEW_SECRET = secret
})
after(() => {
  if (originalSecret === undefined) delete process.env.PREVIEW_SECRET
  else process.env.PREVIEW_SECRET = originalSecret
})

const signatureFor = (path: string, expires: string) =>
  createHmac('sha256', secret)
    .update(`${path}\n${expires}`)
    .digest('base64url')

const mockResponse = () => {
  const state: Record<string, unknown> = { headers: {} }
  const response = {
    clearPreviewData: () => {
      state.cleared = true
      return response
    },
    json: (body: unknown) => {
      state.body = body
      return response
    },
    redirect: (status: number, location: string) => {
      state.redirect = { status, location }
      return response
    },
    setHeader: (name: string, value: string) => {
      ;(state.headers as Record<string, string>)[name] = value
      return response
    },
    setPreviewData: (data: unknown, options: unknown) => {
      state.preview = { data, options }
      return response
    },
    status: (status: number) => {
      state.status = status
      return response
    },
  }

  return { response: response as unknown as NextApiResponse, state }
}

test('preview route allowlist blocks open redirects', () => {
  assert.equal(isSafeLocalPath('https://attacker.example'), false)
  assert.equal(isSafeLocalPath('//attacker.example'), false)
  assert.equal(isPreviewablePath('/unknown'), false)
  assert.equal(isPreviewablePath('/shop/skincare/anti-aging'), true)
})

test('preview grants are short-lived and signature protected', () => {
  const now = 2_000_000_000
  const expires = String(now + PREVIEW_TTL_SECONDS)
  const path = '/'

  assert.equal(
    verifyPreviewGrant({
      path,
      expires,
      signature: signatureFor(path, expires),
      now,
    }),
    true,
  )
  assert.equal(
    verifyPreviewGrant({ path, expires, signature: 'invalid', now }),
    false,
  )
  assert.equal(
    verifyPreviewGrant({
      path,
      expires: String(now - 1),
      signature: signatureFor(path, String(now - 1)),
      now,
    }),
    false,
  )
})

test('authorized preview enables Preview Mode and invalid grants are rejected', () => {
  const expires = String(Math.floor(Date.now() / 1000) + 60)
  const path = '/all-skincare'
  const signedURL = `/api/preview?path=${encodeURIComponent(path)}&expires=${expires}&signature=${signatureFor(path, expires)}`
  const valid = mockResponse()

  preview(
    { method: 'GET', url: signedURL } as NextApiRequest,
    valid.response,
  )
  assert.deepEqual(valid.state.redirect, { status: 307, location: path })
  assert.ok(valid.state.preview)

  const invalid = mockResponse()
  preview(
    {
      method: 'GET',
      url: `/api/preview?path=%2F&expires=${expires}&signature=invalid`,
    } as NextApiRequest,
    invalid.response,
  )
  assert.equal(invalid.state.status, 403)
  assert.equal(invalid.state.preview, undefined)
})

test('exit clears Preview Mode and rejects external destinations', () => {
  const valid = mockResponse()
  exitPreview(
    { method: 'GET', url: '/api/exit-preview?path=%2F' } as NextApiRequest,
    valid.response,
  )
  assert.equal(valid.state.cleared, true)
  assert.deepEqual(valid.state.redirect, { status: 307, location: '/' })

  const invalid = mockResponse()
  exitPreview(
    {
      method: 'GET',
      url: '/api/exit-preview?path=https%3A%2F%2Fattacker.example',
    } as NextApiRequest,
    invalid.response,
  )
  assert.equal(invalid.state.status, 400)
  assert.equal(invalid.state.cleared, undefined)
})

test('draft and published CMS URLs cannot share a cache key', () => {
  const published = '/api/globals/homepage?depth=1'
  const draft = withDraftQuery(published)

  assert.notEqual(draft, published)
  assert.match(draft, /(?:\?|&)draft=true(?:&|$)/)
})
