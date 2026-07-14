import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React from 'react'
import { completeStripeCart } from '../../lib/medusa-checkout'
import { stripePromise } from '../../lib/stripe'

type StripePaymentSectionProps = {
  cartId: string
  clientSecret: string
  onOrderCreated: (orderId: string) => void
}

const getStripeErrorMessage = (error: { code?: string; decline_code?: string; message?: string }) => {
  if (error.code === 'card_declined' || error.decline_code) {
    return 'Your card was declined. Please try a different test payment method.'
  }

  if (error.code === 'payment_intent_authentication_failure') {
    return 'Authentication was not completed. Please try again.'
  }

  if (error.code === 'payment_intent_unexpected_state') {
    return 'This payment was cancelled or has already been processed. Please return to checkout.'
  }

  return error.message ?? 'Stripe could not confirm your payment. Please check the form and try again.'
}

const StripePaymentForm: React.FC<StripePaymentSectionProps> = ({
  cartId,
  clientSecret,
  onOrderCreated,
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = React.useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const isSubmittingRef = React.useRef(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!stripe || !elements || isSubmitting || isSubmittingRef.current) {
      return
    }

    setError(null)
    isSubmittingRef.current = true
    setIsSubmitting(true)

    try {
      const submitResult = await elements.submit()

      if (submitResult.error) {
        setError(getStripeErrorMessage(submitResult.error))
        return
      }

      const result = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment/return`,
        },
        redirect: 'if_required',
      })

      if (result.error) {
        setError(getStripeErrorMessage(result.error))
        return
      }

      if (
        result.paymentIntent?.status !== 'succeeded' &&
        result.paymentIntent?.status !== 'requires_capture'
      ) {
        setError('Additional payment authentication is required. Please follow the Stripe prompt and try again.')
        return
      }

      const orderId = await completeStripeCart(cartId)
      onOrderCreated(orderId)
    } catch (paymentError) {
      setError(
        paymentError instanceof Error
          ? paymentError.message
          : 'Your payment could not be completed. Your cart has been kept so you can try again.',
      )
    } finally {
      isSubmittingRef.current = false
      setIsSubmitting(false)
    }
  }

  return (
    <form className="rounded-xl bg-white p-6 md:p-8" onSubmit={handleSubmit}>
      <h2 className="mb-3 font-heading text-2xl font-semibold text-rhino-700">Secure payment</h2>
      <p className="mb-6 text-sm text-rhino-400">
        Card details are securely collected by Stripe and never stored by Clef.
      </p>
      <PaymentElement options={{ layout: 'tabs' }} />
      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      <button
        className="mt-6 w-full rounded-sm bg-purple-500 px-4 py-3 text-sm font-medium text-white hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-60 clef-button-primary"
        disabled={!stripe || !elements || isSubmitting}
        type="submit"
      >
        {isSubmitting ? 'Processing secure payment...' : 'Pay securely'}
      </button>
    </form>
  )
}

export const StripePaymentSection: React.FC<StripePaymentSectionProps> = (props) => (
  <Elements
    options={{
      clientSecret: props.clientSecret,
      appearance: { theme: 'stripe' },
    }}
    stripe={stripePromise}
  >
    <StripePaymentForm {...props} />
  </Elements>
)
