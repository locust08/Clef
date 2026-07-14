import Link from 'next/link';
import { formatMyr } from '../../lib/medusa-store';
import { getOrderPaymentStatus, type MedusaOrder } from '../../lib/medusa/orders';
import type { SummaryState } from '../../pages/summary';

type Props = {
  state: SummaryState;
  order: MedusaOrder | null;
  isLoggedIn: boolean;
};

const stateMessages: Record<Exclude<SummaryState, 'confirmed'>, { title: string; body: string }> = {
  invalid: {
    title: 'Invalid order reference',
    body: 'This confirmation link does not contain a valid Medusa order reference.',
  },
  'not-found': {
    title: 'Order not found',
    body: 'The order could not be found. Check the confirmation link or contact CLEF support.',
  },
  'temporarily-unavailable': {
    title: 'Order confirmation is temporarily unavailable',
    body: 'Your order details could not be loaded right now. Please refresh shortly.',
  },
  unauthorised: {
    title: 'Order access is not authorised',
    body: 'Log in with the purchasing account or use the original short-lived confirmation link.',
  },
};

const value = (input: unknown) => (typeof input === 'string' ? input : '');

const SummarySectionSummary1: React.FC<Props> = ({ state, order, isLoggedIn }) => {
  const message = state === 'confirmed' ? null : stateMessages[state];
  const shipping = order?.shipping_address;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl rounded-xl border border-coolGray-200 bg-white p-8 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-rhino-300">
            Order confirmation
          </p>
          <h1 className="mb-4 font-heading text-4xl font-semibold text-rhino-700">
            {order ? 'Order confirmed' : message?.title}
          </h1>
          {order ? (
            <div className="text-left">
              <div className="mb-6 grid gap-3 rounded-sm bg-coolGray-50 p-5 text-sm md:grid-cols-2">
                <p><span className="text-rhino-400">Order:</span> <strong>#{order.display_id ?? order.id}</strong></p>
                <p><span className="text-rhino-400">Date:</span> {order.created_at ? new Date(order.created_at).toLocaleString('en-MY') : 'Unavailable'}</p>
                <p><span className="text-rhino-400">Payment:</span> {getOrderPaymentStatus(order)}</p>
                <p><span className="text-rhino-400">Fulfilment:</span> {order.fulfillment_status ?? 'not fulfilled'}</p>
                <p className="md:col-span-2"><span className="text-rhino-400">Email:</span> {order.email ?? 'Unavailable'}</p>
              </div>
              <div className="mb-6 space-y-3">
                {(order.items ?? []).map((item) => (
                  <div className="flex items-center justify-between gap-4 border-b border-coolGray-100 pb-3" key={item.id}>
                    <div><p className="font-medium text-rhino-700">{item.title ?? item.variant?.product?.title ?? 'Product'}</p><p className="text-xs text-rhino-400">{item.variant?.title ?? item.subtitle ?? 'Default variant'} × {item.quantity ?? 0}</p></div>
                    <p className="font-medium text-rhino-700">{formatMyr(item.total ?? (item.unit_price ?? 0) * (item.quantity ?? 0))}</p>
                  </div>
                ))}
              </div>
              <div className="mb-6 ml-auto max-w-sm space-y-2 text-sm">
                <p className="flex justify-between"><span>Subtotal</span><span>{formatMyr(order.item_total ?? order.subtotal ?? 0)}</span></p>
                <p className="flex justify-between"><span>Shipping</span><span>{formatMyr(order.shipping_total ?? 0)}</span></p>
                <p className="flex justify-between"><span>Discount</span><span>{formatMyr(order.discount_total ?? 0)}</span></p>
                <p className="flex justify-between"><span>Tax</span><span>{formatMyr(order.tax_total ?? 0)}</span></p>
                <p className="flex justify-between border-t border-coolGray-200 pt-2 text-lg font-semibold"><span>Total</span><span>{formatMyr(order.total ?? 0)}</span></p>
              </div>
              {shipping ? <div className="mb-6 rounded-sm border border-coolGray-200 p-4 text-sm"><p className="mb-1 font-medium text-rhino-700">Shipping details</p><p className="text-rhino-500">{value(shipping.address_1)}, {value(shipping.city)}, {value(shipping.province)} {value(shipping.postal_code)}, {value(shipping.country_code).toUpperCase()}</p></div> : null}
            </div>
          ) : (
            <p className="mb-6 text-sm leading-7 text-rhino-400">{message?.body}</p>
          )}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              className="rounded-sm bg-purple-500 px-4 py-3 text-sm font-medium text-white transition duration-200 hover:bg-purple-600 clef-button-primary"
              href="/shop/skincare"
            >
              Go back to shop
            </Link>
            {isLoggedIn ? <Link
              className="rounded-sm border border-coolGray-200 px-4 py-3 text-sm font-medium text-rhino-700 transition duration-200 hover:bg-coolGray-100 clef-button-secondary"
              href="/account/history"
            >
              View order history
            </Link> : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SummarySectionSummary1;
