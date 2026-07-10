import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import SearchSectionCustomComponents1 from '../components/custom-components/SearchSectionCustomComponents1';
import SearchSectionProductList2 from '../components/product-list/SearchSectionProductList2';

const Search: React.FC = () => {
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
      <SearchSectionCustomComponents1 />
      <SearchSectionProductList2 />
    </>
  );
};

export default Search;

