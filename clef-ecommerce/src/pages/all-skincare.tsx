import React from 'react';
import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import AllSkincareSectionCustomComponents3 from '../components/custom-components/AllSkincareSectionCustomComponents3';
import AllSkincareSectionNavigations2 from '../components/navigations/AllSkincareSectionNavigations2';
import AllSkincareSectionHeaders1 from '../components/headers/AllSkincareSectionHeaders1';
import AllSkincareSection__elements7 from '../components/__elements/AllSkincareSection__elements7';
import AllSkincareSectionBanners6 from '../components/banners/AllSkincareSectionBanners6';
import AllSkincareSectionCustomComponents5 from '../components/custom-components/AllSkincareSectionCustomComponents5';
import ProductGrid from '../components/product/ProductGrid';
import {
  getCategoryProductsProps,
  type CategoryPageProductsProps,
} from '../lib/category-page';

const AllSkincare: React.FC<CategoryPageProductsProps> = ({
  products,
  headerProducts = [],
  medusaError,
}) => {
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
      <AllSkincareSectionCustomComponents3 />
      <AllSkincareSectionNavigations2 />
      <AllSkincareSectionHeaders1 products={headerProducts} />
      <AllSkincareSection__elements7 />
      <section className="py-12 md:py-24 lg:py-32 bg-[#F7F1EA]">
        <div className="container px-4 mx-auto">
          <h2 className="text-4xl text-center font-heading font-semibold text-rhino-600 tracking-xs mb-14">Our products</h2>
          {medusaError ? (
            <div className="rounded-xl border border-red-100 bg-white p-8 text-center">
              <h2 className="font-heading text-2xl font-semibold text-rhino-700 mb-2">Unable to load products.</h2>
              <p className="text-rhino-400 text-sm">{medusaError}</p>
            </div>
          ) : (
            <ProductGrid products={products} emptyMessage="No products found." />
          )}
        </div>
      </section>
      <AllSkincareSectionBanners6 />
      <AllSkincareSectionCustomComponents5 />
    </>
  );
};

export default AllSkincare;

export const getServerSideProps: GetServerSideProps<CategoryPageProductsProps> = async (
  context,
) => getCategoryProductsProps('skincare', context);
