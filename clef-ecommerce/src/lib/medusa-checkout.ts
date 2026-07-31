import { clearStoredCartId, storeFetch } from './medusa-store'

export const STRIPE_PROVIDER_ID = 'pp_stripe_stripe'

export type CheckoutAddress = {
  email: string
  firstName: string
  lastName: string
  address1: string
  city: string
  province: string
  postalCode: string
  countryCode: string
  phone: string
}

export type ShippingOption = {
  id: string
  name: string
  amount?: number | null
  currency_code?: string | null
}

type PaymentSession = {
  provider_id?: string | null
  data?: Record<string, unknown> | null
}

type CheckoutCart = {
  id: string
  email?: string | null
  currency_code?: string | null
  total?: number | null
  completed_at?: string | null
  items?: unknown[]
  region?: {
    currency_code?: string | null
  } | null
  shipping_address?: unknown | null
  billing_address?: unknown | null
  shipping_methods?: unknown[]
  payment_collection?: {
    id?: string | null
    payment_sessions?: PaymentSession[]
  } | null
}

type CartResponse = { cart?: CheckoutCart }
type ShippingOptionsResponse = { shipping_options?: ShippingOption[] }
type PaymentCollectionResponse = {
  payment_collection?: {
    id?: string | null
    payment_sessions?: PaymentSession[]
  }
}

const CART_FIELDS = [
  '*items',
  '*region',
  '*shipping_methods',
  '*shipping_address',
  '*billing_address',
  '*payment_collection.payment_sessions',
].join(',')

const getCheckoutCart = async (cartId: string) => {
  const response = await storeFetch<CartResponse>(
    `/store/carts/${cartId}?fields=${encodeURIComponent(CART_FIELDS)}`,
  )

  if (!response.cart?.id) {
    throw new Error('Your cart could not be retrieved. Please refresh and try again.')
  }

  return response.cart
}

const validateCheckoutCart = (cart: CheckoutCart) => {
  if (!cart.items?.length) {
    throw new Error('Your cart is empty. Add an item before checking out.')
  }

  if (!(typeof cart.total === 'number' && cart.total > 0)) {
    throw new Error('Your cart total must be greater than zero to pay with Stripe.')
  }

  if (!cart.email) {
    throw new Error('Enter your email address before continuing to payment.')
  }

  if (!cart.shipping_address) {
    throw new Error('Enter a shipping address before continuing to payment.')
  }

  if (!cart.billing_address) {
    throw new Error('Enter a billing address before continuing to payment.')
  }

  if (!cart.shipping_methods?.length) {
    throw new Error('Choose a shipping method before continuing to payment.')
  }

  const currency = (cart.region?.currency_code ?? cart.currency_code ?? '').toLowerCase()

  if (currency !== 'myr') {
    throw new Error('Stripe checkout is available only for the Malaysia (MYR) region.')
  }
}

const toMedusaAddress = (address: CheckoutAddress) => ({
  first_name: address.firstName.trim(),
  last_name: address.lastName.trim(),
  address_1: address.address1.trim(),
  city: address.city.trim(),
  province: address.province.trim(),
  postal_code: address.postalCode.trim(),
  country_code: address.countryCode.trim().toLowerCase(),
  phone: address.phone.trim(),
})

export const saveCheckoutDetails = async (cartId: string, address: CheckoutAddress) => {
  const email = address.email.trim()

  if (!email) {
    throw new Error('Enter your email address before continuing to payment.')
  }

  await storeFetch<CartResponse>(`/store/carts/${cartId}`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      shipping_address: toMedusaAddress(address),
      // Clef intentionally reuses shipping as billing until a separate billing
      // address option is added to the existing checkout design.
      billing_address: toMedusaAddress(address),
    }),
  })

  return getCheckoutCart(cartId)
}

export const listShippingOptions = async (cartId: string) => {
  const response = await storeFetch<ShippingOptionsResponse>(
    `/store/shipping-options?cart_id=${encodeURIComponent(cartId)}`,
  )

  return (response.shipping_options ?? []).filter((option) => Boolean(option.id))
}

const selectShippingMethod = async (cartId: string, optionId: string) => {
  await storeFetch<CartResponse>(`/store/carts/${cartId}/shipping-methods`, {
    method: 'POST',
    body: JSON.stringify({ option_id: optionId }),
  })
}

const getClientSecret = (sessions: PaymentSession[] | undefined) => {
  const stripeSession = sessions?.find(
    (session) => session.provider_id === STRIPE_PROVIDER_ID,
  )
  const clientSecret = stripeSession?.data?.client_secret

  return typeof clientSecret === 'string' && clientSecret.length > 0
    ? clientSecret
    : null
}

export const initialiseStripePayment = async ({
  cartId,
  shippingOptionId,
}: {
  cartId: string
  shippingOptionId: string
}) => {
  if (!shippingOptionId) {
    throw new Error('Choose a shipping method before continuing to payment.')
  }

  await selectShippingMethod(cartId, shippingOptionId)
  const cart = await getCheckoutCart(cartId)
  validateCheckoutCart(cart)

  let paymentCollectionId = cart.payment_collection?.id

  if (!paymentCollectionId) {
    const collection = await storeFetch<PaymentCollectionResponse>(
      '/store/payment-collections',
      {
        method: 'POST',
        body: JSON.stringify({ cart_id: cart.id }),
      },
    )
    paymentCollectionId = collection.payment_collection?.id
  }

  if (!paymentCollectionId) {
    throw new Error('Medusa could not create the payment collection. Please try again.')
  }

  const response = await storeFetch<PaymentCollectionResponse>(
    `/store/payment-collections/${paymentCollectionId}/payment-sessions`,
    {
      method: 'POST',
      body: JSON.stringify({ provider_id: STRIPE_PROVIDER_ID }),
    },
  )
  const clientSecret = getClientSecret(response.payment_collection?.payment_sessions)

  if (!clientSecret) {
    throw new Error('Stripe could not initialise a secure payment session. Please try again.')
  }

  return clientSecret
}

export const getStripePaymentSessionClientSecret = async (cartId: string) => {
  const cart = await getCheckoutCart(cartId)
  const clientSecret = getClientSecret(cart.payment_collection?.payment_sessions)

  if (!clientSecret) {
    throw new Error('The secure payment session is no longer available. Return to checkout and try again.')
  }

  return clientSecret
}

export const completeStripeCart = async (cartId: string) => {
  const response = await fetch('/api/checkout/complete', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ cartId }),
  })
  const result = (await response.json()) as {
    type?: 'order' | 'cart'
    order?: { id?: string | null } | null
    message?: string
  }

  if (!response.ok || result.type !== 'order' || !result.order?.id) {
    throw new Error(
      result.message ||
        'Your payment succeeded, but Clef could not create the order. Please contact support before trying again.',
    )
  }

  // Only remove the active cart once Medusa has created an order.
  clearStoredCartId()

  return result.order.id
}
