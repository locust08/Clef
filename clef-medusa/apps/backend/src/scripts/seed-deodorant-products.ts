import { MedusaContainer } from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import {
  createCollectionsWorkflow,
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  updateCollectionsWorkflow,
  updateInventoryLevelsWorkflow,
  updateProductsWorkflow,
} from "@medusajs/medusa/core-flows";

import {
  DEODORANT_COLLECTIONS,
  DEODORANT_PRODUCTS,
  DeodorantProductSeed,
  ExistingProductMatch,
  MyrAmountMode,
  chooseMyrAmount,
  productToCreateInput,
  productToUpdateInput,
} from "./deodorant-products";

type ScriptArgs = {
  container: MedusaContainer;
  args: string[];
};

type SeedStats = {
  created: string[];
  updated: string[];
  skipped: string[];
  missingSetup: string[];
};

type ProductRecord = {
  id: string;
  handle: string;
  variants?: {
    id: string;
    sku?: string | null;
    manage_inventory?: boolean;
  }[];
};

type ProductVariantInventoryLink = {
  variant_id: string;
  inventory_item_id: string;
};

type InventoryLevelRecord = {
  id: string;
  inventory_item_id: string;
  location_id: string;
};

const INVENTORY_QUANTITY = 100;

async function graphAll<T = any>(
  query: any,
  entity: string,
  fields: string[],
  filters?: Record<string, unknown>,
): Promise<T[]> {
  const { data } = await query.graph({
    entity,
    fields,
    filters,
    pagination: {
      skip: 0,
      take: 1000,
    },
  });

  return data ?? [];
}

function required<T>(
  value: T | null | undefined,
  message: string,
  stats: SeedStats,
): T {
  if (!value) {
    stats.missingSetup.push(message);
    throw new Error(message);
  }

  return value;
}

async function resolveMyrAmountMode(query: any, stats: SeedStats) {
  const currencies = await graphAll<{ code: string }>(query, "currencies", [
    "code",
  ]);

  if (!currencies.some((currency) => currency.code === "myr")) {
    stats.missingSetup.push("MYR currency is missing");
    throw new Error("MYR currency is missing");
  }

  const myrPrices = await graphAll<{ amount: string | number }>(
    query,
    "prices",
    ["amount", "currency_code"],
    { currency_code: "myr" },
  );

  const mode: MyrAmountMode =
    chooseMyrAmount(1, myrPrices) === 100 ? "subunit" : "major";

  return mode;
}

async function resolveStorefrontSalesChannel(query: any, stats: SeedStats) {
  const envPublishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
  const links = await graphAll<any>(
    query,
    "publishable_api_key_sales_channels",
    [
      "publishable_key_id",
      "sales_channel_id",
      "api_key.token",
      "api_key.redacted",
      "api_key.title",
      "sales_channel.id",
      "sales_channel.name",
      "sales_channel.is_disabled",
    ],
  );

  const linkedChannels = links
    .filter((link) => {
      if (!envPublishableKey) {
        return true;
      }

      return (
        link.api_key?.token === envPublishableKey ||
        link.api_key?.redacted === envPublishableKey
      );
    })
    .map((link) => link.sales_channel)
    .filter(Boolean)
    .filter((channel, index, all) => {
      return all.findIndex((item) => item.id === channel.id) === index;
    })
    .filter((channel) => !channel.is_disabled);

  if (linkedChannels.length > 0) {
    return linkedChannels[0];
  }

  const stores = await graphAll<any>(query, "stores", [
    "id",
    "name",
    "default_sales_channel_id",
  ]);
  const defaultSalesChannelId = stores[0]?.default_sales_channel_id;

  if (defaultSalesChannelId) {
    const channels = await graphAll<any>(
      query,
      "sales_channels",
      ["id", "name", "is_disabled"],
      { id: defaultSalesChannelId },
    );
    const channel = channels.find((item) => !item.is_disabled);

    if (channel) {
      return channel;
    }
  }

  const message =
    "No active storefront sales channel linked to a publishable API key was found";
  stats.missingSetup.push(message);
  throw new Error(message);
}

async function resolveShippingProfile(query: any, stats: SeedStats) {
  const profiles = await graphAll<any>(query, "shipping_profiles", [
    "id",
    "name",
    "type",
  ]);

  return required(
    profiles.find((profile) => profile.type === "default") ?? profiles[0],
    "Default shipping profile is missing",
    stats,
  );
}

async function resolveStockLocation(
  query: any,
  salesChannelId: string,
  stats: SeedStats,
) {
  const links = await graphAll<any>(
    query,
    "sales_channel_locations",
    [
      "sales_channel_id",
      "stock_location_id",
      "location.id",
      "location.name",
      "location.address.country_code",
    ],
    { sales_channel_id: salesChannelId },
  );

  const locations = links
    .map((link) => link.location)
    .filter(Boolean)
    .filter((location, index, all) => {
      return all.findIndex((item) => item.id === location.id) === index;
    });

  const preferred =
    locations.find((location) => location.name === "CLEF Marketing") ??
    locations.find(
      (location) => location.address?.country_code?.toLowerCase() === "my",
    ) ??
    locations[0];

  return required(
    preferred,
    `No stock location is linked to sales channel ${salesChannelId}`,
    stats,
  );
}

async function ensureCategory(query: any, container: MedusaContainer) {
  const categories = await graphAll<any>(
    query,
    "product_categories",
    ["id", "name", "handle", "parent_category_id", "is_active"],
    { handle: ["personal-care", "deodorant"] },
  );

  let parent = categories.find(
    (category) => category.handle === "personal-care",
  );

  if (!parent) {
    const { result } = await createProductCategoriesWorkflow(container).run({
      input: {
        product_categories: [
          {
            name: "Personal Care",
            handle: "personal-care",
            is_active: true,
            is_internal: false,
          },
        ],
      },
    });

    parent = result[0];
  }

  let deodorant = categories.find((category) => {
    return (
      category.handle === "deodorant" &&
      category.parent_category_id === parent.id
    );
  });

  if (!deodorant) {
    const { result } = await createProductCategoriesWorkflow(container).run({
      input: {
        product_categories: [
          {
            name: "Deodorant",
            handle: "deodorant",
            parent_category_id: parent.id,
            is_active: true,
            is_internal: false,
          },
        ],
      },
    });

    deodorant = result[0];
  }

  return deodorant;
}

async function ensureCollections(query: any, container: MedusaContainer) {
  const existingCollections = await graphAll<any>(
    query,
    "product_collections",
    ["id", "title", "handle"],
    { handle: DEODORANT_COLLECTIONS.map((collection) => collection.handle) },
  );

  const collectionByHandle = new Map<string, any>();

  for (const collection of DEODORANT_COLLECTIONS) {
    const existing = existingCollections.find(
      (item) => item.handle === collection.handle,
    );

    if (existing) {
      if (existing.title !== collection.title) {
        await updateCollectionsWorkflow(container).run({
          input: {
            selector: {
              id: existing.id,
            },
            update: {
              title: collection.title,
              handle: collection.handle,
            },
          },
        });
      }

      collectionByHandle.set(collection.handle, {
        ...existing,
        title: collection.title,
      });
      continue;
    }

    const { result } = await createCollectionsWorkflow(container).run({
      input: {
        collections: [
          {
            title: collection.title,
            handle: collection.handle,
          },
        ],
      },
    });

    collectionByHandle.set(collection.handle, result[0]);
  }

  return collectionByHandle;
}

function matchExistingProduct(
  product: DeodorantProductSeed,
  productsByHandle: Map<string, ProductRecord>,
  variantsBySku: Map<string, ProductRecord>,
): ExistingProductMatch | "conflict" | null {
  const byHandle = productsByHandle.get(product.handle);
  const bySku = variantsBySku.get(product.sku);

  if (byHandle && bySku && byHandle.id !== bySku.id) {
    return "conflict";
  }

  const existing = byHandle ?? bySku;

  if (!existing) {
    return null;
  }

  return {
    productId: existing.id,
    variantId:
      existing.variants?.find((variant) => variant.sku === product.sku)?.id ??
      existing.variants?.[0]?.id,
  };
}

async function fetchSeedProducts(query: any) {
  const handles = DEODORANT_PRODUCTS.map((product) => product.handle);
  const skus = DEODORANT_PRODUCTS.map((product) => product.sku);

  const productsByHandle = await graphAll<ProductRecord>(
    query,
    "products",
    [
      "id",
      "handle",
      "variants.id",
      "variants.sku",
      "variants.manage_inventory",
    ],
    { handle: handles },
  );

  const variants = await graphAll<any>(
    query,
    "product_variants",
    [
      "id",
      "sku",
      "product.id",
      "product.handle",
      "product.variants.id",
      "product.variants.sku",
      "product.variants.manage_inventory",
    ],
    { sku: skus },
  );

  return {
    productsByHandle: new Map(
      productsByHandle.map((product) => [product.handle, product]),
    ),
    variantsBySku: new Map(
      variants
        .filter((variant) => variant.product)
        .map((variant) => [variant.sku, variant.product]),
    ),
  };
}

async function inventoryItemsForVariants(query: any, variantIds: string[]) {
  if (!variantIds.length) {
    return [];
  }

  return graphAll<ProductVariantInventoryLink>(
    query,
    "product_variant_inventory_items",
    ["variant_id", "inventory_item_id"],
    { variant_id: variantIds },
  );
}

async function upsertInventoryLevels(
  query: any,
  container: MedusaContainer,
  variantIds: string[],
  stockLocationId: string,
  stats: SeedStats,
) {
  const inventoryLinks = await inventoryItemsForVariants(query, variantIds);

  if (!inventoryLinks.length) {
    stats.skipped.push(
      "inventory: no inventory items found for deodorant variants",
    );
    return;
  }

  const inventoryItemIds = inventoryLinks.map((link) => link.inventory_item_id);
  const existingLevels = await graphAll<InventoryLevelRecord>(
    query,
    "inventory_levels",
    ["id", "inventory_item_id", "location_id"],
    {
      inventory_item_id: inventoryItemIds,
      location_id: stockLocationId,
    },
  );

  const createPayload = inventoryLinks
    .filter((link) => {
      return !existingLevels.some((level) => {
        return (
          level.inventory_item_id === link.inventory_item_id &&
          level.location_id === stockLocationId
        );
      });
    })
    .map((link) => ({
      inventory_item_id: link.inventory_item_id,
      location_id: stockLocationId,
      stocked_quantity: INVENTORY_QUANTITY,
    }));

  const updatePayload = existingLevels.map((level) => ({
    id: level.id,
    inventory_item_id: level.inventory_item_id,
    location_id: level.location_id,
    stocked_quantity: INVENTORY_QUANTITY,
  }));

  if (createPayload.length) {
    await createInventoryLevelsWorkflow(container).run({
      input: {
        inventory_levels: createPayload,
      },
    });
  }

  if (updatePayload.length) {
    await updateInventoryLevelsWorkflow(container).run({
      input: {
        updates: updatePayload,
      },
    });
  }
}

export default async function seedDeodorantProducts({ container }: ScriptArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const stats: SeedStats = {
    created: [],
    updated: [],
    skipped: [],
    missingSetup: [],
  };

  logger.info("Starting deodorant product upsert seed...");

  const myrAmountMode = await resolveMyrAmountMode(query, stats);
  const salesChannel = await resolveStorefrontSalesChannel(query, stats);
  const stockLocation = await resolveStockLocation(
    query,
    salesChannel.id,
    stats,
  );
  const shippingProfile = await resolveShippingProfile(query, stats);
  const deodorantCategory = await ensureCategory(query, container);
  const collectionByHandle = await ensureCollections(query, container);

  logger.info(`MYR price amount mode: ${myrAmountMode}`);
  logger.info(`Using sales channel: ${salesChannel.name} (${salesChannel.id})`);
  logger.info(
    `Using stock location: ${stockLocation.name} (${stockLocation.id})`,
  );
  logger.info(
    `Using shipping profile: ${shippingProfile.name} (${shippingProfile.id})`,
  );
  logger.info(
    `Using category: Personal Care > Deodorant (${deodorantCategory.id})`,
  );

  let existing = await fetchSeedProducts(query);
  const createdVariantIds: string[] = [];
  const updatedVariantIds: string[] = [];

  for (const product of DEODORANT_PRODUCTS) {
    const collection = collectionByHandle.get(product.collectionHandle);
    const context = {
      categoryId: deodorantCategory.id,
      collectionId: collection?.id,
      salesChannelId: salesChannel.id,
      shippingProfileId: shippingProfile.id,
      myrAmountMode,
      manageInventory: true,
    };
    const match = matchExistingProduct(
      product,
      existing.productsByHandle,
      existing.variantsBySku,
    );

    if (match === "conflict") {
      stats.skipped.push(
        `${product.handle}: handle and SKU belong to different existing products`,
      );
      continue;
    }

    if (!match) {
      const { result } = await createProductsWorkflow(container).run({
        input: {
          products: [productToCreateInput(product, context)],
        },
      });

      const created = result[0] as any;
      stats.created.push(`${product.handle} (${product.sku})`);
      createdVariantIds.push(...(created.variants ?? []).map((v) => v.id));
      existing = await fetchSeedProducts(query);
      continue;
    }

    const { result } = await updateProductsWorkflow(container).run({
      input: {
        products: [productToUpdateInput(product, match, context)],
      },
    });

    const updated = result[0] as any;
    stats.updated.push(`${product.handle} (${product.sku})`);
    updatedVariantIds.push(...(updated.variants ?? []).map((v) => v.id));
    existing = await fetchSeedProducts(query);
  }

  await upsertInventoryLevels(
    query,
    container,
    [...createdVariantIds, ...updatedVariantIds],
    stockLocation.id,
    stats,
  );

  logger.info(`Created products: ${stats.created.length}`);
  stats.created.forEach((item) => logger.info(`  created: ${item}`));
  logger.info(`Updated products: ${stats.updated.length}`);
  stats.updated.forEach((item) => logger.info(`  updated: ${item}`));
  logger.info(`Skipped products: ${stats.skipped.length}`);
  stats.skipped.forEach((item) => logger.warn(`  skipped: ${item}`));
  logger.info(`Missing setup items: ${stats.missingSetup.length}`);
  stats.missingSetup.forEach((item) =>
    logger.error(`  missing setup: ${item}`),
  );
  logger.info("Finished deodorant product upsert seed.");
}
