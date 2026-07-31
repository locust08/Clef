import React from 'react';
import type { GetServerSideProps } from 'next';
import { DEFAULT_CLEF_EDIT_ARTICLES, getClefEditArticles } from '../lib/cms';

const ClefInfo: React.FC = () => null;

export const getServerSideProps: GetServerSideProps = async ({ preview }) => {
  const articles = await getClefEditArticles(preview === true);
  const firstArticle = articles[0] ?? DEFAULT_CLEF_EDIT_ARTICLES[0];

  return {
    redirect: {
      destination: firstArticle.href,
      permanent: false,
    },
  };
};

export default ClefInfo;
