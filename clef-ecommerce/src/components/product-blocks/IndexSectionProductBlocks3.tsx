import React from 'react';
import type { StorefrontProduct } from '../../lib/medusa-products';

type IndexSectionProductBlocks3Props = {
  products: StorefrontProduct[];
  badgeLabel?: string;
  ctaHref?: string;
  ctaLabel?: string;
  eyebrow?: string;
  hideWhenEmpty?: boolean;
  title?: string;
};

const IndexSectionProductBlocks3: React.FC<IndexSectionProductBlocks3Props> = ({
  badgeLabel = 'Best',
  ctaHref = '/shop/skincare',
  ctaLabel = 'Show more',
  eyebrow = 'CLEF favourites',
  hideWhenEmpty = false,
  products,
  title = 'Best Seller',
}) => {
    if (hideWhenEmpty && products.length === 0) {
      return null;
    }

    return (
        <section className="py-12 md:py-20 lg:py-28">
  <div className="container px-4 mx-auto">
    <div className="max-w-xs mx-auto md:max-w-7xl">
      <div className="mb-12 text-center best-seller-heading">
        <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-purple-500">{eyebrow}</span>
        <h2 className="text-4xl md:text-5xl font-heading font-semibold text-rhino-600 tracking-normal">{title}</h2>
      </div>
      <div className="flex flex-wrap -mx-4 -mb-8">
        {products.map((product, index) => (
          <div
            className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8 best-seller-card"
            key={product.id}
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <a className="relative group block max-w-xs mx-auto md:max-w-none bg-coolGray-100 rounded-xl overflow-hidden clef-link-highlight transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-rhino-100" href={`/product/${product.handle}`}>
              <div className="flex items-center justify-center h-80 overflow-hidden">
                {product.image ? (
                  <img className="block w-full h-80 rounded-xl object-contain p-8 transition-transform duration-500 ease-out group-hover:scale-105" src={product.image} alt={product.name} />
                ) : (
                  <span className="text-sm font-medium text-rhino-300">No image</span>
                )}
              </div>
              <div className="relative py-8 text-center">
                <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inline-block py-1 px-3 mr-2 text-2xs text-white font-bold bg-orange-500 uppercase rounded-full group-hover:bg-purple-500 group-hover:scale-105 transition duration-200">{badgeLabel}</span>
                <span className="block text-xl font-semibold text-rhino-800 group-hover:text-purple-500 transition duration-200">{product.name}</span>
                <span className="block text-base text-rhino-300 group-hover:text-purple-500 transition duration-200">{product.priceDisplay}</span>
              </div>
            </a>
          </div>
        ))}
      </div>
      {products.length ? (
        <div className="mt-14 text-center best-seller-cta">
          <a className="inline-flex h-12 py-2 px-6 items-center justify-center text-sm font-medium text-purple-500 hover:text-white bg-white border border-purple-500 rounded-sm hover:bg-purple-500 transition duration-200 clef-button-secondary" href={ctaHref}>{ctaLabel}</a>
        </div>
      ) : null}
    </div>
  </div>
  <style jsx>{`
    .best-seller-heading,
    .best-seller-cta {
      animation: sectionFadeUp 560ms ease-out both;
    }

    .best-seller-card {
      animation: sectionFadeUp 640ms ease-out both;
    }

    @keyframes sectionFadeUp {
      from {
        opacity: 0;
        transform: translateY(18px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .best-seller-heading,
      .best-seller-card,
      .best-seller-cta {
        animation: none;
      }
    }
  `}</style>
</section>


    );
};

export default IndexSectionProductBlocks3;
