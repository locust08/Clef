import type { GetServerSideProps } from 'next';
import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import SummarySectionCustomComponents3 from '../components/custom-components/SummarySectionCustomComponents3';
import SummarySectionSummary1 from '../components/summary/SummarySectionSummary1';
import SummarySectionCustomComponents2 from '../components/custom-components/SummarySectionCustomComponents2';
import {
  getAuthorisedGuestOrderId,
  getServerCustomer,
} from '../lib/medusa/server-auth';
import {
  OrderAccessError,
  retrieveOrderServer,
  validateOrderId,
  type MedusaOrder,
} from '../lib/medusa/orders';

export type SummaryState =
  | 'confirmed'
  | 'invalid'
  | 'not-found'
  | 'temporarily-unavailable'
  | 'unauthorised';

export type SummaryPageProps = {
  state: SummaryState;
  order: MedusaOrder | null;
  isLoggedIn: boolean;
};

const Summary: React.FC<SummaryPageProps> = ({ state, order, isLoggedIn }) => {
  return (
    <>
      <Head>
        <title></title>
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/shuffle-for-tailwind.png'
        />
      </Head>
      <SummarySectionCustomComponents3 />
      <SummarySectionSummary1 isLoggedIn={isLoggedIn} order={order} state={state} />
      <SummarySectionCustomComponents2 />
    </>
  );
};

export default Summary;

export const getServerSideProps: GetServerSideProps<SummaryPageProps> = async (context) => {
  context.res.setHeader('Cache-Control', 'private, no-store, max-age=0');
  const orderId = Array.isArray(context.query.order_id)
    ? context.query.order_id[0]
    : context.query.order_id;

  if (!orderId || !validateOrderId(orderId)) {
    return { props: { state: 'invalid', order: null, isLoggedIn: false } };
  }

  try {
    const customer = await getServerCustomer(context.req);
    const guestOrderId = getAuthorisedGuestOrderId(context.req);
    const isLoggedIn = Boolean(customer.authToken && customer.customerId);
    const order = await retrieveOrderServer(
      orderId,
      { ...customer, guestOrderId },
      fetch,
      5,
    );

    return { props: { state: 'confirmed', order, isLoggedIn } };
  } catch (error) {
    const status = error instanceof OrderAccessError ? error.status : 500;
    console.error(`[orders] summary lookup failed status=${status}`);

    return {
      props: {
        state:
          status === 400
            ? 'invalid'
            : status === 401 || status === 403
              ? 'unauthorised'
              : status === 404
                ? 'not-found'
                : 'temporarily-unavailable',
        order: null,
        isLoggedIn: false,
      },
    };
  }
};
