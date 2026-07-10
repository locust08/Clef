import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import HistorySectionCustomComponents3 from '../components/custom-components/HistorySectionCustomComponents3';
import HistorySectionOrderHistory1 from '../components/order-history/HistorySectionOrderHistory1';
import HistorySectionCustomComponents2 from '../components/custom-components/HistorySectionCustomComponents2';

const History: React.FC = () => {
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
      <HistorySectionCustomComponents3 />
      <HistorySectionOrderHistory1 />
      <HistorySectionCustomComponents2 />
    </>
  );
};

export default History;

