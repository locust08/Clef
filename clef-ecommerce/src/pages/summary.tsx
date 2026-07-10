import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import SummarySectionCustomComponents3 from '../components/custom-components/SummarySectionCustomComponents3';
import SummarySectionSummary1 from '../components/summary/SummarySectionSummary1';
import SummarySectionCustomComponents2 from '../components/custom-components/SummarySectionCustomComponents2';

const Summary: React.FC = () => {
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
      <SummarySectionSummary1 />
      <SummarySectionCustomComponents2 />
    </>
  );
};

export default Summary;

