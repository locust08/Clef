import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import type { GetServerSideProps } from 'next';
import IndexSectionCustomComponents7 from '../components/custom-components/IndexSectionCustomComponents7';
import IndexSectionHeaders1 from '../components/headers/IndexSectionHeaders1';
import IndexSectionBanners2 from '../components/banners/IndexSectionBanners2';
import IndexSectionProductBlocks3 from '../components/product-blocks/IndexSectionProductBlocks3';
import IndexSectionInstagramPhotos5 from '../components/instagram-photos/IndexSectionInstagramPhotos5';
import IndexSectionTestimonials4 from '../components/testimonials/IndexSectionTestimonials4';
import IndexSectionFooters6 from '../components/footers/IndexSectionFooters6';
import {
  getHomepageBestSellers,
  getProductsByHandles,
  type StorefrontProduct,
} from '../lib/medusa-products';
import {
  getFooterContent,
  getHomepageContent,
  getVideoSectionContent,
  type FooterContent,
  type HomepageContent,
  type VideoSectionContent,
} from '../lib/cms';

type IndexProps = {
  bestSellerProducts: StorefrontProduct[];
  footerContent: FooterContent;
  homepageContent: HomepageContent;
  newLaunchProducts: StorefrontProduct[];
  videoSectionContent: VideoSectionContent;
  previewActive: boolean;
};

const Index: React.FC<IndexProps> = ({
  bestSellerProducts,
  footerContent,
  homepageContent,
  newLaunchProducts,
  videoSectionContent,
}) => {
  const renderSection = (
    section: HomepageContent['sections'][number]['section'],
  ) => {
    switch (section) {
      case 'hero':
        return <IndexSectionHeaders1 content={homepageContent} />;
      case 'categories':
        return <IndexSectionBanners2 />;
      case 'best-sellers':
        return (
          <IndexSectionProductBlocks3
            hideWhenEmpty
            products={bestSellerProducts}
            title={homepageContent.bestSellerTitle}
          />
        );
      case 'new-launch':
        return (
          <IndexSectionProductBlocks3
            badgeLabel="New"
            ctaHref="/products"
            eyebrow="CLEF arrivals"
            hideWhenEmpty
            products={newLaunchProducts}
            title={homepageContent.newLaunchTitle}
          />
        );
      case 'social':
        return <IndexSectionInstagramPhotos5 content={videoSectionContent} />;
      case 'testimonials':
        return (
          <IndexSectionTestimonials4 reviews={homepageContent.customerReviews} />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Head>
        <title></title>
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/shuffle-for-tailwind.png'
        />
      </Head>
      <IndexSectionCustomComponents7 />
      {homepageContent.sections
        .filter((section) => section.isEnabled)
        .map((section, index) => (
          <React.Fragment key={`${section.section}-${index}`}>
            {renderSection(section.section)}
          </React.Fragment>
        ))}
      <IndexSectionFooters6 content={footerContent} />
    </>
  );
};

export default Index;

const getProductsByPayloadHandles = async (handles: string[]) => {
  if (!handles.length) {
    return [];
  }

  const products = await getProductsByHandles(handles);
  const productByHandle = new Map(
    products.map((product) => [product.handle, product]),
  );

  return handles
    .map((handle) => productByHandle.get(handle))
    .filter((product): product is StorefrontProduct => Boolean(product));
};

export const getServerSideProps: GetServerSideProps<IndexProps> = async ({
  preview,
  res,
}) => {
  res.setHeader(
    'Cache-Control',
    preview
      ? 'private, no-store, max-age=0'
      : 'public, s-maxage=30, stale-while-revalidate=60',
  );

  const [homepageContent, footerContent, videoSectionContent] = await Promise.all([
    getHomepageContent(preview === true),
    getFooterContent(preview === true),
    getVideoSectionContent(preview === true),
  ]);

  let bestSellerProducts: StorefrontProduct[] = [];
  let newLaunchProducts: StorefrontProduct[] = [];

  try {
    if (homepageContent.bestSellerMedusaProductHandles.length) {
      bestSellerProducts = await getProductsByPayloadHandles(
        homepageContent.bestSellerMedusaProductHandles,
      );
    }

    if (!bestSellerProducts.length) {
      bestSellerProducts = await getHomepageBestSellers();
    }
    newLaunchProducts = await getProductsByPayloadHandles(
      homepageContent.newLaunchMedusaProductHandles,
    );
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Medusa] Unable to load homepage products.', error);
    }
  }

  return {
    props: {
      bestSellerProducts,
      footerContent,
      homepageContent,
      newLaunchProducts,
      previewActive: preview === true,
      videoSectionContent,
    },
  };
};

