import assert from 'node:assert/strict'
import test from 'node:test'

import {
  OrderAccessError,
  listCustomerOrdersServer,
  retrieveOrderServer,
  validateOrderId,
} from './orders'

process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL = 'http://medusa.test'
process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY = 'pk_test_unit_fixture'

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })

test('valid authorised order retrieval returns the exact Medusa order', async () => {
  const order = await retrieveOrderServer(
    'order_01KXFV138MST9DT8PGHQKTA64N',
    { customerId: 'cus_buyer', authToken: 'token', guestOrderId: null },
    async () => jsonResponse({
      order: { id: 'order_01KXFV138MST9DT8PGHQKTA64N', customer_id: 'cus_buyer' },
    }),
  )

  assert.equal(order.id, 'order_01KXFV138MST9DT8PGHQKTA64N')
})

test('malformed, forged, and unauthorised order references reveal no details', async () => {
  assert.equal(validateOrderId('not-an-order'), false)
  let fetchCount = 0

  await assert.rejects(
    retrieveOrderServer(
      'order_01KXFSTWDKMAX9Z5CBK7XT8AD5',
      { customerId: null, authToken: null, guestOrderId: 'order_different' },
      async () => {
        fetchCount += 1
        return jsonResponse({ order: { id: 'should-not-load' } })
      },
    ),
    (error: unknown) => error instanceof OrderAccessError && error.status === 403,
  )

  assert.equal(fetchCount, 0)
})

test('history requires a valid customer session', async () => {
  await assert.rejects(
    listCustomerOrdersServer(
      { authToken: null, customerId: null, limit: 10, offset: 0 },
      async () => jsonResponse({ orders: [] }),
    ),
    (error: unknown) => error instanceof OrderAccessError && error.status === 401,
  )
})

test('history contains newly completed customer orders sorted newest first', async () => {
  const result = await listCustomerOrdersServer(
    { authToken: 'token', customerId: 'cus_buyer', limit: 10, offset: 0 },
    async () => jsonResponse({
      orders: [
        { id: 'order_old', customer_id: 'cus_buyer', created_at: '2026-07-13T00:00:00Z' },
        { id: 'order_new', customer_id: 'cus_buyer', created_at: '2026-07-14T00:00:00Z' },
        { id: 'order_other', customer_id: 'cus_other', created_at: '2026-07-15T00:00:00Z' },
      ],
      count: 3,
    }),
  )

  assert.deepEqual(result.orders.map((order) => order.id), ['order_new', 'order_old'])
})
