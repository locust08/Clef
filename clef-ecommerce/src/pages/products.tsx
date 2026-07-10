import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import type { GetServerSideProps } from 'next';
import ProductsSectionCustomComponents1 from '../components/custom-components/ProductsSectionCustomComponents1';
import ProductsSectionProductDetails2 from '../components/product-details/ProductsSectionProductDetails2';
import ProductsSectionCustomComponents4 from '../components/custom-components/ProductsSectionCustomComponents4';
import ProductGrid from '../components/product/ProductGrid';
import ProductTrustBenefitsStrip from '../components/product/ProductTrustBenefitsStrip';
import { getProducts, type StorefrontProduct } from '../lib/medusa-products';
import { setNoStore } from '../lib/category-page';

type ProductsProps = {
  product?: StorefrontProduct | null;
  products?: StorefrontProduct[];
  medusaError?: string | null;
};

const Products: React.FC<ProductsProps> = ({
  product = null,
  products = [],
  medusaError = null,
}) => {
  return (
    <>
      <Head>
        <title>{product ? product.name : 'Products'}</title>
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/shuffle-for-tailwind.png'
        />
      </Head>
      <ProductsSectionCustomComponents1 />
      {product ? (
        <ProductsSectionProductDetails2 product={product} medusaError={medusaError} />
      ) : (
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 mx-auto">
            <h1 className="text-4xl text-center font-heading font-semibold text-rhino-600 tracking-xs mb-14">Products</h1>
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
      )}
      <ProductTrustBenefitsStrip />
      <ProductsSectionCustomComponents4 />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ProductsProps> = async (context) => {
  setNoStore(context);

  try {
    const products = await getProducts();

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
            : 'Unable to load products from Medusa.',
      },
    };
  }
};

export default Products;
