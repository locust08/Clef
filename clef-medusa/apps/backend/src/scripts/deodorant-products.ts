import { ProductStatus } from "@medusajs/framework/utils";

export type MyrAmountMode = "major" | "subunit";

export type DeodorantProductSeed = {
  title: string;
  handle: string;
  sku: string;
  price: number;
  collectionTitle: string;
  collectionHandle: string;
  description: string;
  metadata?: Record<string, unknown>;
};

export type ProductInputContext = {
  categoryId: string;
  salesChannelId: string;
  shippingProfileId: string;
  myrAmountMode: MyrAmountMode;
  manageInventory: boolean;
  collectionId?: string;
};

export type ExistingProductMatch = {
  productId: string;
  variantId?: string;
};

export const NEW_LAUNCH_COLLECTION =
  "[NEW LAUNCH] All in One Deodorant & Perfume Mist for underarms & feet";

export const MIX_AND_MATCH_COLLECTION =
  "[Mix & Match Any 2] All in One Deodorant & Perfume Mist for underarms & feet";

export const DEODORANT_COLLECTIONS = [
  {
    title: NEW_LAUNCH_COLLECTION,
    handle: "new-launch-all-in-one-deodorant-perfume-mist",
  },
  {
    title: MIX_AND_MATCH_COLLECTION,
    handle: "mix-and-match-any-2-deodorant-perfume-mist",
  },
] as const;

export const DEODORANT_PRODUCTS: DeodorantProductSeed[] = [
  {
    title: "FRESH Camellia & Pear Anti-Perspirant Spray",
    price: 49,
    handle: "fresh-camellia-pear-anti-perspirant-spray",
    sku: "CLEF-DEO-FRESH-CAMELLIA-PEAR",
    collectionTitle: NEW_LAUNCH_COLLECTION,
    collectionHandle: "new-launch-all-in-one-deodorant-perfume-mist",
    description:
      "A fresh all-in-one deodorant and perfume mist for underarms and feet with Camellia & Pear scent.",
  },
  {
    title: "FRESH Gardenia & Ylang Ylang Anti-Perspirant Spray",
    price: 49,
    handle: "fresh-gardenia-ylang-ylang-anti-perspirant-spray",
    sku: "CLEF-DEO-FRESH-GARDENIA-YLANG",
    collectionTitle: NEW_LAUNCH_COLLECTION,
    collectionHandle: "new-launch-all-in-one-deodorant-perfume-mist",
    description:
      "A fresh all-in-one deodorant and perfume mist for underarms and feet with Gardenia & Ylang Ylang scent.",
  },
  {
    title: "BRIGHT Cypress & Sandalwood Anti-Odour Spray",
    price: 49,
    handle: "bright-cypress-sandalwood-anti-odour-spray",
    sku: "CLEF-DEO-BRIGHT-CYPRESS-SANDALWOOD",
    collectionTitle: NEW_LAUNCH_COLLECTION,
    collectionHandle: "new-launch-all-in-one-deodorant-perfume-mist",
    description:
      "An all-in-one deodorant and perfume mist for underarms and feet with Cypress & Sandalwood scent.",
  },
  {
    title: "[Set A] 1 Camellia + 1 Gardenia + 1 Cypress Anti-Perspirant Spray",
    price: 79,
    handle: "set-a-camellia-gardenia-cypress-anti-perspirant-spray",
    sku: "CLEF-DEO-SET-A-3PCS",
    collectionTitle: NEW_LAUNCH_COLLECTION,
    collectionHandle: "new-launch-all-in-one-deodorant-perfume-mist",
    description:
      "Set A bundle includes 1 Camellia & Pear, 1 Gardenia & Ylang Ylang, and 1 Cypress & Sandalwood spray.",
  },
  {
    title: "[Set B] Mix & Match Any 2 All in One Deodorant & Perfume Mist",
    price: 66,
    handle: "set-b-mix-match-any-2-deodorant-perfume-mist",
    sku: "CLEF-DEO-SET-B-MIX-2",
    collectionTitle: MIX_AND_MATCH_COLLECTION,
    collectionHandle: "mix-and-match-any-2-deodorant-perfume-mist",
    description:
      "Set B allows customers to mix and match any 2 deodorant and perfume mist sprays.",
    metadata: {
      bundle_type: "mix_and_match",
      required_quantity: 2,
      allowed_items: [
        "CLEF-DEO-FRESH-CAMELLIA-PEAR",
        "CLEF-DEO-FRESH-GARDENIA-YLANG",
        "CLEF-DEO-BRIGHT-CYPRESS-SANDALWOOD",
      ],
    },
  },
];

export function chooseMyrAmount(
  majorUnitAmount: number,
  existingMyrPrices: { amount: string | number }[],
) {
  const numericAmounts = existingMyrPrices
    .map((price) => Number(price.amount))
    .filter((amount) => Number.isFinite(amount) && amount > 0);

  if (
    numericAmounts.length > 0 &&
    numericAmounts.every((amount) => Number.isInteger(amount) && amount >= 1000)
  ) {
    return majorUnitAmount * 100;
  }

  return majorUnitAmount;
}

export function productToCreateInput(
  product: DeodorantProductSeed,
  context: ProductInputContext,
) {
  return {
    title: product.title,
    handle: product.handle,
    description: product.description,
    status: ProductStatus.PUBLISHED,
    category_ids: [context.categoryId],
    collection_id: context.collectionId,
    shipping_profile_id: context.shippingProfileId,
    metadata: product.metadata,
    options: [
      {
        title: "Title",
        values: ["Default"],
      },
    ],
    variants: [
      {
        title: "Default",
        sku: product.sku,
        manage_inventory: context.manageInventory,
        options: {
          Title: "Default",
        },
        prices: [
          {
            amount: chooseMyrAmount(product.price, [
              { amount: context.myrAmountMode === "subunit" ? 1000 : 10 },
            ]),
            currency_code: "myr",
          },
        ],
      },
    ],
    sales_channels: [
      {
        id: context.salesChannelId,
      },
    ],
  };
}

export function productToUpdateInput(
  product: DeodorantProductSeed,
  existing: ExistingProductMatch,
  context: ProductInputContext,
) {
  const createInput = productToCreateInput(product, context);

  return {
    id: existing.productId,
    title: createInput.title,
    handle: createInput.handle,
    description: createInput.description,
    status: createInput.status,
    category_ids: createInput.category_ids,
    collection_id: createInput.collection_id,
    shipping_profile_id: createInput.shipping_profile_id,
    metadata: createInput.metadata,
    options: createInput.options,
    sales_channels: createInput.sales_channels,
    variants: [
      {
        ...createInput.variants[0],
        id: existing.variantId,
      },
    ],
  };
}
