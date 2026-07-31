import { getMedusaBackendUrl, getMedusaPublishableKey } from '../medusa-store'

export type MedusaOrderItem = {
  id: string
  title?: string | null
  subtitle?: string | null
  thumbnail?: string | null
  quantity?: number | null
  unit_price?: number | null
  total?: number | null
  variant?: {
    id?: string | null
    title?: string | null
    product?: { id?: string | null; handle?: string | null; title?: string | null } | null
  } | null
}

export type MedusaOrder = {
  id: string
  display_id?: number | string | null
  customer_id?: string | null
  created_at?: string | null
  email?: string | null
  currency_code?: string | null
  status?: string | null
  payment_status?: string | null
  fulfillment_status?: string | null
  subtotal?: number | null
  item_total?: number | null
  shipping_total?: number | null
  discount_total?: number | null
  tax_total?: number | null
  total?: number | null
  items?: MedusaOrderItem[]
  shipping_address?: Record<string, unknown> | null
  billing_address?: Record<string, unknown> | null
  payment_collections?: Array<{
    id?: string | null
    status?: string | null
    amount?: number | null
    captured_amount?: number | null
    payments?: Array<{
      id?: string | null
      amount?: number | null
      captured_at?: string | null
      canceled_at?: string | null
    }>
  }>
}

export class OrderAccessError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'OrderAccessError'
    this.status = status
  }
}

type OrderAccess = {
  authToken: string | null
  customerId: string | null
  guestOrderId: string | null
}

type HistoryInput = {
  authToken: string | null
  customerId: string | null
  limit: number
  offset: number
}

type Fetch = typeof fetch

const ORDER_ID_PATTERN = /^order_[0-9A-HJKMNP-TV-Z]{26}$/
const ORDER_FIELDS = [
  'id',
  'display_id',
  'customer_id',
  'created_at',
  'email',
  'currency_code',
  'status',
  'payment_status',
  'fulfillment_status',
  'subtotal',
  'item_total',
  'shipping_total',
  'discount_total',
  'tax_total',
  'total',
  '*items',
  '*items.variant',
  '*items.variant.product',
  '*shipping_address',
  '*billing_address',
  '*payment_collections',
  '*payment_collections.payments',
].join(',')

export const validateOrderId = (orderId: string) => ORDER_ID_PATTERN.test(orderId)

const getHeaders = (authToken?: string | null) => {
  const publishableKey = getMedusaPublishableKey()

  if (!publishableKey) {
    throw new OrderAccessError('The Medusa publishable key is missing.', 503)
  }

  const headers = new Headers({ 'x-publishable-api-key': publishableKey })

  if (authToken) {
    headers.set('authorization', `Bearer ${authToken}`)
  }

  return headers
}

const readError = async (response: Response) => {
  try {
    const body = (await response.json()) as { message?: string }
    return body.message || 'Medusa order request failed.'
  } catch {
    return 'Medusa order request failed.'
  }
}

export const getOrderPaymentStatus = (order: MedusaOrder) => {
  if (order.payment_status) {
    return order.payment_status
  }

  const collections = order.payment_collections ?? []

  if (collections.some((collection) => collection.status === 'completed')) {
    return 'captured'
  }

  if (collections.some((collection) => collection.payments?.some((payment) => payment.captured_at))) {
    return 'captured'
  }

  return collections[0]?.status ?? 'pending'
}

export const retrieveOrderServer = async (
  orderId: string,
  access: OrderAccess,
  fetchImpl: Fetch = fetch,
  attempts = 1,
) => {
  if (!validateOrderId(orderId)) {
    throw new OrderAccessError('Invalid order reference.', 400)
  }

  const hasCustomerAccess = Boolean(access.authToken && access.customerId)
  const hasGuestAccess = access.guestOrderId === orderId

  if (!hasCustomerAccess && !hasGuestAccess) {
    throw new OrderAccessError('You are not authorised to view this order.', 403)
  }

  let lastStatus = 404

  for (let attempt = 1; attempt <= Math.max(1, Math.min(attempts, 5)); attempt += 1) {
    const response = await fetchImpl(
      `${getMedusaBackendUrl()}/store/orders/${encodeURIComponent(orderId)}?fields=${encodeURIComponent(ORDER_FIELDS)}`,
      {
        cache: 'no-store',
        headers: getHeaders(access.authToken),
      },
    )
    lastStatus = response.status

    if (response.ok) {
      const body = (await response.json()) as { order?: MedusaOrder }
      const order = body.order

      if (!order?.id || order.id !== orderId) {
        throw new OrderAccessError('Medusa returned an invalid order response.', 502)
      }

      if (hasCustomerAccess && order.customer_id !== access.customerId && !hasGuestAccess) {
        throw new OrderAccessError('You are not authorised to view this order.', 403)
      }

      return order
    }

    if (response.status !== 404 || attempt === attempts) {
      throw new OrderAccessError(
        response.status === 404 ? 'Order not found.' : await readError(response),
        response.status,
      )
    }

    await new Promise((resolve) => setTimeout(resolve, 200))
  }

  throw new OrderAccessError('Order not found.', lastStatus)
}

export const listCustomerOrdersServer = async (
  input: HistoryInput,
  fetchImpl: Fetch = fetch,
) => {
  if (!input.authToken || !input.customerId) {
    throw new OrderAccessError('Please log in to view order history.', 401)
  }

  const limit = Math.max(1, Math.min(input.limit, 50))
  const offset = Math.max(0, input.offset)
  const query = new URLSearchParams({
    fields: ORDER_FIELDS,
    limit: String(limit),
    offset: String(offset),
    order: '-created_at',
  })
  const response = await fetchImpl(`${getMedusaBackendUrl()}/store/orders?${query}`, {
    cache: 'no-store',
    headers: getHeaders(input.authToken),
  })
  if (!response.ok) {
    throw new OrderAccessError(await readError(response), response.status)
  }

  const body = (await response.json()) as { orders?: MedusaOrder[]; count?: number }
  const orders = (body.orders ?? [])
    .filter((order) => order.customer_id === input.customerId)
    .sort(
      (left, right) =>
        new Date(right.created_at ?? 0).getTime() - new Date(left.created_at ?? 0).getTime(),
    )

  return { orders, count: orders.length, limit, offset }
}
