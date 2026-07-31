import type { GetServerSidePropsContext } from 'next'

import { getServerCustomer } from './server-auth'
import { listCustomerOrdersServer, type MedusaOrder } from './orders'

export type OrderHistoryPageProps = {
  authenticated: boolean
  orders: MedusaOrder[]
  page: number
  hasNextPage: boolean
  error: string | null
}

export const getOrderHistoryPageProps = async (
  context: GetServerSidePropsContext,
): Promise<OrderHistoryPageProps> => {
  context.res.setHeader('Cache-Control', 'private, no-store, max-age=0')
  const pageValue = Array.isArray(context.query.page)
    ? context.query.page[0]
    : context.query.page
  const page = Math.max(1, Number.parseInt(pageValue ?? '1', 10) || 1)
  const limit = 10

  try {
    const customer = await getServerCustomer(context.req)

    if (!customer.authToken || !customer.customerId) {
      return { authenticated: false, orders: [], page, hasNextPage: false, error: null }
    }

    const result = await listCustomerOrdersServer({
      authToken: customer.authToken,
      customerId: customer.customerId,
      limit,
      offset: (page - 1) * limit,
    })

    return {
      authenticated: true,
      orders: result.orders,
      page,
      hasNextPage: result.orders.length === limit,
      error: null,
    }
  } catch (error) {
    console.error(`[orders] history lookup failed: ${error instanceof Error ? error.message : 'unknown error'}`)
    return {
      authenticated: true,
      orders: [],
      page,
      hasNextPage: false,
      error: 'Order history is temporarily unavailable. Please try again.',
    }
  }
}

