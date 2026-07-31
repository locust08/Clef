import type { NextApiRequest, NextApiResponse } from 'next'

import { isSafeLocalPath } from '../../lib/preview'

export default function exitPreview(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const requestURL = new URL(req.url || '', 'https://storefront.invalid')
  const keys: string[] = []
  requestURL.searchParams.forEach((_value, key) => keys.push(key))
  if (keys.some((key) => key !== 'path')) {
    return res.status(400).json({ error: 'Invalid exit request' })
  }

  const requestedPath = requestURL.searchParams.get('path') || '/'
  if (!isSafeLocalPath(requestedPath)) {
    return res.status(400).json({ error: 'Invalid redirect destination' })
  }

  res.clearPreviewData({ path: '/' })
  res.setHeader('Cache-Control', 'private, no-store, max-age=0')
  return res.redirect(307, requestedPath)
}
