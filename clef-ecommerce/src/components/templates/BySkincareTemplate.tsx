import React from 'react';
import Head from 'next/head';
import BySkincareSectionCustomComponents1 from '../custom-components/BySkincareSectionCustomComponents1';
import BySkincareSectionNavigations4 from '../navigations/BySkincareSectionNavigations4';
import BySkincareSectionHeaders3 from '../headers/BySkincareSectionHeaders3';
import CategoryVideoSection from '../banners/CategoryVideoSection';
import BySkincareSectionCustomComponents2 from '../custom-components/BySkincareSectionCustomComponents2';
import type {
  CategoryConfig,
  SubcategoryConfig,
} from '../../data/category-config';
import type { StorefrontProduct } from '../../lib/medusa-products';
import type { CategoryPageContent, FooterContent } from '../../lib/cms';

type BySkincareTemplateProps = {
  categoryConfig: CategoryConfig;
  categoryContent: CategoryPageContent;
  footerContent: FooterContent;
  subcategoryConfig: SubcategoryConfig;
  products: StorefrontProduct[];
  medusaError?: string | null;
};

const BySkincareTemplate: React.FC<BySkincareTemplateProps> = ({
  categoryConfig,
  categoryContent,
  footerContent,
  subcategoryConfig,
  products,
  medusaError = null,
}) => {
  return (
    <>
      <Head>
        <title>{`${subcategoryConfig.displayName} | ${categoryConfig.displayName}`}</title>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/shuffle-for-tailwind.png"
        />
      </Head>
      <BySkincareSectionCustomComponents1 />
      <BySkincareSectionNavigations4
        categoryConfig={categoryConfig}
        activeSubcategory={subcategoryConfig.slug}
      />
      <BySkincareSectionHeaders3
        categoryConfig={categoryConfig}
        categoryContent={categoryContent}
        subcategoryConfig={subcategoryConfig}
        products={products}
        medusaError={medusaError}
      />
      <CategoryVideoSection content={categoryContent} />
      <BySkincareSectionCustomComponents2 footerContent={footerContent} />
    </>
  );
};

export default BySkincareTemplate;

