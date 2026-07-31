import { loadStripe } from '@stripe/stripe-js'
import { getStripeSandboxPublishableKey } from './stripe-sandbox'

// Keep this outside React rendering so Stripe.js is loaded exactly once.
export const stripePromise = loadStripe(getStripeSandboxPublishableKey())
