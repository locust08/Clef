import type { StorefrontProduct } from '../../lib/medusa-products';

type ProductGalleryProps = {
  product: StorefrontProduct;
};

const ProductGallery: React.FC<ProductGalleryProps> = ({ product }) => {
  const images = product.images.length > 0 ? product.images : [product.image].filter(Boolean);

  return (
    <div className="flex -mx-3">
      {images.length > 1 && (
        <div className="w-32 md:w-40 px-3">
          <div className="flex flex-col w-full">
            {images.slice(0, 4).map((image) => (
              <button className="block opacity-50 hover:opacity-100 mb-3 sm:mb-6 clef-icon-button" key={image} type="button">
                <img className="block rounded-xl w-full h-14 sm:h-20 md:h-28 object-cover" src={image} alt={product.name} />
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="w-auto px-3">
        {product.image ? (
          <img className="block h-full rounded-xl object-cover w-full" src={product.image} alt={product.name} />
        ) : (
          <div className="flex h-96 items-center justify-center rounded-xl bg-rose-50 px-12 text-sm font-medium text-rhino-400">No image</div>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
