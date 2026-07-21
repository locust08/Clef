export const CART_ID_STORAGE_KEY = 'clef_medusa_cart_id';
export const CUSTOMER_TOKEN_STORAGE_KEY = 'clef_customer_token';

type StoreRegion = {
  id: string;
  currency_code?: string | null;
  countries?: {
    iso_2?: string | null;
  }[];
};

let cachedRegionId: string | null = null;

export const getMedusaBackendUrl = () => {
  const configuredUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL?.trim();

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, '');
  }

  if (process.env.NODE_ENV !== 'production') {
    return 'http://localhost:9000';
  }

  throw new Error('NEXT_PUBLIC_MEDUSA_BACKEND_URL is required in production.');
};

export const getMedusaPublishableKey = () =>
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ?? '';

export const formatMyr = (amount: number) => `RM ${amount.toFixed(2)}`;

export const normaliseMedusaError = (error: unknown) => {
  if (error instanceof Error) {
    if (/fetch failed|failed to fetch|econnrefused|network/i.test(error.message)) {
      return 'Medusa is offline. Start the Medusa backend and try again.';
    }

    if (/publishable/i.test(error.message)) {
      return 'The storefront publishable API key is missing.';
    }

    return error.message;
  }

  return 'The commerce service could not complete this request.';
};

const parseMedusaError = async (response: Response, path: string) => {
  const fallback = `Medusa Store API request failed: ${path}`;

  try {
    const payload = (await response.json()) as {
      message?: string;
      error?: string;
      type?: string;
    };

    return payload.message ?? payload.error ?? payload.type ?? fallback;
  } catch {
    const text = await response.text();

    return text || fallback;
  }
};

export const storeFetch = async <T>(
  path: string,
  init: RequestInit & { authToken?: string | null } = {},
) => {
  const publishableKey = getMedusaPublishableKey();

  if (!publishableKey) {
    throw new Error('NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY is required.');
  }

  const { authToken, ...fetchInit } = init;
  const effectiveAuthToken =
    authToken === undefined ? getStoredCustomerToken() : authToken;
  const headers = new Headers(fetchInit.headers);
  headers.set('x-publishable-api-key', publishableKey);

  if (fetchInit.body && !headers.has('content-type')) {
    headers.set('content-type', 'application/json');
  }

  if (effectiveAuthToken) {
    headers.set('authorization', `Bearer ${effectiveAuthToken}`);
  }

  const response = await fetch(`${getMedusaBackendUrl()}${path}`, {
    ...fetchInit,
    credentials: 'include',
    headers,
  });

  if (!response.ok) {
    throw new Error(await parseMedusaError(response, path));
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
};

export const getStoredCartId = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(CART_ID_STORAGE_KEY);
};

export const setStoredCartId = (cartId: string) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(CART_ID_STORAGE_KEY, cartId);
  }
};

export const clearStoredCartId = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(CART_ID_STORAGE_KEY);
  }
};

export const getStoredCustomerToken = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(CUSTOMER_TOKEN_STORAGE_KEY);
};

export const setStoredCustomerToken = (token: string) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(CUSTOMER_TOKEN_STORAGE_KEY, token);
  }
};

export const clearStoredCustomerToken = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(CUSTOMER_TOKEN_STORAGE_KEY);
  }
};

export const getStoreRegionId = async () => {
  if (cachedRegionId) {
    return cachedRegionId;
  }

  const response = await storeFetch<{ regions?: StoreRegion[] }>(
    '/store/regions?fields=id,currency_code,*countries&limit=100',
  );
  const regions = response.regions ?? [];
  const region =
    regions.find(
      (item) =>
        item.currency_code?.toLowerCase() === 'myr' ||
        item.countries?.some((country) => country.iso_2?.toLowerCase() === 'my'),
    ) ?? regions[0];

  if (!region?.id) {
    throw new Error('No Medusa region found. Create a region in Medusa Admin.');
  }

  cachedRegionId = region.id;

  return cachedRegionId;
};
