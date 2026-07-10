import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import _404SectionSignIn1 from '../components/sign-in/_404SectionSignIn1';

const _404: React.FC = () => {
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
      <_404SectionSignIn1 />
    </>
  );
};

export default _404;

