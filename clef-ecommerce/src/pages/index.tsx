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
};

const Index: React.FC<IndexProps> = ({
  bestSellerProducts,
  footerContent,
  homepageContent,
  newLaunchProducts,
  videoSectionContent,
}) => {
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
      <IndexSectionHeaders1 content={homepageContent} />
      <IndexSectionBanners2 />
      <IndexSectionProductBlocks3
        products={bestSellerProducts}
        title={homepageContent.bestSellerTitle}
      />
      <IndexSectionProductBlocks3
        badgeLabel="New"
        ctaHref="/products"
        eyebrow="CLEF arrivals"
        hideWhenEmpty
        products={newLaunchProducts}
        title={homepageContent.newLaunchTitle}
      />
      <IndexSectionInstagramPhotos5 content={videoSectionContent} />
      <IndexSectionTestimonials4 reviews={homepageContent.customerReviews} />
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

export const getServerSideProps: GetServerSideProps<IndexProps> = async () => {
  const [homepageContent, footerContent] = await Promise.all([
    getHomepageContent(),
    getFooterContent(),
  ]);
  const videoSectionContent: VideoSectionContent = {
    sectionTitle: 'CLEF on Social',
    videos: homepageContent.homepageVideos,
  };

  let bestSellerProducts: StorefrontProduct[] = [];
  let newLaunchProducts: StorefrontProduct[] = [];

  try {
    bestSellerProducts = homepageContent.bestSellerMedusaProductHandles.length
      ? await getProductsByPayloadHandles(
          homepageContent.bestSellerMedusaProductHandles,
        )
      : await getHomepageBestSellers();
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
      videoSectionContent,
    },
  };
};

