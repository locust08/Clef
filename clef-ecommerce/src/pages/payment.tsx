import React from 'react';
import Head from 'next/head';
import PaymentSectionCustomComponents3 from '../components/custom-components/PaymentSectionCustomComponents3';
import CheckoutPanel from '../components/checkout/CheckoutPanel';
import PaymentSectionCustomComponents2 from '../components/custom-components/PaymentSectionCustomComponents2';

const Payment: React.FC = () => {
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
      <PaymentSectionCustomComponents3 />
      <CheckoutPanel />
      <PaymentSectionCustomComponents2 />
    </>
  );
};

export default Payment;
