import React from 'react';
import type { StorefrontProduct } from '../../lib/medusa-products';

type ProductGalleryProps = {
  product: StorefrontProduct;
};

const ProductGallery: React.FC<ProductGalleryProps> = ({ product }) => {
  const images = React.useMemo(
    () => Array.from(new Set(product.images.length > 0 ? product.images : [product.image].filter(Boolean))),
    [product.image, product.images],
  );
  const [selectedImage, setSelectedImage] = React.useState(images[0] ?? '');

  React.useEffect(() => {
    setSelectedImage(images[0] ?? '');
  }, [images]);

  if (images.length === 0) {
    return (
      <div className="flex min-h-96 items-center justify-center rounded-xl bg-rose-50 p-8 text-sm font-medium text-rhino-400">
        No image
      </div>
    );
  }

  return (
    <div className="flex gap-3 sm:gap-6">
      {images.length > 1 && (
        <div className="w-20 shrink-0 sm:w-24 md:w-28">
          <div className="flex max-h-[520px] flex-col gap-3 overflow-y-auto pr-1 sm:gap-4">
            {images.map((image, index) => {
              const selected = selectedImage === image;

              return (
                <button
                  aria-label={`View ${product.name} image ${index + 1}`}
                  aria-pressed={selected}
                  className={`group relative aspect-square w-full overflow-hidden rounded-lg border bg-white p-1.5 transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#945600] focus:ring-offset-2 ${
                    selected
                      ? 'border-[#945600] opacity-100 shadow-sm'
                      : 'border-transparent opacity-60 hover:border-[#945600]/40 hover:opacity-100'
                  }`}
                  key={image}
                  onClick={() => setSelectedImage(image)}
                  type="button"
                >
                  <img
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="h-full w-full object-contain transition duration-200 group-hover:scale-105"
                    src={image}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="relative flex min-h-96 flex-1 items-center justify-center overflow-hidden rounded-xl bg-rose-50 p-8">
        <img
          alt={product.name}
          className="block max-h-[520px] w-full animate-[clef-product-image-in_220ms_ease-out] object-contain"
          key={selectedImage}
          src={selectedImage}
        />
      </div>
    </div>
  );
};

export default ProductGallery;
