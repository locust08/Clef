import type { NextApiRequest, NextApiResponse } from 'next'

import { createCartCompletionCoordinator } from '../../../lib/checkout/complete-order'
import {
  getCustomerSessionToken,
  setOrderAccessCookie,
} from '../../../lib/medusa/server-auth'
import { medusaServerFetch } from '../../../lib/medusa/server-fetch'

const completeOnce = createCartCompletionCoordinator()
const CART_ID_PATTERN = /^cart_[0-9A-HJKMNP-TV-Z]{26}$/

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate')

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    response.status(405).json({ message: 'Method not allowed.' })
    return
  }

  const cartId = typeof request.body?.cartId === 'string' ? request.body.cartId : ''

  if (!CART_ID_PATTERN.test(cartId)) {
    response.status(400).json({ message: 'Invalid cart reference.' })
    return
  }

  const authToken = getCustomerSessionToken(request)

  try {
    const orderId = await completeOnce({
      cartId,
      completeCart: async () => {
        const medusaResponse = await medusaServerFetch(
          `/store/carts/${encodeURIComponent(cartId)}/complete`,
          { method: 'POST', authToken },
        )
        const body = (await medusaResponse.json()) as {
          type?: 'order' | 'cart'
          order?: { id?: string | null } | null
          cart?: { id?: string | null } | null
          error?: { message?: string | null } | string | null
          message?: string
        }

        if (!medusaResponse.ok) {
          return {
            type: 'cart' as const,
            cart: body.cart,
            error: body.message || body.error || 'Medusa could not complete the cart.',
          }
        }

        return body.type === 'order'
          ? { type: 'order' as const, order: body.order }
          : { type: 'cart' as const, cart: body.cart, error: body.error || body.message }
      },
      authorizeOrder: async (id) => {
        setOrderAccessCookie(response, id)
      },
      invalidateCart: async () => undefined,
      invalidateOrders: async () => undefined,
      clearCart: async () => undefined,
    })

    response.status(200).json({ type: 'order', order: { id: orderId } })
  } catch (error) {
    response.status(409).json({
      type: 'cart',
      message:
        error instanceof Error
          ? error.message
          : 'Medusa could not complete the cart. Your cart has been kept.',
    })
  }
}
