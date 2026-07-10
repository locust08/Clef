import ProductGrid from '../product/ProductGrid';
import type { StorefrontProduct } from '../../lib/medusa-products';

type FavouriteListProps = {
  products?: StorefrontProduct[];
};

const FavouriteList: React.FC<FavouriteListProps> = ({ products = [] }) => (
  <section className="container mx-auto px-4 py-12">
    <ProductGrid products={products} emptyMessage="No favourite products yet" />
  </section>
);

export default FavouriteList;
