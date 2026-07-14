import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import type { GetServerSideProps } from 'next';
import HistorySectionCustomComponents3 from '../../../components/custom-components/HistorySectionCustomComponents3';
import HistorySectionCustomComponents2 from '../../../components/custom-components/HistorySectionCustomComponents2';
import { formatMyr } from '../../../lib/medusa-store';
import { getServerCustomer } from '../../../lib/medusa/server-auth';
import { getOrderPaymentStatus, retrieveOrderServer, validateOrderId, type MedusaOrder } from '../../../lib/medusa/orders';

type Props = { order: MedusaOrder | null; state: 'confirmed' | 'not-found' | 'unauthorised' };

const OrderDetail: React.FC<Props> = ({ order, state }) => (
  <>
    <Head>
      <title>Order Detail | CLEF</title>
      <link rel="icon" type="image/png" sizes="32x32" href="/shuffle-for-tailwind.png" />
    </Head>
    <HistorySectionCustomComponents3 />
    <section className="container mx-auto px-4 py-12">
      <div className="rounded-xl border border-coolGray-200 bg-white p-8">
        <p className="text-sm font-medium uppercase tracking-widest text-purple-500 mb-2">Order detail</p>
        <h1 className="font-heading text-3xl font-semibold text-rhino-700 mb-4">{order ? `Order #${order.display_id ?? order.id}` : state === 'unauthorised' ? 'Order access is not authorised' : 'Order not found'}</h1>
        {order ? <><div className="mb-6 flex flex-wrap gap-5 text-sm text-rhino-500"><span>Total: {formatMyr(order.total ?? 0)}</span><span>Payment: {getOrderPaymentStatus(order)}</span><span>Fulfilment: {order.fulfillment_status ?? 'not fulfilled'}</span></div><div className="mb-6 space-y-3">{(order.items ?? []).map((item) => <div className="flex justify-between border-b border-coolGray-100 pb-3" key={item.id}><span>{item.title ?? 'Product'} × {item.quantity ?? 0}</span><span>{formatMyr(item.total ?? 0)}</span></div>)}</div></> : <p className="text-rhino-400 mb-6">Log in with the purchasing account and try again.</p>}
        <Link className="inline-block rounded-sm bg-purple-500 px-4 py-3 text-sm font-medium text-white clef-button-primary" href="/account/history">
          Back to order history
        </Link>
      </div>
    </section>
    <HistorySectionCustomComponents2 />
  </>
);

export default OrderDetail;

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  context.res.setHeader('Cache-Control', 'private, no-store, max-age=0');
  const orderId = Array.isArray(context.params?.id) ? context.params?.id[0] : context.params?.id;

  if (!orderId || !validateOrderId(orderId)) {
    return { props: { order: null, state: 'not-found' } };
  }

  try {
    const customer = await getServerCustomer(context.req);
    const order = await retrieveOrderServer(orderId, { ...customer, guestOrderId: null });
    return { props: { order, state: 'confirmed' } };
  } catch (error) {
    const status = error instanceof Error && 'status' in error ? Number(error.status) : 500;
    return { props: { order: null, state: status === 401 || status === 403 ? 'unauthorised' : 'not-found' } };
  }
};
