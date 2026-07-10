import React from 'react';
import Head from 'next/head';
import AllSkincareSectionCustomComponents3 from '../custom-components/AllSkincareSectionCustomComponents3';
import AllSkincareSectionNavigations2 from '../navigations/AllSkincareSectionNavigations2';
import CategoryVideoSection from '../banners/CategoryVideoSection';
import AllSkincareSectionBanners6 from '../banners/AllSkincareSectionBanners6';
import AllSkincareSectionCustomComponents5 from '../custom-components/AllSkincareSectionCustomComponents5';
import AllPersonalCareSectionBanners6 from '../banners/AllPersonalCareSectionBanners6';
import FragranceSectionBanners5 from '../banners/FragranceSectionBanners5';
import FragranceSectionFooters6 from '../footers/FragranceSectionFooters6';
import Footer from '../layout/Footer';
import ProductGrid from '../product/ProductGrid';
import ProductHeroCarousel from '../product/ProductHeroCarousel';
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
  medusaError: string | null;
};

const fallbackHeroImage =
  'https://static.shuffle.dev/uploads/files/6f/6fb48a03fbf8bf9e36f18c917c673f67c9eac42d/5cb097d9-0f1d-4b51-9ad3-3cfab9fcfeec.png';

const categoryBackgrounds: Record<CategorySlug, string> = {
  skincare: fallbackHeroImage,
  'personal-care': '/coleos-assets/headers/personal-care-hero.png',
  fragrance: '/coleos-assets/headers/bg-image3.png',
};

const categoryProductHeadings: Record<CategorySlug, string> = {
  skincare: 'Our products',
  'personal-care': 'Personal Care Essentials',
  fragrance: 'Our products',
};

const CategoryShopTemplate: React.FC<CategoryShopTemplateProps> = ({
  category,
  categoryContent,
  footerContent,
  products,
  medusaError,
}) => {
  const heroTitle =
    categoryContent.headerTitle || categoryContent.title || 'CLEF Products';
  const heroDescription =
    categoryContent.headerSubtitle ||
    'Discover curated CLEF essentials for your routine.';
  const heroImage =
    categoryContent.headerImage?.src ?? categoryBackgrounds[category];
  const heroImageAlt =
    categoryContent.headerImage?.alt ?? categoryContent.title ?? heroTitle;

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
      <AllSkincareSectionNavigations2 />
      <section className="relative overflow-hidden bg-[#F7F1EA] py-12">
        <div className="container mx-auto mb-8 px-4">
          <div className="mb-4 inline-block rounded-full bg-purple-100 px-4 py-1 text-center text-xs font-bold uppercase tracking-widest text-purple-500">
            {categoryContent.title}
          </div>
          <h1 className="font-heading text-4xl font-semibold text-rhino-700 md:text-5xl">
            {heroTitle}
          </h1>
          {heroDescription ? (
            <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-rhino-400">
              {heroDescription}
            </p>
          ) : null}
        </div>
        <ProductHeroCarousel
          eyebrow={categoryContent.title}
          fallbackDescription={heroDescription}
          fallbackHref={`/shop/${category}`}
          fallbackImage={heroImage}
          fallbackImageAlt={heroImageAlt}
          fallbackTitle={heroTitle}
          products={products}
        />
      </section>
      <ProductTrustBenefitsStrip className="pt-10" />
      <section className="bg-[#F7F1EA] py-12 md:py-24 lg:py-32">
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
      <CategoryVideoSection content={categoryContent} />
      {category === 'skincare' ? (
        <>
          <AllSkincareSectionBanners6 />
          <AllSkincareSectionCustomComponents5 />
          <Footer content={footerContent} />
        </>
      ) : null}
      {category === 'personal-care' ? (
        <>
          <AllPersonalCareSectionBanners6 />
          <Footer content={footerContent} />
        </>
      ) : null}
      {category === 'fragrance' ? (
        <>
          <FragranceSectionBanners5 />
          <FragranceSectionFooters6 content={footerContent} />
        </>
      ) : null}
    </>
  );
};

export default CategoryShopTemplate;
