import React from 'react';
import Head from 'next/head';
import type { GetStaticProps } from 'next';
import ClefEditSectionCustomComponents1 from '../components/custom-components/ClefEditSectionCustomComponents1';
import ClefEditSectionBanners3 from '../components/banners/ClefEditSectionBanners3';
import ClefEditSectionTestimonials2 from '../components/testimonials/ClefEditSectionTestimonials2';
import ClefEditSectionCustomComponents4 from '../components/custom-components/ClefEditSectionCustomComponents4';
import { getClefEditArticles, type ClefEditArticle } from '../lib/cms';

type ClefEditProps = {
  articles: ClefEditArticle[];
  previewActive: boolean;
};

const ClefEdit: React.FC<ClefEditProps> = ({ articles }) => {
  return (
    <>
      <Head>
        <title>CLEF Edit</title>
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/shuffle-for-tailwind.png'
        />
      </Head>
      <ClefEditSectionCustomComponents1 />
      <ClefEditSectionBanners3 />
      <ClefEditSectionTestimonials2 articles={articles} />
      <ClefEditSectionCustomComponents4 />
    </>
  );
};

export const getStaticProps: GetStaticProps<ClefEditProps> = async ({
  preview,
}) => {
  const articles = await getClefEditArticles(preview === true);

  return {
    props: {
      articles,
      previewActive: preview === true,
    },
    revalidate: 60,
  };
};

export default ClefEdit;
