import React from 'react';
import type { GetServerSideProps } from 'next';
import GroupedDeodorantProductPage from '../../components/product/GroupedDeodorantProductPage';
import { getProductAHandles } from '../../lib/deodorant-groups';
import {
  getProductsByHandles,
  type StorefrontProduct,
} from '../../lib/medusa-products';
import { setNoStore } from '../../lib/category-page';

type NewLaunchDeodorantPageProps = {
  products: StorefrontProduct[];
  medusaError: string | null;
};

const NewLaunchDeodorantPage: React.FC<NewLaunchDeodorantPageProps> = ({
  products,
  medusaError,
}) => (
  <GroupedDeodorantProductPage
    type="new-launch"
    products={products}
    medusaError={medusaError}
  />
);

export const getServerSideProps: GetServerSideProps<
  NewLaunchDeodorantPageProps
> = async (context) => {
  setNoStore(context);

  try {
    const products = await getProductsByHandles(getProductAHandles());

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

export default NewLaunchDeodorantPage;
