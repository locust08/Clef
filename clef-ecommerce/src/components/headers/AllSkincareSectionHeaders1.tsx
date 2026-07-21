import React from 'react';
import type { StorefrontProduct } from '../../lib/medusa-products';

const HERO_BACKGROUND =
  'https://static.shuffle.dev/uploads/files/6f/6fb48a03fbf8bf9e36f18c917c673f67c9eac42d/5cb097d9-0f1d-4b51-9ad3-3cfab9fcfeec.png';

type AllSkincareSectionHeaders1Props = {
  backgroundImage?: string;
  title?: string;
  products?: StorefrontProduct[];
  primaryHref?: string;
  primaryLabel?: string;
};

const AllSkincareSectionHeaders1: React.FC<AllSkincareSectionHeaders1Props> = ({
  backgroundImage = HERO_BACKGROUND,
  title = 'Take Care Of Your Performance Every Day.',
  products = [],
  primaryHref = '/shop/skincare',
  primaryLabel = 'Start Buying',
}) => {
  const featuredProducts = products
    .filter((product) => product.handle && product.handle !== '#' && product.image)
    .slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-[#ead1aa]">
      <div className="relative min-h-[760px] md:min-h-[620px]">
        <img
          className="absolute inset-0 h-full w-full object-cover object-[58%_center] md:object-[62%_center]"
          src={backgroundImage}
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-black/5 md:bg-gradient-to-r md:from-black/15 md:via-transparent md:to-transparent" />
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#e7c696]/70 via-[#e7c696]/20 to-transparent" />

        <div className="relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex min-h-[760px] max-w-[740px] flex-col pt-20 pb-10 md:min-h-[620px] md:pt-28 lg:-ml-4 lg:pt-24">
              <div className="max-w-[660px] text-center">
                <h1
                  className="mx-auto max-w-[360px] font-heading text-4xl font-semibold leading-[1.08] drop-shadow-sm sm:max-w-[620px] sm:text-5xl md:max-w-[660px] md:text-[56px] lg:text-[62px]"
                  style={{ color: '#945600' }}
                >
                  {title}
                </h1>
                <div className="mt-8 flex justify-center">
                  <a
                    className="inline-flex h-12 min-w-[150px] items-center justify-center rounded bg-[#fcfcfc] px-6 text-sm font-bold text-[#945600] shadow-sm ring-1 ring-black/5 transition duration-200 hover:bg-white hover:text-[#7c4800] focus:outline-none focus:ring-2 focus:ring-[#945600] focus:ring-offset-2 focus:ring-offset-white"
                    href={primaryHref}
                  >
                    {primaryLabel}
                  </a>
                </div>
              </div>

              {featuredProducts.length > 0 && (
                <div className="mt-12 md:mt-16">
                  <div className="grid max-w-[660px] grid-cols-3 gap-4 sm:gap-5">
                    {featuredProducts.map((product) => (
                      <a
                        className="group flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-white/95 p-3 shadow-sm ring-1 ring-black/5 transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#945600]"
                        href={`/product/${product.handle}`}
                        aria-label={`Open ${product.name}`}
                        key={product.id}
                      >
                        <img
                          className="h-full w-full object-contain transition duration-200 group-hover:scale-105"
                          src={product.image}
                          alt={product.name}
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllSkincareSectionHeaders1;
