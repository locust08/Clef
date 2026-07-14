export type MedusaCompletionResponse =
  | { type: 'order'; order?: { id?: string | null } | null }
  | {
      type: 'cart'
      cart?: { id?: string | null } | null
      error?: { message?: string | null } | string | null
    }

type CompletionInput = {
  cartId: string
  completeCart: () => Promise<MedusaCompletionResponse>
  authorizeOrder: (orderId: string) => Promise<void>
  invalidateCart: () => Promise<void>
  invalidateOrders: () => Promise<void>
  clearCart: () => Promise<void>
}

const getCartCompletionError = (
  response: Extract<MedusaCompletionResponse, { type: 'cart' }>,
) => {
  if (typeof response.error === 'string' && response.error.trim()) {
    return response.error
  }

  if (response.error && typeof response.error === 'object' && response.error.message) {
    return response.error.message
  }

  return 'Medusa could not complete this cart. Your cart has been kept so you can safely try again.'
}

export const buildSummaryUrl = (orderId: string) =>
  `/summary?order_id=${encodeURIComponent(orderId)}`

export const createCartCompletionCoordinator = () => {
  const completions = new Map<string, Promise<string>>()

  return async (input: CompletionInput) => {
    const existing = completions.get(input.cartId)

    if (existing) {
      return existing
    }

    const completion = (async () => {
      const response = await input.completeCart()

      if (response.type !== 'order' || !response.order?.id) {
        throw new Error(
          response.type === 'cart'
            ? getCartCompletionError(response)
            : 'Medusa did not return a completed order.',
        )
      }

      const orderId = response.order.id
      await input.authorizeOrder(orderId)
      await input.invalidateCart()
      await input.invalidateOrders()
      await input.clearCart()

      return orderId
    })()

    completions.set(input.cartId, completion)

    try {
      return await completion
    } catch (error) {
      completions.delete(input.cartId)
      throw error
    }
  }
}

