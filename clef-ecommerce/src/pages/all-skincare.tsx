import type { GetServerSideProps } from 'next';
import CategoryShopTemplate from '../components/templates/CategoryShopTemplate';
import {
  getCategoryProductsProps,
  type CategoryPageProductsProps,
} from '../lib/category-page';

const AllSkincare: React.FC<CategoryPageProductsProps> = (props) => (
  <CategoryShopTemplate category="skincare" {...props} />
);

export default AllSkincare;

export const getServerSideProps: GetServerSideProps<CategoryPageProductsProps> = async (
  context,
) => getCategoryProductsProps('skincare', context);
