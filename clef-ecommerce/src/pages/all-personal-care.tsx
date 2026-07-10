import React from 'react';
import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import AllSkincareSectionCustomComponents3 from '../components/custom-components/AllSkincareSectionCustomComponents3';
import AllSkincareSectionNavigations2 from '../components/navigations/AllSkincareSectionNavigations2';
import AllSkincareSectionHeaders1 from '../components/headers/AllSkincareSectionHeaders1';
import AllPersonalCareSectionBanners6 from '../components/banners/AllPersonalCareSectionBanners6';
import ProductGrid from '../components/product/ProductGrid';
import Footer from '../components/layout/Footer';
import {
  getCategoryProductsProps,
  type CategoryPageProductsProps,
} from '../lib/category-page';

const AllPersonalCare: React.FC<CategoryPageProductsProps> = ({
  products,
  headerProducts = [],
  medusaError,
}) => {
  return (
    <>
      <Head>
        <title>Personal Care</title>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/shuffle-for-tailwind.png"
        />
      </Head>
      <AllSkincareSectionCustomComponents3 />
      <AllSkincareSectionNavigations2 />
      <AllSkincareSectionHeaders1
        backgroundImage="/coleos-assets/headers/personal-care-hero.png"
        products={headerProducts}
      />
      <main>
        <section className="bg-[#F5E9D6] py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6 text-4xl md:text-6xl text-black font-bold leading-tight">
              CLEF Personal Care Malaysia - Everyday Care That Feels Effortless
            </h1>
            <p className="mb-8 text-lg md:text-xl text-gray-700 font-bold leading-relaxed">
              Personal Care Malaysia essentials from CLEF bring body, hand, hair, and sun care into one simple daily routine. Each pick is designed to feel clean, comfortable, and easy to use without changing the familiar CLEF shopping experience.
            </p>
          </div>
        </section>
        <section className="py-12 md:py-24 lg:py-32 bg-[#F7F1EA]">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl text-center font-heading font-semibold text-rhino-600 tracking-xs mb-14">
              Personal Care Essentials
            </h2>
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
        <AllPersonalCareSectionBanners6 />
      </main>
      <Footer />
    </>
  );
};

export default AllPersonalCare;

export const getServerSideProps: GetServerSideProps<CategoryPageProductsProps> = async (
  context,
) => getCategoryProductsProps('personal-care', context);
