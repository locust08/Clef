import type { NextApiRequest, NextApiResponse } from 'next'

import {
  clearCustomerSessionCookie,
  setCustomerSessionCookie,
} from '../../../lib/medusa/server-auth'
import { medusaServerFetch } from '../../../lib/medusa/server-fetch'

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  response.setHeader('Cache-Control', 'no-store')

  if (request.method === 'DELETE') {
    clearCustomerSessionCookie(response)
    response.status(204).end()
    return
  }

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST, DELETE')
    response.status(405).json({ message: 'Method not allowed.' })
    return
  }

  const authorization = request.headers.authorization
  const token = authorization?.startsWith('Bearer ')
    ? authorization.slice('Bearer '.length).trim()
    : ''

  if (!token) {
    response.status(401).json({ message: 'A valid customer session is required.' })
    return
  }

  const customerResponse = await medusaServerFetch('/store/customers/me?fields=id,email', {
    authToken: token,
  })
  console.info(`[auth] session validation status=${customerResponse.status}`)

  if (!customerResponse.ok) {
    response.status(401).json({ message: 'The customer session is invalid or expired.' })
    return
  }

  const body = (await customerResponse.json()) as { customer?: { id?: string } }

  if (!body.customer?.id) {
    response.status(401).json({ message: 'The customer session is invalid.' })
    return
  }

  setCustomerSessionCookie(response, token)
  response.status(200).json({ authenticated: true })
}

