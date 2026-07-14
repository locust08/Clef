import React from 'react';
import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import HistorySectionCustomComponents3 from '../../components/custom-components/HistorySectionCustomComponents3';
import OrderHistory from '../../components/account/OrderHistory';
import HistorySectionCustomComponents2 from '../../components/custom-components/HistorySectionCustomComponents2';
import { getOrderHistoryPageProps, type OrderHistoryPageProps } from '../../lib/medusa/history-page';

const History: React.FC<OrderHistoryPageProps> = (props) => (
  <>
    <Head>
      <title>Order History | CLEF</title>
      <link rel="icon" type="image/png" sizes="32x32" href="/shuffle-for-tailwind.png" />
    </Head>
    <HistorySectionCustomComponents3 />
    <OrderHistory {...props} />
    <HistorySectionCustomComponents2 />
  </>
);

export default History;

export const getServerSideProps: GetServerSideProps<OrderHistoryPageProps> = async (context) => ({
  props: await getOrderHistoryPageProps(context),
});
