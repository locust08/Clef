import {
  clearStoredCartId,
  formatMyr,
  getStoreRegionId,
  getStoredCartId,
  normaliseMedusaError,
  setStoredCartId,
  storeFetch,
} from './medusa-store';

type LooseCartLine = {
  id: string;
  quantity?: number | null;
  unit_price?: number | null;
  total?: number | null;
  title?: string | null;
  variant?: {
    id?: string | null;
    title?: string | null;
    product?: {
      id?: string | null;
      title?: string | null;
      handle?: string | null;
      thumbnail?: string | null;
    } | null;
  } | null;
  thumbnail?: string | null;
  metadata?: Record<string, unknown> | null;
};

type LooseCart = {
  id: string;
  email?: string | null;
  completed_at?: string | null;
  items?: LooseCartLine[];
  currency_code?: string | null;
  subtotal?: number | null;
  shipping_total?: number | null;
  discount_total?: number | null;
  tax_total?: number | null;
  total?: number | null;
};

type StoreCartResponse = {
  cart?: LooseCart;
};

export type CartLine = {
  id: string;
  variantId: string | null;
  productId: string | null;
  handle: string;
  title: string;
  variantTitle: string;
  image: string;
  quantity: number;
  unitPrice: number;
  unitPriceDisplay: string;
  lineTotal: number;
  lineTotalDisplay: string;
  metadata?: Record<string, unknown> | null;
};

export type StorefrontCart = {
  id: string;
  email: string | null;
  items: CartLine[];
  subtotal: number;
  subtotalDisplay: string;
  shippingTotal: number;
  shippingTotalDisplay: string;
  discountTotal: number;
  discountTotalDisplay: string;
  taxTotal: number;
  taxTotalDisplay: string;
  total: number;
  totalDisplay: string;
};

const normalizeAmount = (amount?: number | null) =>
  typeof amount === 'number' && Number.isFinite(amount) ? amount : 0;

const mapCartLine = (line: LooseCartLine): CartLine => {
  const unitPrice = normalizeAmount(line.unit_price);
  const quantity = Math.max(1, line.quantity ?? 1);
  const lineTotal = normalizeAmount(line.total) || unitPrice * quantity;
  const product = line.variant?.product;

  return {
    id: line.id,
    variantId: line.variant?.id ?? null,
    productId: product?.id ?? null,
    handle: product?.handle ?? '',
    title: line.title ?? product?.title ?? 'Product',
    variantTitle: line.variant?.title ?? 'Default variant',
    image: line.thumbnail ?? product?.thumbnail ?? '',
    quantity,
    unitPrice,
    unitPriceDisplay: formatMyr(unitPrice),
    lineTotal,
    lineTotalDisplay: formatMyr(lineTotal),
    metadata: line.metadata ?? null,
  };
};

const mapCart = (cart: LooseCart): StorefrontCart => {
  const subtotal = normalizeAmount(cart.subtotal);
  const shippingTotal = normalizeAmount(cart.shipping_total);
  const discountTotal = normalizeAmount(cart.discount_total);
  const taxTotal = normalizeAmount(cart.tax_total);
  const total =
    normalizeAmount(cart.total) || subtotal + shippingTotal + taxTotal - discountTotal;

  return {
    id: cart.id,
    email: cart.email ?? null,
    items: (cart.items ?? []).map(mapCartLine),
    subtotal,
    subtotalDisplay: formatMyr(subtotal),
    shippingTotal,
    shippingTotalDisplay: shippingTotal ? formatMyr(shippingTotal) : 'Calculated at checkout',
    discountTotal,
    discountTotalDisplay: discountTotal ? `-${formatMyr(discountTotal)}` : formatMyr(0),
    taxTotal,
    taxTotalDisplay: taxTotal ? formatMyr(taxTotal) : 'Calculated at checkout',
    total,
    totalDisplay: formatMyr(total),
  };
};

export const retrieveCart = async (cartId: string) => {
  const response = await storeFetch<StoreCartResponse>(
    `/store/carts/${cartId}?fields=*items,*items.variant,*items.variant.product`,
  );

  if (!response.cart?.id || response.cart.completed_at) {
    clearStoredCartId();
    throw new Error('This cart is no longer active. A new cart will be created.');
  }

  return mapCart(response.cart);
};

export const getActiveCart = async () => {
  const cartId = getStoredCartId();

  if (!cartId) {
    return null;
  }

  try {
    return await retrieveCart(cartId);
  } catch {
    clearStoredCartId();

    return null;
  }
};

export const createCart = async () => {
  const regionId = await getStoreRegionId();
  const response = await storeFetch<StoreCartResponse>('/store/carts', {
    method: 'POST',
    body: JSON.stringify({
      region_id: regionId,
    }),
  });

  if (!response.cart?.id) {
    throw new Error('Medusa did not return a cart ID.');
  }

  setStoredCartId(response.cart.id);

  return mapCart(response.cart);
};

export const getOrCreateCart = async () => {
  const activeCart = await getActiveCart();

  if (activeCart) {
    return activeCart;
  }

  return createCart();
};

export const addMedusaLineItem = async ({
  variantId,
  quantity,
  metadata,
}: {
  variantId: string;
  quantity: number;
  metadata?: Record<string, string>;
}) => {
  const cart = await getOrCreateCart();
  const response = await storeFetch<StoreCartResponse>(
    `/store/carts/${cart.id}/line-items`,
    {
      method: 'POST',
      body: JSON.stringify({
        variant_id: variantId,
        quantity,
        metadata,
      }),
    },
  );

  if (!response.cart) {
    throw new Error('Medusa did not return the updated cart.');
  }

  return mapCart(response.cart);
};

export const updateMedusaLineItem = async (lineItemId: string, quantity: number) => {
  const cartId = getStoredCartId();

  if (!cartId) {
    throw new Error('Your cart has expired. Add the product again.');
  }

  const response = await storeFetch<StoreCartResponse>(
    `/store/carts/${cartId}/line-items/${lineItemId}`,
    {
      method: 'POST',
      body: JSON.stringify({
        quantity: Math.max(1, quantity),
      }),
    },
  );

  if (!response.cart) {
    throw new Error('Medusa did not return the updated cart.');
  }

  return mapCart(response.cart);
};

export const removeMedusaLineItem = async (lineItemId: string) => {
  const cartId = getStoredCartId();

  if (!cartId) {
    throw new Error('Your cart has expired.');
  }

  const response = await storeFetch<StoreCartResponse>(
    `/store/carts/${cartId}/line-items/${lineItemId}`,
    {
      method: 'DELETE',
    },
  );

  if (!response.cart) {
    return getActiveCart();
  }

  return mapCart(response.cart);
};

export const getCartErrorMessage = (error: unknown) => normaliseMedusaError(error);
