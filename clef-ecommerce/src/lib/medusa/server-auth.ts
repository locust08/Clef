import { createHmac, timingSafeEqual } from 'node:crypto'
import type { IncomingMessage, ServerResponse } from 'node:http'

import { medusaServerFetch } from './server-fetch'

export const CUSTOMER_SESSION_COOKIE = 'clef_customer_session'
export const ORDER_ACCESS_COOKIE = 'clef_order_access'

type CookieRequest = Pick<IncomingMessage, 'headers'>
type CookieResponse = Pick<ServerResponse, 'setHeader'>

const parseCookies = (request: CookieRequest) => {
  const cookieHeader = request.headers.cookie ?? ''

  return Object.fromEntries(
    cookieHeader
      .split(';')
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const separator = part.indexOf('=')
        const key = separator >= 0 ? part.slice(0, separator) : part
        const value = separator >= 0 ? part.slice(separator + 1) : ''
        return [key, decodeURIComponent(value)]
      }),
  )
}

const serializeCookie = (
  name: string,
  value: string,
  options: { maxAge: number },
) => {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
  return `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${options.maxAge}${secure}`
}

export const getCustomerSessionToken = (request: CookieRequest) =>
  parseCookies(request)[CUSTOMER_SESSION_COOKIE] || null

export const setCustomerSessionCookie = (
  response: CookieResponse,
  token: string,
) => {
  response.setHeader(
    'Set-Cookie',
    serializeCookie(CUSTOMER_SESSION_COOKIE, token, { maxAge: 60 * 60 * 24 * 7 }),
  )
}

export const clearCustomerSessionCookie = (response: CookieResponse) => {
  response.setHeader(
    'Set-Cookie',
    serializeCookie(CUSTOMER_SESSION_COOKIE, '', { maxAge: 0 }),
  )
}

const getOrderLookupSecret = () => {
  const secret = process.env.ORDER_LOOKUP_SECRET || process.env.COOKIE_SECRET

  if (!secret || secret.length < 32) {
    throw new Error('ORDER_LOOKUP_SECRET must be configured with at least 32 characters.')
  }

  return secret
}

const sign = (payload: string) =>
  createHmac('sha256', getOrderLookupSecret()).update(payload).digest('base64url')

export const setOrderAccessCookie = (
  response: CookieResponse,
  orderId: string,
) => {
  const payload = Buffer.from(
    JSON.stringify({ orderId, expiresAt: Date.now() + 15 * 60 * 1000 }),
  ).toString('base64url')
  const token = `${payload}.${sign(payload)}`

  response.setHeader(
    'Set-Cookie',
    serializeCookie(ORDER_ACCESS_COOKIE, token, { maxAge: 15 * 60 }),
  )
}

export const getAuthorisedGuestOrderId = (request: CookieRequest) => {
  const token = parseCookies(request)[ORDER_ACCESS_COOKIE]

  if (!token) {
    return null
  }

  const [payload, suppliedSignature] = token.split('.')

  if (!payload || !suppliedSignature) {
    return null
  }

  const expectedSignature = sign(payload)
  const supplied = Buffer.from(suppliedSignature)
  const expected = Buffer.from(expectedSignature)

  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) {
    return null
  }

  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
      orderId?: string
      expiresAt?: number
    }

    return parsed.orderId && parsed.expiresAt && parsed.expiresAt > Date.now()
      ? parsed.orderId
      : null
  } catch {
    return null
  }
}

export const getServerCustomer = async (request: CookieRequest) => {
  const authToken = getCustomerSessionToken(request)

  if (!authToken) {
    return { authToken: null, customerId: null }
  }

  const response = await medusaServerFetch('/store/customers/me?fields=id,email', {
    authToken,
  })

  if (!response.ok) {
    return { authToken: null, customerId: null }
  }

  const body = (await response.json()) as { customer?: { id?: string } }

  return {
    authToken,
    customerId: body.customer?.id ?? null,
  }
}

