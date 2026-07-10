import Link from 'next/link';
import type { StorefrontProduct } from '../../lib/medusa-products';

type ProductCardProps = {
  product: StorefrontProduct;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link className="block mb-10 group clef-link-highlight" href={`/product/${product.handle}`}>
      <div className="w-full aspect-square bg-rose-50 rounded-xl mb-3 flex items-center justify-center relative flex-1 overflow-hidden p-8">
        {(product.isNewLaunch || product.isBestSeller) && (
          <div className="absolute left-5 top-5 z-10 uppercase bg-orange-500 py-1 px-3 rounded-full text-white text-xs font-bold text-center">
            {product.isNewLaunch ? 'New' : 'Best'}
          </div>
        )}
        {product.image ? (
          <img className="h-full w-full object-contain" src={product.image} alt={product.name} />
        ) : (
          <span className="text-sm font-medium text-rhino-400">No image</span>
        )}
      </div>
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-purple-500">{product.categoryLabel}</p>
      <p className="text-slate-800">{product.name}</p>
      <p className="text-slate-400">{product.priceDisplay}</p>
    </Link>
  );
};

export default ProductCard;
