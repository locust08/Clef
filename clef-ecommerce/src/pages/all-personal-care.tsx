import type { GetServerSideProps } from 'next';
import CategoryShopTemplate from '../components/templates/CategoryShopTemplate';
import {
  getCategoryProductsProps,
  type CategoryPageProductsProps,
} from '../lib/category-page';

const AllPersonalCare: React.FC<CategoryPageProductsProps> = (props) => (
  <CategoryShopTemplate category="personal-care" {...props} />
);

export default AllPersonalCare;

export const getServerSideProps: GetServerSideProps<CategoryPageProductsProps> = async (
  context,
) => getCategoryProductsProps('personal-care', context);
