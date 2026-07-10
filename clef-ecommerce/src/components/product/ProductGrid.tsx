import type { StorefrontProduct } from '../../lib/medusa-products';
import ProductCard from './ProductCard';

type ProductGridProps = {
  products: StorefrontProduct[];
  emptyMessage?: string;
};

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  emptyMessage = 'No products found.',
}) => {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-coolGray-200 bg-white p-8 text-center">
        <h2 className="font-heading text-2xl font-semibold text-rhino-700 mb-2">{emptyMessage}</h2>
        <p className="text-rhino-400 text-sm">Try another category or search term.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap -mx-4">
      {products.map((product) => (
        <div className="w-full xs:w-1/2 lg:w-1/4 px-4" key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
