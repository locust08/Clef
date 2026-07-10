import {
  DEODORANT_PRODUCTS,
  chooseMyrAmount,
  productToCreateInput,
  productToUpdateInput,
} from "../deodorant-products";
import { ProductStatus } from "@medusajs/framework/utils";

describe("deodorant product seed data", () => {
  it("uses stable handles, SKUs, MYR major-unit prices, and published status", () => {
    expect(DEODORANT_PRODUCTS).toHaveLength(5);

    const handles = DEODORANT_PRODUCTS.map((product) => product.handle);
    const skus = DEODORANT_PRODUCTS.map((product) => product.sku);

    expect(new Set(handles).size).toBe(DEODORANT_PRODUCTS.length);
    expect(new Set(skus).size).toBe(DEODORANT_PRODUCTS.length);
    expect(skus).toEqual([
      "CLEF-DEO-FRESH-CAMELLIA-PEAR",
      "CLEF-DEO-FRESH-GARDENIA-YLANG",
      "CLEF-DEO-BRIGHT-CYPRESS-SANDALWOOD",
      "CLEF-DEO-SET-A-3PCS",
      "CLEF-DEO-SET-B-MIX-2",
    ]);

    expect(DEODORANT_PRODUCTS.map((product) => product.price)).toEqual([
      49, 49, 49, 79, 66,
    ]);
  });

  it("keeps mix-and-match metadata on Set B", () => {
    const setB = DEODORANT_PRODUCTS.find(
      (product) => product.sku === "CLEF-DEO-SET-B-MIX-2",
    );

    expect(setB?.metadata).toEqual({
      bundle_type: "mix_and_match",
      required_quantity: 2,
      allowed_items: [
        "CLEF-DEO-FRESH-CAMELLIA-PEAR",
        "CLEF-DEO-FRESH-GARDENIA-YLANG",
        "CLEF-DEO-BRIGHT-CYPRESS-SANDALWOOD",
      ],
    });
  });

  it("builds create input with the deodorant category, storefront channel, shipping profile, and managed inventory", () => {
    const input = productToCreateInput(DEODORANT_PRODUCTS[0], {
      categoryId: "pcat_deodorant",
      salesChannelId: "sc_storefront",
      shippingProfileId: "sp_default",
      myrAmountMode: "major",
      manageInventory: true,
    });

    expect(input).toMatchObject({
      title: "FRESH Camellia & Pear Anti-Perspirant Spray",
      handle: "fresh-camellia-pear-anti-perspirant-spray",
      status: ProductStatus.PUBLISHED,
      category_ids: ["pcat_deodorant"],
      shipping_profile_id: "sp_default",
      options: [
        {
          title: "Title",
          values: ["Default"],
        },
      ],
      sales_channels: [{ id: "sc_storefront" }],
      variants: [
        {
          title: "Default",
          sku: "CLEF-DEO-FRESH-CAMELLIA-PEAR",
          manage_inventory: true,
          prices: [{ amount: 49, currency_code: "myr" }],
        },
      ],
    });
  });

  it("builds update input without creating a duplicate product", () => {
    const input = productToUpdateInput(
      DEODORANT_PRODUCTS[1],
      {
        productId: "prod_existing",
        variantId: "variant_existing",
      },
      {
        categoryId: "pcat_deodorant",
        salesChannelId: "sc_storefront",
        shippingProfileId: "sp_default",
        myrAmountMode: "major",
        manageInventory: true,
      },
    );

    expect(input).toMatchObject({
      id: "prod_existing",
      handle: "fresh-gardenia-ylang-ylang-anti-perspirant-spray",
      status: ProductStatus.PUBLISHED,
      category_ids: ["pcat_deodorant"],
      shipping_profile_id: "sp_default",
      sales_channels: [{ id: "sc_storefront" }],
      variants: [
        {
          id: "variant_existing",
          sku: "CLEF-DEO-FRESH-GARDENIA-YLANG",
          manage_inventory: true,
          prices: [{ amount: 49, currency_code: "myr" }],
        },
      ],
    });
  });
});

describe("chooseMyrAmount", () => {
  it("uses major units when existing MYR prices are stored as major units", () => {
    expect(chooseMyrAmount(49, [{ amount: "35" }, { amount: "149" }])).toBe(49);
  });

  it("uses subunits when existing MYR prices are stored as cents", () => {
    expect(chooseMyrAmount(49, [{ amount: "3500" }, { amount: "14900" }])).toBe(
      4900,
    );
  });
});
