import Link from 'next/link';
import React from 'react';
import { useCart } from '../../context/MockCartContext';

type AddressForm = {
  email: string;
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  province: string;
  postalCode: string;
  countryCode: string;
  phone: string;
};

const CheckoutPanel: React.FC = () => {
  const { cart, cartError, isCartLoading, refreshCart } = useCart();
  const [form, setForm] = React.useState<AddressForm>({
    address1: '',
    city: '',
    countryCode: 'my',
    email: cart?.email ?? '',
    firstName: '',
    lastName: '',
    phone: '',
    postalCode: '',
    province: '',
  });
  const [message, setMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    void refreshCart();
  }, [refreshCart]);

  React.useEffect(() => {
    if (cart?.email && !form.email) {
      setForm((current) => ({ ...current, email: cart.email ?? '' }));
    }
  }, [cart?.email, form.email]);

  const updateField = (field: keyof AddressForm, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(
      'Checkout details are ready, but no payment provider is configured. Configure a Medusa payment provider such as Stripe before orders can be completed.',
    );
  };

  if (isCartLoading) {
    return (
      <section className="bg-[#F7F1EA] py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="rounded-xl bg-white p-8 text-center text-rhino-400">
            Loading checkout...
          </div>
        </div>
      </section>
    );
  }

  if (cartError) {
    return (
      <section className="bg-[#F7F1EA] py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="rounded-xl bg-white p-8 text-center">
            <h1 className="mb-2 font-heading text-3xl font-semibold text-rhino-700">
              Checkout is unavailable
            </h1>
            <p className="text-rhino-400">{cartError}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <section className="bg-[#F7F1EA] py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="rounded-xl bg-white p-8 text-center">
            <h1 className="mb-2 font-heading text-3xl font-semibold text-rhino-700">
              Your cart is empty
            </h1>
            <p className="mb-6 text-rhino-400">
              Add a product before opening checkout.
            </p>
            <Link
              className="inline-block rounded-sm bg-purple-500 px-4 py-3 text-sm text-white hover:bg-purple-600 clef-button-primary"
              href="/shop/skincare"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F7F1EA] py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <form className="rounded-xl bg-white p-6 md:p-8" onSubmit={handleSubmit}>
            <h1 className="mb-8 font-heading text-3xl font-semibold text-rhino-700">
              Checkout
            </h1>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="md:col-span-2">
                <span className="mb-1 block text-sm font-medium text-rhino-600">Email</span>
                <input
                  className="w-full rounded-sm border border-coolGray-200 px-4 py-3 outline-none focus:ring-1 ring-indigo-400"
                  onChange={(event) => updateField('email', event.target.value)}
                  required
                  type="email"
                  value={form.email}
                />
              </label>
              <label>
                <span className="mb-1 block text-sm font-medium text-rhino-600">First name</span>
                <input
                  className="w-full rounded-sm border border-coolGray-200 px-4 py-3 outline-none focus:ring-1 ring-indigo-400"
                  onChange={(event) => updateField('firstName', event.target.value)}
                  required
                  type="text"
                  value={form.firstName}
                />
              </label>
              <label>
                <span className="mb-1 block text-sm font-medium text-rhino-600">Last name</span>
                <input
                  className="w-full rounded-sm border border-coolGray-200 px-4 py-3 outline-none focus:ring-1 ring-indigo-400"
                  onChange={(event) => updateField('lastName', event.target.value)}
                  required
                  type="text"
                  value={form.lastName}
                />
              </label>
              <label className="md:col-span-2">
                <span className="mb-1 block text-sm font-medium text-rhino-600">Address</span>
                <input
                  className="w-full rounded-sm border border-coolGray-200 px-4 py-3 outline-none focus:ring-1 ring-indigo-400"
                  onChange={(event) => updateField('address1', event.target.value)}
                  required
                  type="text"
                  value={form.address1}
                />
              </label>
              <label>
                <span className="mb-1 block text-sm font-medium text-rhino-600">City</span>
                <input
                  className="w-full rounded-sm border border-coolGray-200 px-4 py-3 outline-none focus:ring-1 ring-indigo-400"
                  onChange={(event) => updateField('city', event.target.value)}
                  required
                  type="text"
                  value={form.city}
                />
              </label>
              <label>
                <span className="mb-1 block text-sm font-medium text-rhino-600">State</span>
                <input
                  className="w-full rounded-sm border border-coolGray-200 px-4 py-3 outline-none focus:ring-1 ring-indigo-400"
                  onChange={(event) => updateField('province', event.target.value)}
                  required
                  type="text"
                  value={form.province}
                />
              </label>
              <label>
                <span className="mb-1 block text-sm font-medium text-rhino-600">Postcode</span>
                <input
                  className="w-full rounded-sm border border-coolGray-200 px-4 py-3 outline-none focus:ring-1 ring-indigo-400"
                  onChange={(event) => updateField('postalCode', event.target.value)}
                  required
                  type="text"
                  value={form.postalCode}
                />
              </label>
              <label>
                <span className="mb-1 block text-sm font-medium text-rhino-600">Phone</span>
                <input
                  className="w-full rounded-sm border border-coolGray-200 px-4 py-3 outline-none focus:ring-1 ring-indigo-400"
                  onChange={(event) => updateField('phone', event.target.value)}
                  required
                  type="tel"
                  value={form.phone}
                />
              </label>
            </div>
            <div className="mt-8 rounded-sm border border-amber-200 bg-amber-50 p-4 text-sm text-rhino-600">
              Shipping method and secure payment initialization require an enabled
              Medusa payment provider. No order will be completed from this page
              until that configuration exists.
            </div>
            {message && <p className="mt-4 text-sm text-rhino-500">{message}</p>}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                className="rounded-sm border border-coolGray-200 px-4 py-3 text-sm text-rhino-700 hover:bg-coolGray-100 clef-button-secondary"
                href="/products"
              >
                Back to products
              </Link>
              <button
                className="rounded-sm bg-purple-500 px-4 py-3 text-sm font-medium text-white hover:bg-purple-600 clef-button-primary"
                type="submit"
              >
                Continue to secure payment
              </button>
            </div>
          </form>

          <aside className="rounded-xl bg-white p-6 md:p-8">
            <h2 className="mb-6 font-heading text-2xl font-semibold text-rhino-700">
              Cart summary
            </h2>
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div className="flex gap-4 border-b border-coolGray-200 pb-4" key={item.id}>
                  <div className="h-16 w-16 flex-none overflow-hidden rounded-lg bg-rose-50 p-2">
                    {item.image && (
                      <img className="h-full w-full object-contain" src={item.image} alt={item.title} />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-rhino-700">{item.title}</p>
                    <p className="text-xs text-rhino-400">
                      {item.variantTitle} x {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-rhino-700">{item.lineTotalDisplay}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-rhino-400">Subtotal</span>
                <span className="text-rhino-800">{cart.subtotalDisplay}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-rhino-400">Shipping</span>
                <span className="text-rhino-800">{cart.shippingTotalDisplay}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-rhino-400">Discount</span>
                <span className="text-rhino-800">{cart.discountTotalDisplay}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-rhino-400">Tax</span>
                <span className="text-rhino-800">{cart.taxTotalDisplay}</span>
              </div>
              <div className="flex justify-between border-t border-coolGray-200 pt-4 text-lg font-semibold">
                <span className="text-rhino-800">Total</span>
                <span className="text-rhino-800">{cart.totalDisplay}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPanel;
