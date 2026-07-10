import type { GetServerSideProps } from 'next';
import Products from '../products';
import {
  getProductByHandle,
  type StorefrontProduct,
} from '../../lib/medusa-products';
import { setNoStore } from '../../lib/category-page';

type ProductPageProps = {
  product: StorefrontProduct | null;
  medusaError: string | null;
};

const ProductPage: React.FC<ProductPageProps> = ({ product, medusaError }) => (
  <Products product={product} medusaError={medusaError} />
);

export const getServerSideProps: GetServerSideProps<ProductPageProps> = async (
  context,
) => {
  setNoStore(context);
  const handleParam = context.params?.handle;
  const handle = Array.isArray(handleParam) ? handleParam[0] : handleParam;

  if (!handle) {
    return { notFound: true };
  }

  try {
    const product = await getProductByHandle(handle);

    return {
      props: {
        product,
        medusaError: null,
      },
    };
  } catch (error) {
    return {
      props: {
        product: null,
        medusaError:
          error instanceof Error
            ? error.message
            : 'Unable to load this product from Medusa.',
      },
    };
  }
};

export default ProductPage;
