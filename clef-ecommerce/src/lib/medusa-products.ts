import { formatMyr, getStoreRegionId, normaliseMedusaError, storeFetch } from './medusa-store';

type LooseCategory = {
  id: string;
  name?: string | null;
  handle?: string | null;
  parent_category_id?: string | null;
  parent_category?: LooseCategory | null;
  category_children?: LooseCategory[];
};

type LooseImage = {
  id?: string;
  url?: string | null;
};

type LooseTag = {
  id?: string;
  value?: string | null;
};

type LoosePrice = {
  calculated_amount?: number | null;
  original_amount?: number | null;
  amount?: number | null;
  currency_code?: string | null;
};

type LooseVariant = {
  id: string;
  title?: string | null;
  sku?: string | null;
  calculated_price?: LoosePrice | null;
  prices?: LoosePrice[];
};

type LooseProduct = {
  id: string;
  title?: string | null;
  handle?: string | null;
  description?: string | null;
  thumbnail?: string | null;
  metadata?: Record<string, unknown> | null;
  images?: LooseImage[];
  variants?: LooseVariant[];
  categories?: LooseCategory[];
  tags?: LooseTag[];
};

export type StorefrontCategory = {
  id: string;
  name: string;
  handle: string;
  parentCategoryId: string | null;
};

export type StorefrontProduct = {
  id: string;
  handle: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  compareAtPrice?: number | null;
  priceDisplay: string;
  compareAtPriceDisplay?: string | null;
  image: string;
  images: string[];
  category: string;
  categoryLabel: string;
  subcategory: string | null;
  tags: string[];
  variants: {
    id: string;
    title: string;
    sku: string | null;
    price: number;
    priceDisplay: string;
    compareAtPrice?: number | null;
    compareAtPriceDisplay?: string | null;
  }[];
  metadata?: Record<string, unknown> | null;
  isBestSeller?: boolean;
  isNewLaunch?: boolean;
};

type CategoryProductOptions = {
  includeDescendants?: boolean;
};

const PRODUCT_FIELDS = [
  'id',
  'title',
  'handle',
  'description',
  'thumbnail',
  '*images',
  '*variants',
  '*variants.calculated_price',
  '*variants.prices',
  '*categories',
  '*tags',
  'metadata',
].join(',');

const CATEGORY_FIELDS = [
  'id',
  'name',
  'handle',
  'parent_category_id',
  '*parent_category',
  '*category_children',
].join(',');

const normalizeMoneyAmount = (amount: number, currencyCode: string) => {
  return amount;
};

const formatMoney = (amount: number, currencyCode = 'usd') =>
  currencyCode.toLowerCase() === 'myr'
    ? formatMyr(amount)
    : new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode.toUpperCase(),
      }).format(amount);

const getCompareAtPriceFromMetadata = (
  metadata: Record<string, unknown> | null | undefined,
) => {
  const value =
    metadata?.compare_at_price ??
    metadata?.compareAtPrice ??
    metadata?.original_price ??
    metadata?.originalPrice;
  const amount = typeof value === 'string' ? Number(value) : value;

  return typeof amount === 'number' && Number.isFinite(amount) ? amount : null;
};

const getVariantPrice = (variant?: LooseVariant) => {
  const price =
    variant?.calculated_price?.calculated_amount ??
    variant?.calculated_price?.amount ??
    variant?.prices?.[0]?.amount ??
    null;

  if (price === null || price === undefined) {
    return {
      amount: 0,
      display: 'Price unavailable',
      compareAtAmount: null,
      compareAtDisplay: null,
    };
  }

  const currencyCode =
    variant?.calculated_price?.currency_code ??
    variant?.prices?.[0]?.currency_code ??
    'usd';
  const amount = normalizeMoneyAmount(price, currencyCode);
  const originalAmount =
    variant?.calculated_price?.original_amount &&
    variant.calculated_price.original_amount > price
      ? normalizeMoneyAmount(
          variant.calculated_price.original_amount,
          currencyCode,
        )
      : null;

  return {
    amount,
    display: formatMoney(amount, currencyCode),
    compareAtAmount: originalAmount,
    compareAtDisplay: originalAmount
      ? formatMoney(originalAmount, currencyCode)
      : null,
  };
};

const warnMedusaDevelopment = (message: string, error?: unknown) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn(`[Medusa] ${message}`, error);
  }
};

const titleFromHandle = (handle: string) =>
  handle
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const mapCategory = (category: LooseCategory): StorefrontCategory | null => {
  if (!category.id || !category.handle) {
    return null;
  }

  return {
    id: category.id,
    name: category.name ?? titleFromHandle(category.handle),
    handle: category.handle,
    parentCategoryId:
      category.parent_category_id ?? category.parent_category?.id ?? null,
  };
};

export const mapMedusaProduct = (product: LooseProduct): StorefrontProduct | null => {
  if (!product.id || !product.handle) {
    return null;
  }

  const firstVariant = product.variants?.[0];
  const price = getVariantPrice(firstVariant);
  const metadataCompareAt = getCompareAtPriceFromMetadata(product.metadata);
  const currencyCode =
    firstVariant?.calculated_price?.currency_code ??
    firstVariant?.prices?.[0]?.currency_code ??
    'myr';
  const compareAtPrice =
    price.compareAtAmount ??
    (metadataCompareAt && metadataCompareAt > price.amount
      ? metadataCompareAt
      : null);
  const categories =
    product.categories
      ?.map(mapCategory)
      .filter((category): category is StorefrontCategory => Boolean(category)) ??
    [];
  const primaryCategory = categories[0];
  const imageUrls = [
    product.thumbnail,
    ...(product.images?.map((image) => image.url) ?? []),
  ].filter((url): url is string => Boolean(url));
  const tags =
    product.tags
      ?.map((tag) => tag.value)
      .filter((value): value is string => Boolean(value)) ?? [];

  return {
    id: product.id,
    handle: product.handle,
    name: product.title ?? titleFromHandle(product.handle),
    description: product.description ?? '',
    price: price.amount,
    priceDisplay: price.display,
    compareAtPrice,
    compareAtPriceDisplay: compareAtPrice
      ? formatMoney(compareAtPrice, currencyCode)
      : null,
    image: imageUrls[0] ?? '',
    images: imageUrls,
    category: primaryCategory?.handle ?? '',
    categoryLabel: primaryCategory?.name ?? 'Uncategorized',
    subcategory:
      categories.find((category) => category.parentCategoryId)?.handle ?? null,
    tags,
    variants:
      product.variants?.map((variant) => {
        const variantPrice = getVariantPrice(variant);

        return {
          id: variant.id,
          title: variant.title ?? 'Default variant',
          sku: variant.sku ?? null,
          price: variantPrice.amount,
          priceDisplay: variantPrice.display,
          compareAtPrice: variantPrice.compareAtAmount ?? null,
          compareAtPriceDisplay: variantPrice.compareAtDisplay ?? null,
        };
      }) ?? [],
    metadata: product.metadata ?? null,
    isBestSeller: tags.includes('clef_home_best_seller'),
  };
};

const withFriendlyMedusaError = (error: unknown): never => {
  warnMedusaDevelopment('Unable to load Store API data.', error);

  throw new Error(normaliseMedusaError(error));
};

const categoryDescendants = (
  categories: StorefrontCategory[],
  handle: string,
) => {
  const root = categories.find((category) => category.handle === handle);

  if (!root) {
    return new Set([handle]);
  }

  const ids = new Set([root.id]);
  let didAdd = true;

  while (didAdd) {
    didAdd = false;

    for (const category of categories) {
      if (category.parentCategoryId && ids.has(category.parentCategoryId) && !ids.has(category.id)) {
        ids.add(category.id);
        didAdd = true;
      }
    }
  }

  return new Set(
    categories
      .filter((category) => ids.has(category.id))
      .map((category) => category.handle),
  );
};

export const getProducts = async () => {
  try {
    const regionId = await getStoreRegionId();
    const response = await storeFetch<{ products?: LooseProduct[] }>(
      `/store/products?fields=${encodeURIComponent(PRODUCT_FIELDS)}&limit=100&region_id=${encodeURIComponent(regionId)}`,
    );

    return ((response.products ?? []) as LooseProduct[])
      .map(mapMedusaProduct)
      .filter((product): product is StorefrontProduct => Boolean(product));
  } catch (error) {
    return withFriendlyMedusaError(error);
  }
};

export const getProductByHandle = async (handle: string) => {
  try {
    const regionId = await getStoreRegionId();
    const response = await storeFetch<{ products?: LooseProduct[] }>(
      `/store/products?fields=${encodeURIComponent(PRODUCT_FIELDS)}&handle=${encodeURIComponent(handle)}&limit=1&region_id=${encodeURIComponent(regionId)}`,
    );
    const product = ((response.products ?? []) as LooseProduct[])
      .map(mapMedusaProduct)
      .find(Boolean);

    return product ?? null;
  } catch (error) {
    return withFriendlyMedusaError(error);
  }
};

export const getProductsByHandles = async (handles: string[]) => {
  if (handles.length === 0) {
    return [];
  }

  try {
    const regionId = await getStoreRegionId();
    const params = new URLSearchParams({
      fields: PRODUCT_FIELDS,
      limit: String(handles.length),
      region_id: regionId,
    });
    handles.forEach((handle) => params.append('handle[]', handle));
    const response = await storeFetch<{ products?: LooseProduct[] }>(
      `/store/products?${params.toString()}`,
    );

    return ((response.products ?? []) as LooseProduct[])
      .map(mapMedusaProduct)
      .filter((product): product is StorefrontProduct => Boolean(product));
  } catch (error) {
    return withFriendlyMedusaError(error);
  }
};

export const getCategories = async () => {
  try {
    const response = await storeFetch<{ product_categories?: LooseCategory[] }>(
      `/store/product-categories?fields=${encodeURIComponent(CATEGORY_FIELDS)}&limit=100`,
    );

    return ((response.product_categories ?? []) as LooseCategory[])
      .map(mapCategory)
      .filter((category): category is StorefrontCategory => Boolean(category));
  } catch (error) {
    return withFriendlyMedusaError(error);
  }
};

export const getCategoryByHandle = async (handle: string) => {
  const categories = await getCategories();

  return categories.find((category) => category.handle === handle) ?? null;
};

export const getProductsByCategoryHandle = async (
  handle: string,
  options: CategoryProductOptions = {},
) => {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const allowedHandles = options.includeDescendants
    ? categoryDescendants(categories, handle)
    : new Set([handle]);

  return products.filter((product) =>
    [product.category, product.subcategory].some((categoryHandle) =>
      categoryHandle ? allowedHandles.has(categoryHandle) : false,
    ),
  );
};

export const getProductsByIds = async (ids: string[]) => {
  const uniqueIds = Array.from(new Set(ids.filter(Boolean)));

  if (uniqueIds.length === 0) {
    return [];
  }

  try {
    const regionId = await getStoreRegionId();
    const params = new URLSearchParams({
      fields: PRODUCT_FIELDS,
      limit: String(uniqueIds.length),
      region_id: regionId,
    });
    uniqueIds.forEach((id) => params.append('id[]', id));
    const response = await storeFetch<{ products?: LooseProduct[] }>(
      `/store/products?${params.toString()}`,
    );

    return ((response.products ?? []) as LooseProduct[])
      .map(mapMedusaProduct)
      .filter((product): product is StorefrontProduct => Boolean(product));
  } catch (error) {
    return withFriendlyMedusaError(error);
  }
};

export const searchProducts = async (query: string, limit = 24, offset = 0) => {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return {
      products: [] as StorefrontProduct[],
      count: 0,
      limit,
      offset,
    };
  }

  try {
    const regionId = await getStoreRegionId();
    const params = new URLSearchParams({
      fields: PRODUCT_FIELDS,
      limit: String(limit),
      offset: String(offset),
      q: trimmedQuery,
      region_id: regionId,
    });
    const response = await storeFetch<{
      products?: LooseProduct[];
      count?: number;
      limit?: number;
      offset?: number;
    }>(`/store/products?${params.toString()}`);

    return {
      products: (response.products ?? [])
        .map(mapMedusaProduct)
        .filter((product): product is StorefrontProduct => Boolean(product)),
      count: response.count ?? response.products?.length ?? 0,
      limit: response.limit ?? limit,
      offset: response.offset ?? offset,
    };
  } catch (error) {
    return withFriendlyMedusaError(error);
  }
};

const metadataOrder = (
  product: StorefrontProduct,
  metadataKey: string,
) => {
  const value = product.metadata?.[metadataKey];
  const order = typeof value === 'number' ? value : Number(value);

  return Number.isFinite(order) ? order : Number.MAX_SAFE_INTEGER;
};

const getProductsByTag = async (
  tagValue: string,
  metadataOrderKey: string,
  limit: number,
) => {
  const products = await getProducts();

  return products
    .filter((product) => product.tags.includes(tagValue))
    .sort((a, b) => {
      const orderDifference =
        metadataOrder(a, metadataOrderKey) - metadataOrder(b, metadataOrderKey);

      return orderDifference || a.name.localeCompare(b.name);
    })
    .slice(0, limit);
};

export const getHomepageBestSellers = async () =>
  getProductsByTag('clef_home_best_seller', 'home_best_seller_order', 4);

export const getSkincareHeaderProducts = async () =>
  getProductsByTag(
    'clef_header_skincare_top',
    'skincare_header_order',
    3,
  );

export const getPersonalCareHeaderProducts = async () =>
  getProductsByTag(
    'clef_header_personal_care_top',
    'personal_care_header_order',
    3,
  );
