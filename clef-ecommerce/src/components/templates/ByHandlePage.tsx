import ErrorPage from 'next/error';
import AllPersonalCare from '../../pages/all-personal-care';
import AllSkincare from '../../pages/all-skincare';
import Fragrance from '../../pages/fragrance';
import type { ByHandlePageProps } from '../../lib/category-page';
import BySkincareTemplate from './BySkincareTemplate';

const ByHandlePage: React.FC<ByHandlePageProps> = (props) => {
  if (props.pageType === 'subcategory') {
    return (
      <BySkincareTemplate
        categoryConfig={props.categoryConfig}
        categoryContent={props.categoryContent}
        footerContent={props.footerContent}
        subcategoryConfig={props.subcategoryConfig}
        products={props.products}
        medusaError={props.medusaError}
      />
    );
  }

  if (props.handle === 'personal-care') {
    return (
      <AllPersonalCare
        categoryContent={props.categoryContent}
        footerContent={props.footerContent}
        headerProducts={props.headerProducts}
        products={props.products}
        medusaError={props.medusaError}
      />
    );
  }

  if (props.handle === 'fragrance') {
    return (
      <Fragrance
        categoryContent={props.categoryContent}
        footerContent={props.footerContent}
        headerProducts={props.headerProducts}
        products={props.products}
        medusaError={props.medusaError}
      />
    );
  }

  if (props.handle === 'skincare') {
    return (
      <AllSkincare
        categoryContent={props.categoryContent}
        footerContent={props.footerContent}
        headerProducts={props.headerProducts}
        products={props.products}
        medusaError={props.medusaError}
      />
    );
  }

  return <ErrorPage statusCode={404} />;
};

export default ByHandlePage;
export type { ByHandlePageProps };
