import { useFavourites } from '../../context/FavouritesContext';
import ProductGrid from '../product/ProductGrid';

const FavouriteList: React.FC = () => {
  const {
    clearFavourites,
    favouriteProducts,
    favouritesError,
    isFavouritesLoading,
  } = useFavourites();

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-rhino-700">
            Your Favourites
          </h1>
          <p className="text-rhino-300">
            {favouriteProducts.length} saved item
            {favouriteProducts.length === 1 ? '' : 's'}
          </p>
        </div>
        {favouriteProducts.length > 0 && (
          <button
            className="rounded-sm border border-coolGray-200 px-4 py-3 text-sm font-medium text-rhino-700 transition duration-200 hover:bg-coolGray-100 clef-button-secondary"
            onClick={() => {
              void clearFavourites();
            }}
            type="button"
          >
            Clear all
          </button>
        )}
      </div>

      {isFavouritesLoading ? (
        <div className="rounded-xl border border-coolGray-200 bg-white p-8 text-center text-rhino-400">
          Loading favourites...
        </div>
      ) : favouritesError ? (
        <div className="rounded-xl border border-red-100 bg-white p-8 text-center">
          <h2 className="mb-2 font-heading text-2xl font-semibold text-rhino-700">
            Unable to load favourites
          </h2>
          <p className="text-sm text-rhino-400">{favouritesError}</p>
        </div>
      ) : (
        <ProductGrid
          emptyMessage="No favourite products yet"
          products={favouriteProducts}
        />
      )}
    </section>
  );
};

export default FavouriteList;
