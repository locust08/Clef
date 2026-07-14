import { useStripe } from '@stripe/react-stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { useCart } from '../../context/MockCartContext'
import { buildSummaryUrl } from '../../lib/checkout/complete-order'
import {
  completeStripeCart,
  getStripePaymentSessionClientSecret,
} from '../../lib/medusa-checkout'
import { getStoredCartId } from '../../lib/medusa-store'
import { stripePromise } from '../../lib/stripe'

const PaymentReturnHandler: React.FC = () => {
  const router = useRouter()
  const stripe = useStripe()
  const { refreshCart } = useCart()
  const [message, setMessage] = React.useState('Verifying your secure payment...')
  const hasProcessed = React.useRef(false)

  React.useEffect(() => {
    if (!router.isReady || !stripe || hasProcessed.current) {
      return
    }

    const returnedClientSecret = router.query.payment_intent_client_secret

    if (typeof returnedClientSecret !== 'string' || !returnedClientSecret) {
      setMessage('We could not verify this payment return. Please return to checkout and try again.')
      return
    }

    const cartId = getStoredCartId()

    if (!cartId) {
      setMessage('Your checkout session is no longer available. Please return to your cart.')
      return
    }

    hasProcessed.current = true

    const verifyAndComplete = async () => {
      try {
        // Do not trust the redirect query alone: it must match the active
        // Medusa Stripe payment session before Stripe.js checks the intent.
        const medusaClientSecret = await getStripePaymentSessionClientSecret(cartId)

        if (medusaClientSecret !== returnedClientSecret) {
          throw new Error('This payment return does not match the active checkout session.')
        }

        const result = await stripe.retrievePaymentIntent(returnedClientSecret)

        if (result.error) {
          throw new Error('Stripe could not verify the payment. Please return to checkout and try again.')
        }

        if (
          result.paymentIntent?.status !== 'succeeded' &&
          result.paymentIntent?.status !== 'requires_capture'
        ) {
          throw new Error('Payment was not completed. Your cart has been kept so you can try again.')
        }

        const orderId = await completeStripeCart(cartId)
        await refreshCart()
        await router.replace(buildSummaryUrl(orderId))
      } catch (error) {
        setMessage(
          error instanceof Error
            ? error.message
            : 'Payment verification failed. Your cart has been kept so you can try again.',
        )
      }
    }

    void verifyAndComplete()
  }, [refreshCart, router, stripe])

  return (
    <main className="min-h-[60vh] bg-[#F7F1EA] py-20">
      <div className="container mx-auto max-w-xl px-4 text-center">
        <div className="rounded-xl bg-white p-8 text-rhino-600">{message}</div>
      </div>
    </main>
  )
}

const PaymentReturnPage: React.FC = () => (
  <>
    <Head><title>Verifying payment | Clef</title></Head>
    <Elements stripe={stripePromise}>
      <PaymentReturnHandler />
    </Elements>
  </>
)

export default PaymentReturnPage
