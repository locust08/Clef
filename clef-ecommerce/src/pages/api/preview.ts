import type { NextApiRequest, NextApiResponse } from 'next'

import { PREVIEW_TTL_SECONDS, verifyPreviewGrant } from '../../lib/preview'

const expectedParameters = new Set(['path', 'expires', 'signature'])

export default function preview(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const requestURL = new URL(req.url || '', 'https://storefront.invalid')
  const keys: string[] = []
  requestURL.searchParams.forEach((_value, key) => keys.push(key))
  if (
    keys.length !== expectedParameters.size ||
    keys.some((key) => !expectedParameters.has(key))
  ) {
    return res.status(400).json({ error: 'Invalid preview request' })
  }

  const path = requestURL.searchParams.get('path') || ''
  const expires = requestURL.searchParams.get('expires') || ''
  const signature = requestURL.searchParams.get('signature') || ''

  try {
    if (!verifyPreviewGrant({ path, expires, signature })) {
      return res.status(403).json({ error: 'Preview authorization failed' })
    }
  } catch {
    return res.status(503).json({ error: 'Preview is unavailable' })
  }

  res.setHeader('Cache-Control', 'private, no-store, max-age=0')
  res.setPreviewData(
    { path, expiresAt: Number(expires) },
    { maxAge: PREVIEW_TTL_SECONDS, path: '/' },
  )
  return res.redirect(307, path)
}
