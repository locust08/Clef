import React, { useEffect } from 'react';
import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import AllSkincareSectionCustomComponents3 from '../components/custom-components/AllSkincareSectionCustomComponents3';
import AllSkincareSectionNavigations2 from '../components/navigations/AllSkincareSectionNavigations2';
import AllSkincareSectionHeaders1 from '../components/headers/AllSkincareSectionHeaders1';
import FragranceSectionBanners5 from '../components/banners/FragranceSectionBanners5';
import FragranceSectionFooters6 from '../components/footers/FragranceSectionFooters6';
import ProductGrid from '../components/product/ProductGrid';
import type { StorefrontProduct } from '../lib/medusa-products';
import {
  getCategoryProductsProps,
  type CategoryPageProductsProps,
} from '../lib/category-page';

const fragranceHeaderPlaceholders: StorefrontProduct[] = Array.from(
  { length: 3 },
  (_, index) => ({
    id: `fragrance-placeholder-${index + 1}`,
    handle: '#',
    name: '',
    description: '',
    price: 0,
    priceDisplay: '',
    image: '',
    images: [],
    category: 'fragrance',
    categoryLabel: 'Fragrance',
    subcategory: null,
    tags: [],
    variants: [],
  }),
);

const Fragrance: React.FC<CategoryPageProductsProps> = ({
  products,
  medusaError,
}) => {
  useEffect(() => {
    // Load custom component scripts after React components are mounted
    const script1 = document.createElement('script');
    script1.src =
      '/js/1298071.js?v=1782961836';
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
      <AllSkincareSectionCustomComponents3 />
      <AllSkincareSectionNavigations2 />
      <AllSkincareSectionHeaders1
        backgroundImage="/coleos-assets/headers/bg-image3.png"
        products={fragranceHeaderPlaceholders}
      />
      <section className="py-12 md:py-24 lg:py-32">
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
      <FragranceSectionBanners5 />
      <FragranceSectionFooters6 />
    </>
  );
};

export default Fragrance;

export const getServerSideProps: GetServerSideProps<CategoryPageProductsProps> = async (
  context,
) => getCategoryProductsProps('fragrance', context);
