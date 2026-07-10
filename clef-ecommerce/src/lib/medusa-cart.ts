const CART_ID_STORAGE_KEY = 'clef_medusa_cart_id';

type StoreRegion = {
  id: string;
  currency_code?: string | null;
  countries?: {
    iso_2?: string | null;
  }[];
};

type StoreCartResponse = {
  cart?: {
    id: string;
  };
};

const getBackendUrl = () =>
  (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000').replace(
    /\/$/,
    '',
  );

const getPublishableKey = () =>
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ?? '';

const storeFetch = async <T>(path: string, init: RequestInit = {}) => {
  const publishableKey = getPublishableKey();

  if (!publishableKey) {
    throw new Error('NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY is required.');
  }

  const response = await fetch(`${getBackendUrl()}${path}`, {
    ...init,
    headers: {
      'content-type': 'application/json',
      'x-publishable-api-key': publishableKey,
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Medusa Store API request failed: ${path}`);
  }

  return response.json() as Promise<T>;
};

export const getMedusaCartId = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(CART_ID_STORAGE_KEY);
};

const setMedusaCartId = (cartId: string) => {
  window.localStorage.setItem(CART_ID_STORAGE_KEY, cartId);
};

const getDefaultRegionId = async () => {
  const response = await storeFetch<{ regions?: StoreRegion[] }>(
    '/store/regions?fields=id,currency_code,*countries&limit=100',
  );
  const region =
    response.regions?.find(
      (item) =>
        item.currency_code?.toLowerCase() === 'myr' ||
        item.countries?.some(
          (country) => country.iso_2?.toLowerCase() === 'my',
        ),
    ) ?? response.regions?.[0];
  const regionId = region?.id;

  if (!regionId) {
    throw new Error('No Medusa region found for cart creation.');
  }

  return regionId;
};

const createCart = async () => {
  const regionId = await getDefaultRegionId();
  const response = await storeFetch<StoreCartResponse>('/store/carts', {
    method: 'POST',
    body: JSON.stringify({
      region_id: regionId,
    }),
  });

  if (!response.cart?.id) {
    throw new Error('Medusa did not return a cart ID.');
  }

  setMedusaCartId(response.cart.id);

  return response.cart.id;
};

const getOrCreateCartId = async () => getMedusaCartId() ?? createCart();

export const addMedusaLineItem = async ({
  variantId,
  quantity,
  metadata,
}: {
  variantId: string;
  quantity: number;
  metadata?: Record<string, string>;
}) => {
  const cartId = await getOrCreateCartId();

  return storeFetch<StoreCartResponse>(`/store/carts/${cartId}/line-items`, {
    method: 'POST',
    body: JSON.stringify({
      variant_id: variantId,
      quantity,
      metadata,
    }),
  });
};
