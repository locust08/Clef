import React from 'react';
import Head from 'next/head';
import HistorySectionCustomComponents3 from '../../components/custom-components/HistorySectionCustomComponents3';
import OrderHistory from '../../components/account/OrderHistory';
import HistorySectionCustomComponents2 from '../../components/custom-components/HistorySectionCustomComponents2';

const History: React.FC = () => (
  <>
    <Head>
      <title>Order History | CLEF</title>
      <link rel="icon" type="image/png" sizes="32x32" href="/shuffle-for-tailwind.png" />
    </Head>
    <HistorySectionCustomComponents3 />
    <OrderHistory />
    <HistorySectionCustomComponents2 />
  </>
);

export default History;
