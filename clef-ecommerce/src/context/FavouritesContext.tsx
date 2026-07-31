import React from 'react';
import {
  getProductsByIds,
  type StorefrontProduct,
} from '../lib/medusa-products';
import { useCustomer } from './CustomerContext';

const FAVOURITES_STORAGE_KEY = 'clef_guest_favourite_product_ids';

type FavouritesContextValue = {
  favouriteIds: string[];
  favouriteProducts: StorefrontProduct[];
  isFavouritesLoading: boolean;
  favouritesError: string | null;
  isFavourite: (productId: string) => boolean;
  toggleFavourite: (productId: string) => Promise<void>;
  removeFavourite: (productId: string) => Promise<void>;
  clearFavourites: () => Promise<void>;
  refreshFavourites: () => Promise<void>;
};

const FavouritesContext = React.createContext<FavouritesContextValue | null>(null);

const readGuestIds = () => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const parsed = JSON.parse(
      window.localStorage.getItem(FAVOURITES_STORAGE_KEY) ?? '[]',
    ) as unknown;

    return Array.isArray(parsed)
      ? parsed.filter((value): value is string => typeof value === 'string')
      : [];
  } catch {
    window.localStorage.removeItem(FAVOURITES_STORAGE_KEY);

    return [];
  }
};

const writeGuestIds = (ids: string[]) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(
      FAVOURITES_STORAGE_KEY,
      JSON.stringify(Array.from(new Set(ids))),
    );
  }
};

const fetchUserFavouriteIds = async (token: string) => {
  const response = await fetch('/api/favourites', {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const payload = (await response.json()) as { productIds?: string[] };

  return payload.productIds ?? [];
};

const saveUserFavouriteIds = async (token: string, productIds: string[]) => {
  const response = await fetch('/api/favourites', {
    body: JSON.stringify({ productIds }),
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    method: 'PUT',
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }
};

export const FavouritesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { token } = useCustomer();
  const [favouriteIds, setFavouriteIds] = React.useState<string[]>([]);
  const [favouriteProducts, setFavouriteProducts] = React.useState<StorefrontProduct[]>([]);
  const [isFavouritesLoading, setIsFavouritesLoading] = React.useState(true);
  const [favouritesError, setFavouritesError] = React.useState<string | null>(null);
  const hasMergedGuestIds = React.useRef(false);

  const hydrateProducts = React.useCallback(async (ids: string[]) => {
    if (ids.length === 0) {
      setFavouriteProducts([]);
      return;
    }

    const products = await getProductsByIds(ids);
    const orderedProducts = ids
      .map((id) => products.find((product) => product.id === id))
      .filter((product): product is StorefrontProduct => Boolean(product));
    setFavouriteProducts(orderedProducts);
  }, []);

  const setIds = React.useCallback(
    async (nextIds: string[]) => {
      const uniqueIds = Array.from(new Set(nextIds.filter(Boolean)));
      setFavouriteIds(uniqueIds);

      if (token) {
        await saveUserFavouriteIds(token, uniqueIds);
      } else {
        writeGuestIds(uniqueIds);
      }

      await hydrateProducts(uniqueIds);
    },
    [hydrateProducts, token],
  );

  const refreshFavourites = React.useCallback(async () => {
    setIsFavouritesLoading(true);
    setFavouritesError(null);

    try {
      let ids = readGuestIds();

      if (token) {
        const serverIds = await fetchUserFavouriteIds(token);
        ids = Array.from(new Set([...serverIds, ...ids]));

        if (!hasMergedGuestIds.current && readGuestIds().length > 0) {
          await saveUserFavouriteIds(token, ids);
          writeGuestIds([]);
          hasMergedGuestIds.current = true;
        }
      } else {
        hasMergedGuestIds.current = false;
      }

      setFavouriteIds(ids);
      await hydrateProducts(ids);
    } catch (error) {
      setFavouritesError(
        error instanceof Error ? error.message : 'Unable to load favourites.',
      );
    } finally {
      setIsFavouritesLoading(false);
    }
  }, [hydrateProducts, token]);

  React.useEffect(() => {
    void refreshFavourites();
  }, [refreshFavourites]);

  const removeFavourite = React.useCallback(
    async (productId: string) => {
      await setIds(favouriteIds.filter((id) => id !== productId));
    },
    [favouriteIds, setIds],
  );

  const value = React.useMemo(
    () => ({
      favouriteIds,
      favouriteProducts,
      isFavouritesLoading,
      favouritesError,
      isFavourite: (productId: string) => favouriteIds.includes(productId),
      toggleFavourite: async (productId: string) => {
        await setIds(
          favouriteIds.includes(productId)
            ? favouriteIds.filter((id) => id !== productId)
            : [...favouriteIds, productId],
        );
      },
      removeFavourite,
      clearFavourites: async () => setIds([]),
      refreshFavourites,
    }),
    [
      favouriteIds,
      favouriteProducts,
      favouritesError,
      isFavouritesLoading,
      refreshFavourites,
      removeFavourite,
      setIds,
    ],
  );

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};

export function useFavourites() {
  const context = React.useContext(FavouritesContext);

  if (!context) {
    throw new Error('useFavourites must be used inside FavouritesProvider.');
  }

  return context;
}
