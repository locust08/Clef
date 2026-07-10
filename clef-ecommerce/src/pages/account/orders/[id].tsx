import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import HistorySectionCustomComponents3 from '../../../components/custom-components/HistorySectionCustomComponents3';
import HistorySectionCustomComponents2 from '../../../components/custom-components/HistorySectionCustomComponents2';

const OrderDetail: React.FC = () => (
  <>
    <Head>
      <title>Order Detail | CLEF</title>
      <link rel="icon" type="image/png" sizes="32x32" href="/shuffle-for-tailwind.png" />
    </Head>
    <HistorySectionCustomComponents3 />
    <section className="container mx-auto px-4 py-12">
      <div className="rounded-xl border border-coolGray-200 bg-white p-8">
        <p className="text-sm font-medium uppercase tracking-widest text-purple-500 mb-2">Sample order</p>
        <h1 className="font-heading text-3xl font-semibold text-rhino-700 mb-4">Order sample-order</h1>
        <p className="text-rhino-400 mb-6">This mock order route is ready for Medusa order data later.</p>
        <Link className="inline-block rounded-sm bg-purple-500 px-4 py-3 text-sm font-medium text-white clef-button-primary" href="/account/history">
          Back to order history
        </Link>
      </div>
    </section>
    <HistorySectionCustomComponents2 />
  </>
);

export default OrderDetail;
