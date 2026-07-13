import Link from 'next/link';
import React from 'react';
import type { ClefEditArticle } from '../../lib/cms';
import type { StorefrontProduct } from '../../lib/medusa-products';

type ClefInfoSectionProductDetails3Props = {
  article: ClefEditArticle;
  suggestedProducts: (StorefrontProduct & { editorialDescription: string })[];
};

const articleSections = [
  { id: 'description', label: 'Description' },
  { id: 'questions', label: 'Questions' },
  { id: 'products', label: 'Products' },
] as const;

type ArticleSectionId = (typeof articleSections)[number]['id'];

const isArticleSectionId = (value: string): value is ArticleSectionId =>
  articleSections.some((section) => section.id === value);

const BulletSeparator: React.FC = () => (
  <span className="text-rhino-300" aria-hidden="true">
    &bull;
  </span>
);

const ClefInfoSectionProductDetails3: React.FC<ClefInfoSectionProductDetails3Props> = ({
  article,
  suggestedProducts,
}) => {
  const [activeSection, setActiveSection] =
    React.useState<ArticleSectionId>('description');

  React.useEffect(() => {
    const setSectionFromHash = () => {
      const sectionId = window.location.hash.replace('#', '');

      if (isArticleSectionId(sectionId)) {
        setActiveSection(sectionId);
      }
    };

    setSectionFromHash();
    window.addEventListener('hashchange', setSectionFromHash);

    return () => {
      window.removeEventListener('hashchange', setSectionFromHash);
    };
  }, []);

  const handleSectionSelection = (sectionId: ArticleSectionId) => {
    setActiveSection(sectionId);
    window.history.replaceState(null, '', `#${sectionId}`);
  };

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

          <nav aria-label="Article sections" className="mb-8 border-b border-rhino-200">
            <div className="flex gap-1 overflow-x-auto" role="tablist">
              {articleSections.map((section) => {
                const isActive = activeSection === section.id;

                return (
                  <button
                    aria-controls={`${section.id}-panel`}
                    aria-selected={isActive}
                    className={`whitespace-nowrap border-b-2 px-4 py-4 text-sm font-bold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 ${
                      isActive
                        ? 'border-purple-500 text-rhino-700'
                        : 'border-transparent text-rhino-300 hover:border-purple-300 hover:text-rhino-700'
                    }`}
                    id={`${section.id}-tab`}
                    key={section.id}
                    onClick={() => handleSectionSelection(section.id)}
                    role="tab"
                    type="button"
                  >
                    {section.label}
                  </button>
                );
              })}
            </div>
          </nav>

          {activeSection === 'description' && (
            <section
              aria-labelledby="description-tab"
              id="description-panel"
              role="tabpanel"
            >
              <h2 className="mb-4 font-bold text-rhino-500">{article.title}</h2>
              <p className="leading-7 text-rhino-500">{article.description}</p>
            </section>
          )}

          {activeSection === 'questions' && (
            <section
              aria-labelledby="questions-tab"
              id="questions-panel"
              role="tabpanel"
            >
              <div className="space-y-6">
                {article.questions.map((question) => (
                  <div
                    className="rounded-xl border border-coolGray-200 bg-white p-6 shadow-sm"
                    key={question.question}
                  >
                    <h2 className="mb-4 text-xl font-bold text-rhino-700">
                      {question.question}
                    </h2>
                    <p className="leading-7 text-rhino-500">{question.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeSection === 'products' && (
            <section
              aria-labelledby="products-tab"
              id="products-panel"
              role="tabpanel"
            >
              <h2 className="mb-2 font-bold text-rhino-500">
                Product Suggestions
              </h2>
              <p className="mb-8 text-rhino-300">
                Recommended CLEF products for this skincare topic.
              </p>
              {suggestedProducts.length ? (
                <div className="space-y-4">
                  {suggestedProducts.map((product) => (
                    <Link
                      aria-label={`View ${product.name}`}
                      className="group flex flex-col gap-5 rounded-lg border border-coolGray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 sm:flex-row"
                      href={`/product/${product.handle}`}
                      key={product.id}
                    >
                      <img
                        className="h-40 w-full rounded-md object-contain transition duration-200 group-hover:scale-[1.02] sm:h-28 sm:w-28 sm:flex-shrink-0"
                        src={product.image || 'https://placehold.co/112x112'}
                        alt=""
                      />
                      <div className="flex-1">
                        <h3 className="mb-1 text-lg font-bold text-rhino-700 group-hover:text-purple-600">
                          {product.name}
                        </h3>
                        <p className="mb-2 text-sm font-semibold text-purple-500">
                          {product.priceDisplay}
                        </p>
                        <p className="text-sm leading-6 text-rhino-500">
                          {product.editorialDescription}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm leading-6 text-rhino-500">
                  Product recommendations are currently unavailable.
                </p>
              )}
            </section>
          )}
        </article>
      </div>
    </section>
  );
};

export default ClefInfoSectionProductDetails3;
