import React from 'react';
import type { GetServerSideProps } from 'next';
import AllSkincare from './all-skincare';
import {
  getCategoryProductsProps,
  type CategoryPageProductsProps,
} from '../lib/category-page';

const BySkincare: React.FC<CategoryPageProductsProps> = ({
  categoryContent,
  footerContent,
  products,
  headerProducts,
  medusaError,
}) => (
  <AllSkincare
    categoryContent={categoryContent}
    footerContent={footerContent}
    products={products}
    headerProducts={headerProducts}
    medusaError={medusaError}
  />
);

export const getServerSideProps: GetServerSideProps<CategoryPageProductsProps> = async (
  context,
) => getCategoryProductsProps('skincare', context);

export default BySkincare;
