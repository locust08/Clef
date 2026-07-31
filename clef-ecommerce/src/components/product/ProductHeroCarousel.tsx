import React from 'react';
import type { StorefrontProduct } from '../../lib/medusa-products';

type ProductHeroCarouselProps = {
  products: StorefrontProduct[];
  eyebrow: string;
  fallbackTitle: string;
  fallbackDescription?: string;
  fallbackImage?: string;
  fallbackImageAlt?: string;
  fallbackHref: string;
  className?: string;
};

type ProductHeroSlide = {
  key: string;
  title: string;
  description: string;
  priceDisplay?: string;
  image: string;
  imageAlt: string;
  href: string;
  ctaLabel: string;
};

const ChevronLeft = () => (
  <svg
    aria-hidden="true"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 18L9 12L15 6"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const ChevronRight = () => (
  <svg
    aria-hidden="true"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 18L15 12L9 6"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const productToSlide = (
  product: StorefrontProduct,
  fallbackDescription: string,
): ProductHeroSlide => ({
  key: product.id,
  title: product.name,
  description: product.description || fallbackDescription,
  priceDisplay: product.priceDisplay,
  image: product.image,
  imageAlt: product.name,
  href: `/product/${product.handle}`,
  ctaLabel: 'View Product',
});

const ProductHeroCarousel: React.FC<ProductHeroCarouselProps> = ({
  products,
  eyebrow,
  fallbackTitle,
  fallbackDescription = 'Discover curated CLEF essentials for your routine.',
  fallbackImage = '',
  fallbackImageAlt = '',
  fallbackHref,
  className = '',
}) => {
  const slides =
    products.length > 0
      ? products.map((product) => productToSlide(product, fallbackDescription))
      : [
          {
            key: 'category-fallback',
            title: fallbackTitle,
            description: fallbackDescription,
            image: fallbackImage,
            imageAlt: fallbackImageAlt,
            href: fallbackHref,
            ctaLabel: 'Browse Collection',
          },
        ];
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    setActiveIndex(0);
  }, [products]);

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  return (
    <div className={`container mx-auto px-4 ${className}`.trim()}>
      <div className="relative mx-auto max-w-6xl">
        <button
          aria-label="Show previous product"
          className="group absolute -left-5 top-1/2 z-20 hidden h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full bg-white text-rhino-700 shadow-lg transition duration-200 hover:bg-purple-500 hover:text-white focus:bg-purple-500 focus:text-white sm:flex clef-icon-button"
          onClick={goToPrevious}
          type="button"
        >
          <ChevronLeft />
        </button>
        <button
          aria-label="Show next product"
          className="group absolute -right-5 top-1/2 z-20 hidden h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full bg-white text-rhino-700 shadow-lg transition duration-200 hover:bg-purple-500 hover:text-white focus:bg-purple-500 focus:text-white sm:flex clef-icon-button"
          onClick={goToNext}
          type="button"
        >
          <ChevronRight />
        </button>

        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {slides.map((slide) => (
              <article
                className="flex min-h-[440px] w-full flex-shrink-0 flex-col overflow-hidden rounded-xl bg-[#F7F1EA] lg:grid lg:grid-cols-[0.9fr_1.1fr]"
                key={slide.key}
              >
                <div className="flex flex-col items-center justify-center px-8 py-12 text-center sm:px-16 lg:px-20 xl:px-24">
                  <div className="mb-7 inline-flex w-fit rounded-full bg-white px-4 py-1 text-xs font-bold uppercase tracking-widest text-rhino-700">
                    {eyebrow}
                  </div>
                  <a className="clef-link-highlight" href={slide.href}>
                    <h2
                      className="mb-5 max-w-md font-heading text-3xl font-semibold leading-[1.12] sm:text-4xl lg:text-[2.75rem]"
                      style={{ color: '#6B3900' }}
                    >
                      {slide.title}
                    </h2>
                  </a>
                  <p className="mb-7 max-w-sm text-sm font-medium leading-7 text-rhino-500">
                    {slide.description}
                  </p>
                  {slide.priceDisplay ? (
                    <p
                      className="mb-8 font-heading text-3xl font-semibold leading-none sm:text-4xl"
                      style={{ color: '#855400' }}
                    >
                      {slide.priceDisplay}
                    </p>
                  ) : null}
                  <a
                    className="inline-flex w-fit items-center justify-center rounded-sm bg-purple-500 px-6 py-3 text-center text-sm font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-[#6B3900] focus:ring-offset-2 clef-button-primary"
                    href={slide.href}
                  >
                    {slide.ctaLabel}
                  </a>
                </div>
                <div className="flex min-h-[280px] items-center justify-center bg-white/40 px-8 py-10 lg:min-h-[440px]">
                  {slide.image ? (
                    <a
                      aria-label={`View ${slide.title}`}
                      className="group flex h-full w-full items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#6B3900] focus:ring-offset-4"
                      href={slide.href}
                    >
                      <img
                        alt={slide.imageAlt}
                        className="max-h-[420px] w-full object-contain transition duration-300 ease-out group-hover:scale-[1.025]"
                        src={slide.image}
                      />
                    </a>
                  ) : (
                    <span className="text-sm font-medium text-rhino-400">
                      Product image coming soon
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-4 sm:hidden">
          <button
            aria-label="Show previous product"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-rhino-700 shadow transition duration-200 hover:bg-purple-500 hover:text-white focus:bg-purple-500 focus:text-white clef-icon-button"
            onClick={goToPrevious}
            type="button"
          >
            <ChevronLeft />
          </button>
          <button
            aria-label="Show next product"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-rhino-700 shadow transition duration-200 hover:bg-purple-500 hover:text-white focus:bg-purple-500 focus:text-white clef-icon-button"
            onClick={goToNext}
            type="button"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductHeroCarousel;
