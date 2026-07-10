import React from 'react';
import type { GetServerSideProps } from 'next';
import GroupedDeodorantProductPage from '../../components/product/GroupedDeodorantProductPage';
import { getProductBHandles } from '../../lib/deodorant-groups';
import {
  getProductsByHandles,
  type StorefrontProduct,
} from '../../lib/medusa-products';
import { setNoStore } from '../../lib/category-page';

type MixMatchDeodorantPageProps = {
  products: StorefrontProduct[];
  medusaError: string | null;
};

const MixMatchDeodorantPage: React.FC<MixMatchDeodorantPageProps> = ({
  products,
  medusaError,
}) => (
  <GroupedDeodorantProductPage
    type="mix-match"
    products={products}
    medusaError={medusaError}
  />
);

export const getServerSideProps: GetServerSideProps<
  MixMatchDeodorantPageProps
> = async (context) => {
  setNoStore(context);

  try {
    const products = await getProductsByHandles(getProductBHandles());

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

export default MixMatchDeodorantPage;
