import React from 'react';
import Link from 'next/link';
import type { StorefrontProduct } from '../../lib/medusa-products';

type ProductsSectionProductDetails2Props = {
  product: StorefrontProduct | null;
  medusaError?: string | null;
  onAddToCart?: () => void;
};

const ProductsSectionProductDetails2: React.FC<ProductsSectionProductDetails2Props> = ({
  product,
  medusaError = null,
  onAddToCart,
}) => {
  if (medusaError) {
    return (
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 mx-auto">
          <div className="rounded-xl border border-red-100 bg-white p-8 text-center">
            <h1 className="font-heading text-3xl font-semibold text-rhino-700 mb-3">Unable to load product.</h1>
            <p className="text-rhino-400">{medusaError}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 mx-auto">
          <div className="rounded-xl border border-coolGray-200 bg-white p-8 text-center">
            <h1 className="font-heading text-3xl font-semibold text-rhino-700 mb-3">No products found.</h1>
            <Link className="text-purple-500 font-medium hover:text-purple-600 clef-link-highlight" href="/by-skincare">
              Back to shop
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const galleryImages = product.images.length > 0 ? product.images : [product.image].filter(Boolean);

  return (
    <section className="py-12 md:py-24 lg:py-32">
      <div className="container px-4 mx-auto">
        <div className="max-w-xl mx-auto lg:max-w-6xl">
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2">
              <Link className="text-rhino-500 text-sm hover:text-rhino-700 transition duration-200 clef-link-highlight" href="/">
                Homepage
              </Link>
              <span className="text-rhino-300">/</span>
              <Link className="text-rhino-500 text-sm hover:text-rhino-700 transition duration-200 clef-link-highlight" href={product.category ? `/by-${product.category}` : '/by-skincare'}>
                {product.categoryLabel}
              </Link>
              <span className="text-rhino-300">/</span>
              <span className="text-rhino-300 text-sm">{product.name}</span>
            </div>
          </div>

          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
              <div className="flex -mx-3">
                {galleryImages.length > 1 && (
                  <div className="w-32 md:w-40 px-3">
                    <div className="flex flex-col w-full">
                      {galleryImages.slice(0, 4).map((image, index) => (
                        <div className="block opacity-70 mb-3 sm:mb-6" key={`${image}-${index}`}>
                          <img className="block rounded-xl w-full h-14 sm:h-20 md:h-28 object-cover" src={image} alt={product.name} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="w-full px-3">
                  <div className="flex h-full min-h-96 items-center justify-center rounded-xl bg-rose-50 p-8">
                    {product.image ? (
                      <img className="block max-h-[520px] w-full rounded-xl object-contain" src={product.image} alt={product.name} />
                    ) : (
                      <span className="text-sm font-medium text-rhino-400">No image</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 px-4">
              <div className="max-w-lg lg:ml-auto">
                <div className="inline-block mb-4 bg-orange-500 rounded-full px-4 py-1 text-center uppercase text-white text-xs font-bold tracking-widest">
                  In stock
                </div>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-purple-500">{product.categoryLabel}</p>
                <h1 className="mb-4 font-heading text-4xl text-rhino-700 font-semibold">{product.name}</h1>
                {product.description && (
                  <p className="mb-6 text-rhino-400 text-sm font-medium leading-7">{product.description}</p>
                )}

                {product.variants.length > 0 && (
                  <div className="mb-8">
                    <p className="uppercase text-xs font-bold text-rhino-500 mb-3">Variant</p>
                    <div className="flex flex-wrap -mx-1 -mb-1">
                      {product.variants.map((variant, index) => (
                        <div className="w-full sm:w-1/2 px-1 mb-1" key={variant.id}>
                          <div className={`w-full border py-2 px-3 rounded-sm text-center text-sm transition duration-200 ${index === 0 ? 'border-purple-500 text-purple-700' : 'border-coolGray-200 text-coolGray-700'}`}>
                            {variant.title}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <h2 className="text-rhino-700 text-4xl font-semibold font-heading mb-6">{product.priceDisplay}</h2>
                <div className="flex -mx-2 flex-wrap mb-10">
                  <div className="w-full xs:w-5/12 md:w-7/12 px-2 mb-4 xs:mb-0">
                    <button
                      className="block w-full px-3 py-4 rounded-sm text-center text-white text-sm font-medium bg-purple-500 hover:bg-purple-600 transition duration-200 clef-button-primary"
                      onClick={onAddToCart}
                      type="button"
                    >
                      Add to cart
                    </button>
                  </div>
                  <div className="w-full xs:w-3/12 md:w-2/12 px-2">
                    <button className="border border-purple-600 rounded-sm text-purple-500 py-4 px-6 xs:px-1 inline-flex h-full xs:w-full items-center justify-center hover:bg-purple-500 hover:text-white transition duration-200 clef-button-secondary" type="button" aria-label="Add to favourites">
                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={17} viewBox="0 0 16 17" fill="none">
                        <path d="M14.1942 3.24105C13.8537 2.90039 13.4494 2.63015 13.0045 2.44578C12.5595 2.2614 12.0826 2.1665 11.6009 2.1665C11.1192 2.1665 10.6423 2.2614 10.1973 2.44578C9.75236 2.63015 9.34807 2.90039 9.00757 3.24105L8.3009 3.94772L7.59423 3.24105C6.90644 2.55326 5.97359 2.16686 5.0009 2.16686C4.02821 2.16686 3.09536 2.55326 2.40757 3.24105C1.71977 3.92885 1.33337 4.8617 1.33337 5.83439C1.33337 6.80708 1.71977 7.73993 2.40757 8.42772L3.11423 9.13439L8.3009 14.3211L13.4876 9.13439L14.1942 8.42772C14.5349 8.08722 14.8051 7.68293 14.9895 7.23796C15.1739 6.79298 15.2688 6.31605 15.2688 5.83439C15.2688 5.35273 15.1739 4.87579 14.9895 4.43082C14.8051 3.98584 14.5349 3.58156 14.1942 3.24105Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="border border-coolGray-200 rounded-sm">
                  <div className="py-3 px-6 border-b border-coolGray-200">
                    <p className="uppercase text-rhino-500 font-bold text-xs tracking-widest">Description</p>
                    <p className="text-rhino-500 leading-7 text-sm mt-3">{product.description || 'Product details will appear here when they are added in Medusa Admin.'}</p>
                  </div>
                  <div className="py-3 px-6">
                    <p className="uppercase text-rhino-500 font-bold text-xs tracking-widest">Category</p>
                    <p className="text-rhino-500 leading-7 text-sm mt-3">{product.categoryLabel}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSectionProductDetails2;
