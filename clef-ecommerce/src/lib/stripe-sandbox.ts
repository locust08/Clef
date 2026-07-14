const STRIPE_SANDBOX_ERROR =
  'Stripe Sandbox required: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY must use a pk_test_ key.'

export const getStripeSandboxPublishableKey = () => {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim()

  // This is intentionally limited to Stripe test publishable keys. A live key
  // must fail before the storefront can render a payment form.
  if (!publishableKey?.startsWith('pk_test_')) {
    throw new Error(STRIPE_SANDBOX_ERROR)
  }

  return publishableKey
}
