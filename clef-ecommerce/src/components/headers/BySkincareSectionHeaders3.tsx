import React from 'react';
import type {
  CategoryConfig,
  SubcategoryConfig,
} from '../../data/category-config';
import type { StorefrontProduct } from '../../lib/medusa-products';
import type { CategoryPageContent } from '../../lib/cms';
import ProductHeroCarousel from '../product/ProductHeroCarousel';
import ProductTrustBenefitsStrip from '../product/ProductTrustBenefitsStrip';

type BySkincareSectionHeaders3Props = {
  categoryConfig: CategoryConfig;
  categoryContent?: CategoryPageContent;
  subcategoryConfig: SubcategoryConfig;
  products: StorefrontProduct[];
  medusaError?: string | null;
};

const fallbackHeroImage =
  'https://static.shuffle.dev/uploads/files/6f/6fb48a03fbf8bf9e36f18c917c673f67c9eac42d/dcd0eaab-2404-416f-86fb-7aa5717607df.png';

const BySkincareSectionHeaders3: React.FC<BySkincareSectionHeaders3Props> = ({
  categoryConfig,
  categoryContent,
  subcategoryConfig,
  products,
  medusaError = null,
}) => {
  const heroTitle = categoryContent?.headerTitle || subcategoryConfig.displayName;
  const heroDescription =
    categoryContent?.headerSubtitle ||
    'Discover curated CLEF essentials for your routine.';
  const heroImage = categoryContent?.headerImage?.src || fallbackHeroImage;
  const heroImageAlt =
    categoryContent?.headerImage?.alt || subcategoryConfig.displayName;

  return (
    <section className="relative overflow-hidden py-12">
      <div className="container mx-auto mb-8 px-4">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm font-medium text-rhino-400">
          <a className="hover:text-rhino-700 clef-link-highlight" href="/">
            Home
          </a>
          <span>/</span>
          <a
            className="hover:text-rhino-700 clef-link-highlight"
            href={categoryConfig.parentHref}
          >
            {categoryConfig.displayName}
          </a>
          <span>/</span>
          <span className="text-rhino-700">{subcategoryConfig.displayName}</span>
        </div>
        <div className="mb-4 inline-block rounded-full bg-purple-100 px-4 py-1 text-center text-xs font-bold uppercase tracking-widest text-purple-500">
          {categoryConfig.displayName}
        </div>
        <h1 className="font-heading text-4xl font-semibold text-rhino-700 md:text-5xl">
          {heroTitle}
        </h1>
      </div>

      <ProductHeroCarousel
        className="mb-10"
        eyebrow={categoryConfig.displayName}
        fallbackDescription={heroDescription}
        fallbackHref={categoryConfig.parentHref}
        fallbackImage={heroImage}
        fallbackImageAlt={heroImageAlt}
        fallbackTitle={heroTitle}
        products={products}
      />
      <ProductTrustBenefitsStrip />

      {medusaError ? (
        <div className="container mx-auto px-4 pt-8">
          <div className="border-y border-red-100 bg-white px-6 py-4 text-center">
            <p className="text-sm text-rhino-500">{medusaError}</p>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default BySkincareSectionHeaders3;
