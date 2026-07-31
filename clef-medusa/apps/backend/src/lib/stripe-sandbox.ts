const STRIPE_SANDBOX_ERROR =
  'Stripe Sandbox required: STRIPE_SECRET_KEY must use an sk_test_ key.'

export const getStripeSandboxConfig = () => {
  const apiKey = process.env.STRIPE_SECRET_KEY?.trim()

  // Deliberately accept only test-mode secret keys. This prevents a backend
  // process from starting with a live or restricted Stripe key by mistake.
  if (!apiKey?.startsWith('sk_test_')) {
    throw new Error(STRIPE_SANDBOX_ERROR)
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim()

  if (!webhookSecret?.startsWith('whsec_')) {
    throw new Error(
      'Stripe Sandbox required: STRIPE_WEBHOOK_SECRET must use a whsec_ key.',
    )
  }

  const stripeMode = process.env.STRIPE_MODE?.trim()

  if (stripeMode && stripeMode !== 'sandbox') {
    throw new Error('Stripe Sandbox required: STRIPE_MODE must be sandbox.')
  }

  return { apiKey, webhookSecret }
}
