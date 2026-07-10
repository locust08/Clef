import React from 'react';
import type { ClefEditArticle } from '../../lib/cms';

type ClefInfoSectionProductDetails3Props = {
  article: ClefEditArticle;
};

const BulletSeparator: React.FC = () => (
  <span className="text-rhino-300" aria-hidden="true">
    &bull;
  </span>
);

const ClefInfoSectionProductDetails3: React.FC<ClefInfoSectionProductDetails3Props> = ({
  article,
}) => {
  return (
    <section className="py-12 md:py-24 lg:py-32">
      <div className="container px-4 mx-auto">
        <article className="max-w-4xl mx-auto">
          <div className="mb-12">
            <div className="inline-block mb-6 bg-orange-500 rounded-xl px-4 py-1 text-center uppercase text-white text-xs font-bold tracking-widest">
              {article.categoryLabel}
            </div>
            <h1 className="text-rhino-700 font-semibold text-3xl md:text-4xl lg:text-5xl mb-6 font-heading leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={article.authorImage?.src ?? 'https://placehold.co/40x40'}
                  alt={article.authorImage?.alt ?? article.authorName}
                />
                <div>
                  <p className="text-rhino-700 text-sm font-medium">
                    {article.authorName}
                  </p>
                  <p className="text-rhino-300 text-xs">{article.authorRole}</p>
                </div>
              </div>
              <BulletSeparator />
              <p className="text-rhino-300 text-sm">{article.publishedDate}</p>
              {article.readTime && (
                <>
                  <BulletSeparator />
                  <p className="text-rhino-300 text-sm">{article.readTime}</p>
                </>
              )}
            </div>
            <img
              className="rounded-xl w-full h-64 md:h-96 object-cover"
              src={article.heroImage?.src ?? 'https://placehold.co/900x560'}
              alt={article.heroImage?.alt ?? article.title}
            />
          </div>

          <div className="flex flex-wrap w-full mb-8">
            <a className="group clef-link-highlight" href="#description">
              <p className="whitespace-nowrap block mb-4 text-sm px-4 pt-4 font-bold transition duration-200 text-rhino-700 group-hover:text-rhino-700">
                Description
              </p>
              <div className="w-full h-px group-hover:bg-purple-500 transition duration-200 bg-purple-500" />
            </a>
            <a className="group clef-link-highlight" href="#questions">
              <p className="whitespace-nowrap block mb-4 text-sm px-4 pt-4 font-bold transition duration-200 text-rhino-300 group-hover:text-rhino-700">
                Question
              </p>
              <div className="w-full h-px group-hover:bg-purple-500 transition duration-200 bg-rhino-200" />
            </a>
            <a className="group clef-link-highlight" href="#products">
              <p className="whitespace-nowrap block mb-4 text-sm px-4 pt-4 font-bold transition duration-200 text-rhino-300 group-hover:text-rhino-700">
                Products
              </p>
              <div className="w-full h-px group-hover:bg-purple-500 transition duration-200 bg-rhino-200" />
            </a>
            <div className="flex-1">
              <div className="w-full h-full border-b border-rhino-200" />
            </div>
          </div>

          <div id="description" className="mb-10 scroll-mt-24">
            <h2 className="text-rhino-500 font-bold mb-4">{article.title}</h2>
            <p className="text-rhino-500 leading-7">{article.description}</p>
          </div>

          <div id="questions" className="mb-10 scroll-mt-24">
            <div className="space-y-6">
              {article.questions.map((question) => (
                <div
                  className="rounded-xl border border-coolGray-200 bg-white p-6 shadow-sm"
                  key={question.question}
                >
                  <h2 className="text-rhino-700 font-bold text-xl mb-4">
                    {question.question}
                  </h2>
                  <p className="text-rhino-500 leading-7">{question.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="products" className="scroll-mt-24">
            <h2 className="text-rhino-500 font-bold mb-2">
              Product Suggestions
            </h2>
            <p className="text-rhino-300 mb-8">
              Recommended CLEF products for this skincare topic.
            </p>
            <div className="space-y-6">
              {article.productSuggestions.map((product) => (
                <div
                  className="flex flex-col sm:flex-row gap-5 rounded-xl border border-coolGray-200 bg-white p-5 shadow-sm hover:shadow-md transition duration-200"
                  key={product.name}
                >
                  <img
                    className="w-full sm:w-28 h-40 sm:h-28 object-cover rounded-lg flex-shrink-0"
                    src={product.image?.src ?? 'https://placehold.co/112x112'}
                    alt={product.image?.alt ?? product.name}
                  />
                  <div className="flex-1">
                    <h3 className="text-rhino-700 font-bold text-lg mb-1">
                      {product.name}
                    </h3>
                    {product.price && (
                      <p className="text-purple-500 font-semibold text-sm mb-2">
                        {product.price}
                      </p>
                    )}
                    <p className="text-rhino-500 text-sm leading-6">
                      {product.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default ClefInfoSectionProductDetails3;
