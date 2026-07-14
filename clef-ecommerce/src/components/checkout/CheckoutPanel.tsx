import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useCart } from '../../context/MockCartContext'
import { buildSummaryUrl } from '../../lib/checkout/complete-order'
import {
  type CheckoutAddress,
  type ShippingOption,
  initialiseStripePayment,
  listShippingOptions,
  saveCheckoutDetails,
} from '../../lib/medusa-checkout'
import { StripePaymentSection } from './StripePaymentSection'

const formatShippingAmount = (amount?: number | null) =>
  typeof amount === 'number' ? `RM ${amount.toFixed(2)}` : 'Calculated at checkout'

const CheckoutPanel: React.FC = () => {
  const router = useRouter()
  const { cart, cartError, isCartLoading, refreshCart } = useCart()
  const [form, setForm] = React.useState<CheckoutAddress>({
    address1: '',
    city: '',
    countryCode: 'my',
    email: cart?.email ?? '',
    firstName: '',
    lastName: '',
    phone: '',
    postalCode: '',
    province: '',
  })
  const [message, setMessage] = React.useState<string | null>(null)
  const [shippingOptions, setShippingOptions] = React.useState<ShippingOption[] | null>(null)
  const [selectedShippingOptionId, setSelectedShippingOptionId] = React.useState('')
  const [clientSecret, setClientSecret] = React.useState<string | null>(null)
  const [isPreparing, setIsPreparing] = React.useState(false)
  const isPreparingRef = React.useRef(false)

  React.useEffect(() => {
    void refreshCart()
  }, [refreshCart])

  React.useEffect(() => {
    if (cart?.email && !form.email) {
      setForm((current) => ({ ...current, email: cart.email ?? '' }))
    }
  }, [cart?.email, form.email])

  const updateField = (field: keyof CheckoutAddress, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const saveDetails = async () => {
    if (!cart) {
      throw new Error('Your cart is no longer available. Please add your items again.')
    }

    await saveCheckoutDetails(cart.id, form)
    const options = await listShippingOptions(cart.id)

    if (!options.length) {
      throw new Error('No shipping methods are available for this address. Please review it and try again.')
    }

    setShippingOptions(options)
    setSelectedShippingOptionId((current) => current || options[0].id)
    setMessage('Choose a shipping method, then continue to secure payment.')
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!cart || isPreparing || isPreparingRef.current) {
      return
    }

    setMessage(null)
    isPreparingRef.current = true
    setIsPreparing(true)

    try {
      if (!shippingOptions) {
        await saveDetails()
        return
      }

      if (!selectedShippingOptionId) {
        throw new Error('Choose a shipping method before continuing to payment.')
      }

      const secret = await initialiseStripePayment({
        cartId: cart.id,
        shippingOptionId: selectedShippingOptionId,
      })
      setClientSecret(secret)
    } catch (checkoutError) {
      setMessage(
        checkoutError instanceof Error
          ? checkoutError.message
          : 'Checkout could not be prepared. Please try again.',
      )
    } finally {
      isPreparingRef.current = false
      setIsPreparing(false)
    }
  }

  if (isCartLoading) {
    return (
      <section className="bg-[#F7F1EA] py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="rounded-xl bg-white p-8 text-center text-rhino-400">Loading checkout...</div>
        </div>
      </section>
    )
  }

  if (cartError) {
    return (
      <section className="bg-[#F7F1EA] py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="rounded-xl bg-white p-8 text-center">
            <h1 className="mb-2 font-heading text-3xl font-semibold text-rhino-700">Checkout is unavailable</h1>
            <p className="text-rhino-400">{cartError}</p>
          </div>
        </div>
      </section>
    )
  }

  if (!cart || cart.items.length === 0) {
    return (
      <section className="bg-[#F7F1EA] py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="rounded-xl bg-white p-8 text-center">
            <h1 className="mb-2 font-heading text-3xl font-semibold text-rhino-700">Your cart is empty</h1>
            <p className="mb-6 text-rhino-400">Add a product before opening checkout.</p>
            <Link className="inline-block rounded-sm bg-purple-500 px-4 py-3 text-sm text-white hover:bg-purple-600 clef-button-primary" href="/shop/skincare">
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-[#F7F1EA] py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          {clientSecret ? (
            <StripePaymentSection
              cartId={cart.id}
              clientSecret={clientSecret}
              onOrderCreated={(orderId) => {
                void (async () => {
                  await refreshCart()
                  await router.push(buildSummaryUrl(orderId))
                })()
              }}
            />
          ) : (
            <form className="rounded-xl bg-white p-6 md:p-8" onSubmit={handleSubmit}>
              <h1 className="mb-8 font-heading text-3xl font-semibold text-rhino-700">Checkout</h1>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="md:col-span-2">
                  <span className="mb-1 block text-sm font-medium text-rhino-600">Email</span>
                  <input className="w-full rounded-sm border border-coolGray-200 px-4 py-3 outline-none focus:ring-1 ring-indigo-400" onChange={(event) => updateField('email', event.target.value)} required type="email" value={form.email} />
                </label>
                <label><span className="mb-1 block text-sm font-medium text-rhino-600">First name</span><input className="w-full rounded-sm border border-coolGray-200 px-4 py-3 outline-none focus:ring-1 ring-indigo-400" onChange={(event) => updateField('firstName', event.target.value)} required type="text" value={form.firstName} /></label>
                <label><span className="mb-1 block text-sm font-medium text-rhino-600">Last name</span><input className="w-full rounded-sm border border-coolGray-200 px-4 py-3 outline-none focus:ring-1 ring-indigo-400" onChange={(event) => updateField('lastName', event.target.value)} required type="text" value={form.lastName} /></label>
                <label className="md:col-span-2"><span className="mb-1 block text-sm font-medium text-rhino-600">Address</span><input className="w-full rounded-sm border border-coolGray-200 px-4 py-3 outline-none focus:ring-1 ring-indigo-400" onChange={(event) => updateField('address1', event.target.value)} required type="text" value={form.address1} /></label>
                <label><span className="mb-1 block text-sm font-medium text-rhino-600">City</span><input className="w-full rounded-sm border border-coolGray-200 px-4 py-3 outline-none focus:ring-1 ring-indigo-400" onChange={(event) => updateField('city', event.target.value)} required type="text" value={form.city} /></label>
                <label><span className="mb-1 block text-sm font-medium text-rhino-600">State</span><input className="w-full rounded-sm border border-coolGray-200 px-4 py-3 outline-none focus:ring-1 ring-indigo-400" onChange={(event) => updateField('province', event.target.value)} required type="text" value={form.province} /></label>
                <label><span className="mb-1 block text-sm font-medium text-rhino-600">Postcode</span><input className="w-full rounded-sm border border-coolGray-200 px-4 py-3 outline-none focus:ring-1 ring-indigo-400" onChange={(event) => updateField('postalCode', event.target.value)} required type="text" value={form.postalCode} /></label>
                <label><span className="mb-1 block text-sm font-medium text-rhino-600">Phone</span><input className="w-full rounded-sm border border-coolGray-200 px-4 py-3 outline-none focus:ring-1 ring-indigo-400" onChange={(event) => updateField('phone', event.target.value)} required type="tel" value={form.phone} /></label>
              </div>
              <p className="mt-4 text-sm text-rhino-400">Billing address will use the shipping address for this order.</p>

              {shippingOptions ? (
                <fieldset className="mt-8 rounded-sm border border-coolGray-200 p-4">
                  <legend className="px-2 text-sm font-medium text-rhino-700">Shipping method</legend>
                  <div className="space-y-3">
                    {shippingOptions.map((option) => (
                      <label className="flex cursor-pointer items-center justify-between gap-4 rounded-sm border border-coolGray-200 p-3" key={option.id}>
                        <span className="flex items-center gap-3"><input checked={selectedShippingOptionId === option.id} name="shipping-option" onChange={() => setSelectedShippingOptionId(option.id)} required type="radio" value={option.id} /><span className="text-sm font-medium text-rhino-700">{option.name}</span></span>
                        <span className="text-sm text-rhino-500">{formatShippingAmount(option.amount)}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ) : null}

              {message ? <p className="mt-4 text-sm text-rhino-500">{message}</p> : null}
              <div className="mt-8 flex flex-wrap gap-4">
                <Link className="rounded-sm border border-coolGray-200 px-4 py-3 text-sm text-rhino-700 hover:bg-coolGray-100 clef-button-secondary" href="/products">Back to products</Link>
                <button className="rounded-sm bg-purple-500 px-4 py-3 text-sm font-medium text-white hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-60 clef-button-primary" disabled={isPreparing} type="submit">
                  {isPreparing ? 'Preparing checkout...' : shippingOptions ? 'Continue to secure payment' : 'Continue to checkout'}
                </button>
              </div>
            </form>
          )}

          <aside className="rounded-xl bg-white p-6 md:p-8">
            <h2 className="mb-6 font-heading text-2xl font-semibold text-rhino-700">Cart summary</h2>
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div className="flex gap-4 border-b border-coolGray-200 pb-4" key={item.id}>
                  <div className="h-16 w-16 flex-none overflow-hidden rounded-lg bg-rose-50 p-2">{item.image ? <img className="h-full w-full object-contain" src={item.image} alt={item.title} /> : null}</div>
                  <div className="min-w-0 flex-1"><p className="text-sm font-medium text-rhino-700">{item.title}</p><p className="text-xs text-rhino-400">{item.variantTitle} x {item.quantity}</p></div>
                  <p className="text-sm font-medium text-rhino-700">{item.lineTotalDisplay}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-rhino-400">Subtotal</span><span className="text-rhino-800">{cart.subtotalDisplay}</span></div>
              <div className="flex justify-between"><span className="text-rhino-400">Shipping</span><span className="text-rhino-800">{cart.shippingTotalDisplay}</span></div>
              <div className="flex justify-between"><span className="text-rhino-400">Discount</span><span className="text-rhino-800">{cart.discountTotalDisplay}</span></div>
              <div className="flex justify-between"><span className="text-rhino-400">Tax</span><span className="text-rhino-800">{cart.taxTotalDisplay}</span></div>
              <div className="flex justify-between border-t border-coolGray-200 pt-4 text-lg font-semibold"><span className="text-rhino-800">Total</span><span className="text-rhino-800">{cart.totalDisplay}</span></div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default CheckoutPanel
