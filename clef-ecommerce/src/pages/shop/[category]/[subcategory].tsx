import ErrorPage from 'next/error';
import type { GetServerSideProps } from 'next';
import BySkincare from '../../../components/templates/BySkincareTemplate';
import {
  getSubcategoryProductsProps,
  type SubcategoryPageProductsProps,
} from '../../../lib/category-page';

type SubcategoryPageProps = SubcategoryPageProductsProps;

const SubcategoryPage: React.FC<SubcategoryPageProps> = ({
  categoryConfig,
  categoryContent,
  footerContent,
  subcategoryConfig,
  products,
  medusaError,
}) => {
  if (!categoryConfig || !subcategoryConfig) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <BySkincare
      categoryConfig={categoryConfig}
      categoryContent={categoryContent}
      footerContent={footerContent}
      subcategoryConfig={subcategoryConfig}
      products={products}
      medusaError={medusaError}
    />
  );
};

export const getServerSideProps: GetServerSideProps<SubcategoryPageProps> = async (context) => {
  const { params } = context;
  const category = Array.isArray(params?.category)
    ? params?.category[0]
    : params?.category;
  const subcategory = Array.isArray(params?.subcategory)
    ? params?.subcategory[0]
    : params?.subcategory;

  if (!category || !subcategory) {
    return { notFound: true };
  }

  return getSubcategoryProductsProps(category, subcategory, context);
};

export default SubcategoryPage;
