import type { StorefrontProduct } from '../../lib/medusa-products';

type ProductInfoProps = {
  product: StorefrontProduct;
  onAddToCart?: () => void;
};

const ProductInfo: React.FC<ProductInfoProps> = ({ product, onAddToCart }) => {
  return (
    <div className="max-w-lg lg:ml-auto">
      <div className="inline-block mb-4 bg-orange-500 rounded-full px-4 py-1 text-center uppercase text-white text-xs font-bold tracking-widest">
        In stock
      </div>
      <h1 className="mb-4 font-heading text-4xl text-rhino-700 font-semibold">{product.name}</h1>
      <p className="mb-6 text-rhino-400 text-sm font-medium">{product.description}</p>
      <h2 className="text-rhino-700 text-4xl font-semibold font-heading mb-6">{product.priceDisplay}</h2>
      <button
        className="block w-full px-3 py-4 rounded-sm text-center text-white text-sm font-medium bg-purple-500 hover:bg-purple-600 transition duration-200 clef-button-primary"
        onClick={onAddToCart}
        type="button"
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductInfo;
