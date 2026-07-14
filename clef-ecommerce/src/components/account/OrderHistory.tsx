import Link from 'next/link';
import { formatMyr } from '../../lib/medusa-store';
import { getOrderPaymentStatus, type MedusaOrder } from '../../lib/medusa/orders';

type OrderHistoryProps = {
  authenticated: boolean;
  orders: MedusaOrder[];
  page: number;
  hasNextPage: boolean;
  error: string | null;
};

const OrderHistory: React.FC<OrderHistoryProps> = ({ authenticated, orders, page, hasNextPage, error }) => {
  if (!authenticated) {
    return <section className="container mx-auto px-4 py-12"><div className="rounded-xl border border-coolGray-200 bg-white p-8 text-center"><h1 className="mb-2 font-heading text-3xl font-semibold text-rhino-700">Log in to view order history</h1><p className="mb-6 text-rhino-400">Order history is available only to the authenticated purchasing account.</p><Link className="inline-block rounded-sm bg-purple-500 px-4 py-3 text-sm text-white clef-button-primary" href="/login?returnUrl=%2Faccount%2Fhistory">Log in</Link></div></section>;
  }

  if (error) {
    return <section className="container mx-auto px-4 py-12"><div className="rounded-xl border border-coolGray-200 bg-white p-8 text-center text-rhino-500">{error}</div></section>;
  }

  if (orders.length === 0) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="rounded-xl border border-coolGray-200 bg-white p-8 text-center">
          <h1 className="font-heading text-3xl font-semibold text-rhino-700 mb-2">No order history yet</h1>
          <p className="text-rhino-400">Orders will appear here after your first checkout.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="space-y-4">
      {orders.map((order) => (
        <div className="rounded-xl border border-coolGray-200 bg-white p-6" key={order.id}>
          <div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="font-semibold text-rhino-700">Order #{order.display_id ?? order.id}</h2><p className="text-sm text-rhino-400">{order.created_at ? new Date(order.created_at).toLocaleString('en-MY') : 'Date unavailable'}</p></div><Link className="text-sm font-medium text-purple-500" href={`/account/orders/${encodeURIComponent(order.id)}`}>View order</Link></div>
          <p className="mt-3 text-sm text-rhino-500">{(order.items ?? []).map((item) => `${item.title ?? 'Product'} × ${item.quantity ?? 0}`).join(', ')}</p>
          <div className="mt-4 flex flex-wrap gap-5 text-sm text-rhino-500"><span>Total: {formatMyr(order.total ?? 0)}</span><span>Payment: {getOrderPaymentStatus(order)}</span><span>Fulfilment: {order.fulfillment_status ?? 'not fulfilled'}</span></div>
        </div>
      ))}
      </div>
      <div className="mt-6 flex justify-between">{page > 1 ? <Link href={`/account/history?page=${page - 1}`}>Previous</Link> : <span />}{hasNextPage ? <Link href={`/account/history?page=${page + 1}`}>Next</Link> : null}</div>
    </section>
  );
};

export default OrderHistory;
