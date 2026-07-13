import type { GetServerSideProps, NextPage } from 'next';
import CategoryShopTemplate from '../../components/templates/CategoryShopTemplate';
import type { CategorySlug } from '../../data/category-config';
import {
  getCategoryProductsProps,
  type CategoryPageProductsProps,
} from '../../lib/category-page';

type CategoryPageProps = CategoryPageProductsProps & {
  category: CategorySlug;
};

const CategoryPage: NextPage<CategoryPageProps> = ({
  category,
  categoryContent,
  footerContent,
  products,
  headerProducts,
  medusaError,
}) => (
  <CategoryShopTemplate
    category={category}
    categoryContent={categoryContent}
    footerContent={footerContent}
    headerProducts={headerProducts}
    products={products}
    medusaError={medusaError}
  />
);

export const getServerSideProps: GetServerSideProps<CategoryPageProps> = async (context) => {
  const categoryParam = context.params?.category;
  const category = Array.isArray(categoryParam) ? categoryParam[0] : categoryParam;
  const productsProps = await getCategoryProductsProps(
    category ?? 'skincare',
    context,
  );

  if ('notFound' in productsProps || 'redirect' in productsProps) {
    return productsProps;
  }

  const props = await productsProps.props;

  return {
    props: {
      ...props,
      category: (category ?? 'skincare') as CategorySlug,
    },
  };
};

export default CategoryPage;
