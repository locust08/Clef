import React, { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import FavouriteSectionCustomComponents2 from '../components/custom-components/FavouriteSectionCustomComponents2';
import FavouriteSectionProductList1 from '../components/product-list/FavouriteSectionProductList1';
import FavouriteSectionFooters3 from '../components/footers/FavouriteSectionFooters3';

const Favourite: React.FC = () => {
  useEffect(() => {
    // Load custom component scripts after React components are mounted
    const script1 = document.createElement('script');
    script1.src =
      '/js/1298133.js?v=1782961835';
    script1.async = true;
    document.head.appendChild(script1);
  }, []);

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
      <FavouriteSectionCustomComponents2 />
      <FavouriteSectionProductList1 />
      <FavouriteSectionFooters3 />
    </>
  );
};

export default Favourite;

