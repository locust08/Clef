import React from 'react';
import Head from 'next/head';
import type { GetStaticPaths, GetStaticProps } from 'next';
import ClefInfoSectionCustomComponents1 from '../../components/custom-components/ClefInfoSectionCustomComponents1';
import ClefInfoSectionProductDetails3 from '../../components/product-details/ClefInfoSectionProductDetails3';
import ClefInfoSectionCustomComponents2 from '../../components/custom-components/ClefInfoSectionCustomComponents2';
import {
  getProductsByHandles,
  type StorefrontProduct,
} from '../../lib/medusa-products';
import {
  getClefEditArticle,
  getClefEditArticles,
  type ClefEditArticle,
} from '../../lib/cms';

type ClefEditArticlePageProps = {
  article: ClefEditArticle;
  suggestedProducts: (StorefrontProduct & { editorialDescription: string })[];
};

const ClefEditArticlePage: React.FC<ClefEditArticlePageProps> = ({
  article,
  suggestedProducts,
}) => {
  return (
    <>
      <Head>
        <title>{`${article.title} | CLEF Edit`}</title>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/shuffle-for-tailwind.png"
        />
      </Head>
      <ClefInfoSectionCustomComponents1 />
      <ClefInfoSectionProductDetails3
        article={article}
        suggestedProducts={suggestedProducts}
      />
      <ClefInfoSectionCustomComponents2 />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getClefEditArticles();

  return {
    paths: articles.map((article) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<ClefEditArticlePageProps> = async ({
  params,
}) => {
  const slug = typeof params?.slug === 'string' ? params.slug : '';
  const article = await getClefEditArticle(slug);

  if (!article) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  let suggestedProducts: ClefEditArticlePageProps['suggestedProducts'] = [];

  try {
    const suggestions = article.productSuggestions.filter(
      (suggestion) => suggestion.productHandle,
    );
    const products = await getProductsByHandles(
      suggestions.map((suggestion) => suggestion.productHandle),
    );
    const productsByHandle = new Map(
      products.map((product) => [product.handle, product]),
    );

    suggestedProducts = suggestions
      .map((suggestion) => {
        const product = productsByHandle.get(suggestion.productHandle);

        return product
          ? { ...product, editorialDescription: suggestion.description }
          : null;
      })
      .filter(
        (product): product is StorefrontProduct & { editorialDescription: string } =>
          Boolean(product),
      );
  } catch {
    // Article content remains available if the commerce API is temporarily unavailable.
  }

  return {
    props: {
      article,
      suggestedProducts,
    },
    revalidate: 60,
  };
};

export default ClefEditArticlePage;
