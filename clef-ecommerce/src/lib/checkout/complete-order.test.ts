import assert from 'node:assert/strict'
import test from 'node:test'

import {
  buildSummaryUrl,
  createCartCompletionCoordinator,
} from './complete-order'

test('a successful order completion redirects with the genuine Medusa order ID', async () => {
  const events: string[] = []
  const complete = createCartCompletionCoordinator()

  const orderId = await complete({
    cartId: 'cart_01KXFTESTCART00000000000000',
    completeCart: async () => ({
      type: 'order',
      order: { id: 'order_01KXFV138MST9DT8PGHQKTA64N' },
    }),
    authorizeOrder: async (id) => { events.push(`authorize:${id}`) },
    invalidateCart: async () => { events.push('invalidate:cart') },
    invalidateOrders: async () => { events.push('invalidate:orders') },
    clearCart: async () => { events.push('clear:cart') },
  })

  assert.equal(orderId, 'order_01KXFV138MST9DT8PGHQKTA64N')
  assert.equal(
    buildSummaryUrl(orderId),
    '/summary?order_id=order_01KXFV138MST9DT8PGHQKTA64N',
  )
  assert.deepEqual(events, [
    'authorize:order_01KXFV138MST9DT8PGHQKTA64N',
    'invalidate:cart',
    'invalidate:orders',
    'clear:cart',
  ])
})

test('a cart completion preserves the cart and exposes the Medusa error', async () => {
  const complete = createCartCompletionCoordinator()
  let cleared = false

  await assert.rejects(
    complete({
      cartId: 'cart_01KXFTESTCART00000000000001',
      completeCart: async () => ({
        type: 'cart',
        cart: { id: 'cart_01KXFTESTCART00000000000001' },
        error: { message: 'Payment authorization is incomplete.' },
      }),
      authorizeOrder: async () => undefined,
      invalidateCart: async () => undefined,
      invalidateOrders: async () => undefined,
      clearCart: async () => {
        cleared = true
      },
    }),
    /Payment authorization is incomplete/,
  )

  assert.equal(cleared, false)
})

test('repeated completion attempts complete one cart only once', async () => {
  const complete = createCartCompletionCoordinator()
  let completionCount = 0
  const input = {
    cartId: 'cart_01KXFTESTCART00000000000002',
    completeCart: async () => {
      completionCount += 1
      return {
        type: 'order' as const,
        order: { id: 'order_01KXFSTWDKMAX9Z5CBK7XT8AD5' },
      }
    },
    authorizeOrder: async () => undefined,
    invalidateCart: async () => undefined,
    invalidateOrders: async () => undefined,
    clearCart: async () => undefined,
  }

  const [first, second] = await Promise.all([complete(input), complete(input)])

  assert.equal(first, second)
  assert.equal(completionCount, 1)
})
