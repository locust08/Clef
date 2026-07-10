import React from 'react';
import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import BySkincareSectionCustomComponents1 from '../../components/custom-components/BySkincareSectionCustomComponents1';
import BySkincareSectionNavigations4 from '../../components/navigations/BySkincareSectionNavigations4';
import GroupedDeodorantCategoryGrid from '../../components/product/GroupedDeodorantCategoryGrid';
import ProductTrustBenefitsStrip from '../../components/product/ProductTrustBenefitsStrip';
import { categoryConfig } from '../../data/category-config';
import {
  getProductAHandles,
  getProductBHandles,
  getGroupedDeodorantCards,
} from '../../lib/deodorant-groups';
import {
  getProductsByHandles,
  type StorefrontProduct,
} from '../../lib/medusa-products';
import { setNoStore } from '../../lib/category-page';

type DeodorantCategoryPageProps = {
  products: StorefrontProduct[];
  medusaError: string | null;
};

const personalCareConfig = categoryConfig['personal-care'];
const deodorantConfig = personalCareConfig.subcategories.find(
  (subcategory) => subcategory.slug === 'deodorant',
)!;

const DeodorantCategoryPage: React.FC<DeodorantCategoryPageProps> = ({
  products,
  medusaError,
}) => {
  getGroupedDeodorantCards(products);

  return (
    <>
      <Head>
        <title>Deodorant | Personal Care</title>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/shuffle-for-tailwind.png"
        />
      </Head>
      <BySkincareSectionCustomComponents1 />
      <BySkincareSectionNavigations4
        categoryConfig={personalCareConfig}
        activeSubcategory="deodorant"
      />
      <section className="relative overflow-hidden py-12">
        <div className="container mx-auto mb-8 px-4">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm font-medium text-rhino-400">
            <a className="hover:text-rhino-700 clef-link-highlight" href="/">
              Home
            </a>
            <span>/</span>
            <a
              className="hover:text-rhino-700 clef-link-highlight"
              href={personalCareConfig.parentHref}
            >
              {personalCareConfig.displayName}
            </a>
            <span>/</span>
            <span className="text-rhino-700">{deodorantConfig.displayName}</span>
          </div>
          <div className="mb-4 inline-block rounded-full bg-purple-100 px-4 py-1 text-center text-xs font-bold uppercase tracking-widest text-purple-500">
            {personalCareConfig.displayName}
          </div>
          <h1 className="font-heading text-4xl font-semibold text-rhino-700 md:text-5xl">
            {deodorantConfig.displayName}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-rhino-400">
            Shop CLEF deodorant and perfume mist as curated launch and
            mix-and-match bundles.
          </p>
        </div>
        <ProductTrustBenefitsStrip />
        <div className="container mx-auto px-4">
          <GroupedDeodorantCategoryGrid
            products={products}
            medusaError={medusaError}
          />
        </div>
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  DeodorantCategoryPageProps
> = async (context) => {
  setNoStore(context);

  try {
    const products = await getProductsByHandles([
      ...getProductAHandles(),
      ...getProductBHandles(),
    ]);

    return {
      props: {
        products,
        medusaError: null,
      },
    };
  } catch (error) {
    return {
      props: {
        products: [],
        medusaError:
          error instanceof Error
            ? error.message
            : 'Unable to load deodorant products from Medusa.',
      },
    };
  }
};

export default DeodorantCategoryPage;
