import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import PaymentSectionCustomComponents3 from '../components/custom-components/PaymentSectionCustomComponents3';
import PaymentSectionCheckout1 from '../components/checkout/PaymentSectionCheckout1';
import PaymentSectionOrderSuccess4 from '../components/order-success/PaymentSectionOrderSuccess4';
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
      <PaymentSectionCheckout1 />
      <PaymentSectionOrderSuccess4 />
      <PaymentSectionCustomComponents2 />
    </>
  );
};

export default Payment;

