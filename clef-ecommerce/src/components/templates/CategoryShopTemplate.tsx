import React from 'react';
import Head from 'next/head';
import AllSkincareSectionCustomComponents3 from '../custom-components/AllSkincareSectionCustomComponents3';
import AllSkincareSectionNavigations2 from '../navigations/AllSkincareSectionNavigations2';
import AllSkincareSectionHeaders1 from '../headers/AllSkincareSectionHeaders1';
import CategoryVideoSection from '../banners/CategoryVideoSection';
import AllSkincareSectionBanners6 from '../banners/AllSkincareSectionBanners6';
import AllSkincareSectionCustomComponents5 from '../custom-components/AllSkincareSectionCustomComponents5';
import AllPersonalCareSectionBanners6 from '../banners/AllPersonalCareSectionBanners6';
import FragranceSectionBanners5 from '../banners/FragranceSectionBanners5';
import FragranceSectionFooters6 from '../footers/FragranceSectionFooters6';
import Footer from '../layout/Footer';
import ProductGrid from '../product/ProductGrid';
import ProductTrustBenefitsStrip from '../product/ProductTrustBenefitsStrip';
import type { CategorySlug } from '../../data/category-config';
import type {
  CategoryPageContent,
  FooterContent,
} from '../../lib/cms';
import type { StorefrontProduct } from '../../lib/medusa-products';

type CategoryShopTemplateProps = {
  category: CategorySlug;
  categoryContent: CategoryPageContent;
  footerContent: FooterContent;
  products: StorefrontProduct[];
  headerProducts?: StorefrontProduct[];
  medusaError: string | null;
};

const fallbackHeroImage =
  'https://static.shuffle.dev/uploads/files/6f/6fb48a03fbf8bf9e36f18c917c673f67c9eac42d/5cb097d9-0f1d-4b51-9ad3-3cfab9fcfeec.png';

const categoryBackgrounds: Record<CategorySlug, string> = {
  skincare: fallbackHeroImage,
  'personal-care': '/coleos-assets/headers/personal-care-hero.png',
  fragrance: '/coleos-assets/headers/fragrance-rose-echoes-hero.png',
};

const categoryProductHeadings: Record<CategorySlug, string> = {
  skincare: 'Our products',
  'personal-care': 'Personal Care Essentials',
  fragrance: 'Our products',
};

const categoryHeroTitles: Record<CategorySlug, string> = {
  skincare: 'Take Care Of Your Performance Every Day.',
  'personal-care': 'Take Care Of Your Performance Every Day.',
  fragrance: 'Take Care Of Your Performance Every Day.',
};

const CategoryShopTemplate: React.FC<CategoryShopTemplateProps> = ({
  category,
  categoryContent,
  footerContent,
  products,
  headerProducts = [],
  medusaError,
}) => {
  const heroImage =
    category === 'fragrance'
      ? categoryBackgrounds.fragrance
      : categoryContent.headerImage?.src ?? categoryBackgrounds[category];
  const featuredProducts =
    headerProducts.length > 0 ? headerProducts : products.slice(0, 3);

  const renderEditorial = () => {
    if (category === 'skincare') {
      return (
        <>
          <AllSkincareSectionBanners6 />
          <AllSkincareSectionCustomComponents5 />
        </>
      );
    }

    if (category === 'personal-care') {
      return <AllPersonalCareSectionBanners6 />;
    }

    return <FragranceSectionBanners5 />;
  };

  const renderFooter = () =>
    category === 'fragrance' ? (
      <FragranceSectionFooters6 content={footerContent} />
    ) : (
      <Footer content={footerContent} />
    );

  const renderSection = (
    section: CategoryPageContent['sections'][number]['section'],
  ) => {
    switch (section) {
      case 'navigation':
        return <AllSkincareSectionNavigations2 />;
      case 'hero':
        return (
          <AllSkincareSectionHeaders1
            backgroundImage={heroImage}
            primaryHref={`#${category}-products`}
            products={featuredProducts}
            title={categoryHeroTitles[category]}
          />
        );
      case 'benefits':
        return <ProductTrustBenefitsStrip className="pt-10" />;
      case 'products':
        return (
          <section
            id={`${category}-products`}
            className="bg-[#F7F1EA] py-12 md:py-24 lg:py-32"
          >
            <div className="container mx-auto px-4">
              <h2 className="mb-14 text-center font-heading text-4xl font-semibold tracking-xs text-rhino-600">
                {categoryProductHeadings[category]}
              </h2>
              {medusaError ? (
                <div className="rounded-xl border border-red-100 bg-white p-8 text-center">
                  <h2 className="mb-2 font-heading text-2xl font-semibold text-rhino-700">
                    Unable to load products.
                  </h2>
                  <p className="text-sm text-rhino-400">{medusaError}</p>
                </div>
              ) : (
                <ProductGrid products={products} emptyMessage="No products found." />
              )}
            </div>
          </section>
        );
      case 'video':
        return <CategoryVideoSection content={categoryContent} />;
      case 'editorial':
        return renderEditorial();
      case 'footer':
        return renderFooter();
      default:
        return null;
    }
  };

  return (
    <>
      <Head>
        <title>{categoryContent.title}</title>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/shuffle-for-tailwind.png"
        />
      </Head>
      <AllSkincareSectionCustomComponents3 />
      {categoryContent.sections
        .filter((section) => section.isEnabled)
        .map((section, index) => (
          <React.Fragment key={`${section.section}-${index}`}>
            {renderSection(section.section)}
          </React.Fragment>
        ))}
    </>
  );
};

export default CategoryShopTemplate;
