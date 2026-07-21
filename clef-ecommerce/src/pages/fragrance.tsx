import type { GetServerSideProps } from 'next';
import CategoryShopTemplate from '../components/templates/CategoryShopTemplate';
import {
  getCategoryProductsProps,
  type CategoryPageProductsProps,
} from '../lib/category-page';

const Fragrance: React.FC<CategoryPageProductsProps> = (props) => (
  <CategoryShopTemplate category="fragrance" {...props} />
);

export default Fragrance;

export const getServerSideProps: GetServerSideProps<CategoryPageProductsProps> = async (
  context,
) => getCategoryProductsProps('fragrance', context);
