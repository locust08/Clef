import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ProductsSectionCustomComponents1 from '../custom-components/ProductsSectionCustomComponents1';
import ProductsSectionCustomComponents4 from '../custom-components/ProductsSectionCustomComponents4';
import ProductTrustBenefitsStrip from './ProductTrustBenefitsStrip';
import { useMockCart } from '../../context/MockCartContext';
import {
  MIX_AND_MATCH_SCENTS,
  PRODUCT_A_ITEMS,
  PRODUCT_A_TITLE,
  PRODUCT_B_TITLE,
} from '../../lib/deodorant-groups';
import type { StorefrontProduct } from '../../lib/medusa-products';

type GroupedDeodorantProductPageProps =
  | {
      type: 'new-launch';
      products: StorefrontProduct[];
      medusaError?: string | null;
    }
  | {
      type: 'mix-match';
      products: StorefrontProduct[];
      medusaError?: string | null;
    };

const priceTextClass = 'text-lg font-semibold text-red-600';

const PriceLine: React.FC<{ product: StorefrontProduct | null }> = ({
  product,
}) => {
  if (!product) {
    return <p className={priceTextClass}>Price unavailable</p>;
  }

  return (
    <div className="mb-1 flex items-baseline gap-3">
      <span className={priceTextClass}>{product.priceDisplay}</span>
      {product.compareAtPriceDisplay && (
        <span className="text-xs font-semibold text-rhino-700 line-through">
          {product.compareAtPriceDisplay}
        </span>
      )}
    </div>
  );
};

const QuantitySelector: React.FC<{
  quantity: number;
  onChange: (quantity: number) => void;
}> = ({ quantity, onChange }) => (
  <div>
    <p className="mb-3 text-xs font-bold text-rhino-500">Quantity</p>
    <div className="inline-flex h-12 bg-white">
      <button
        aria-label="Decrease quantity"
        className="w-12 text-xl text-rhino-700 transition hover:bg-coolGray-100 clef-icon-button"
        onClick={() => onChange(Math.max(1, quantity - 1))}
        type="button"
      >
        -
      </button>
      <div className="flex w-12 items-center justify-center text-sm text-rhino-900">
        {quantity}
      </div>
      <button
        aria-label="Increase quantity"
        className="w-12 text-xl text-rhino-700 transition hover:bg-coolGray-100 clef-icon-button"
        onClick={() => onChange(quantity + 1)}
        type="button"
      >
        +
      </button>
    </div>
  </div>
);

const OptionButton: React.FC<{
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}> = ({ active, children, onClick }) => (
  <button
    className={`block w-full max-w-md rounded-sm border bg-white px-5 py-4 text-left text-sm font-medium transition ${
      active
        ? 'border-rhino-900 text-rhino-900 shadow-[inset_0_0_0_1px_#111827]'
        : 'border-white text-rhino-800 hover:border-rhino-300'
    }`}
    onClick={onClick}
    type="button"
  >
    {children}
  </button>
);

const findProduct = (products: StorefrontProduct[], handle: string) =>
  products.find((product) => product.handle === handle) ?? null;

const getVariantId = (product: StorefrontProduct | null) =>
  product?.variants[0]?.id ?? null;

const GroupedDeodorantProductPage: React.FC<GroupedDeodorantProductPageProps> = ({
  type,
  products,
  medusaError = null,
}) => {
  const { addMedusaItem } = useMockCart();
  const isMixMatch = type === 'mix-match';
  const [selectedHandle, setSelectedHandle] = React.useState<string>(
    PRODUCT_A_ITEMS[0].handle,
  );
  const [scent1, setScent1] = React.useState<string | null>(null);
  const [scent2, setScent2] = React.useState<string | null>(null);
  const [quantity, setQuantity] = React.useState(1);
  const [isAdding, setIsAdding] = React.useState(false);
  const [cartError, setCartError] = React.useState<string | null>(null);

  const selectedProduct = isMixMatch
    ? products[0] ?? null
    : findProduct(products, selectedHandle);
  const title = isMixMatch ? PRODUCT_B_TITLE : PRODUCT_A_TITLE;
  const variantId = getVariantId(selectedProduct);
  const canAdd = Boolean(variantId) && (!isMixMatch || (scent1 && scent2));
  const heroImage =
    selectedProduct?.image || products.find((product) => product.image)?.image;

  const handleAddToCart = async () => {
    if (!selectedProduct || !variantId || !canAdd) {
      return;
    }

    setIsAdding(true);
    setCartError(null);

    try {
      await addMedusaItem({
        product: selectedProduct,
        variantId,
        quantity,
        metadata: isMixMatch
          ? {
              scent_1: scent1!,
              scent_2: scent2!,
              bundle_type: 'mix_and_match',
            }
          : undefined,
      });
    } catch (error) {
      setCartError(
        error instanceof Error
          ? error.message
          : 'Unable to add this product to cart.',
      );
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/shuffle-for-tailwind.png"
        />
      </Head>
      <ProductsSectionCustomComponents1 />
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-rhino-400">
            <Link className="hover:text-rhino-700 clef-link-highlight" href="/">
              Home
            </Link>
            <span>/</span>
            <Link
              className="hover:text-rhino-700 clef-link-highlight"
              href="/personal-care/deodorant"
            >
              Deodorant
            </Link>
            <span>/</span>
            <span className="text-rhino-700">{title}</span>
          </div>

          {medusaError ? (
            <div className="rounded-xl border border-red-100 bg-white p-8 text-center">
              <h1 className="mb-3 font-heading text-3xl font-semibold text-rhino-700">
                Unable to load product.
              </h1>
              <p className="text-rhino-400">{medusaError}</p>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
              <div className="flex min-h-[420px] items-center justify-center rounded-xl bg-rose-50 p-8">
                {heroImage ? (
                  <img
                    className="max-h-[520px] w-full rounded-xl object-contain"
                    src={heroImage}
                    alt={selectedProduct?.name ?? title}
                  />
                ) : (
                  <span className="text-sm font-medium text-rhino-400">
                    No image
                  </span>
                )}
              </div>

              <div className="max-w-2xl">
                <h1 className="mb-5 font-heading text-3xl font-semibold leading-tight text-rhino-900 md:text-4xl">
                  {title}
                </h1>
                <PriceLine product={selectedProduct} />
                <p className="mb-6 text-xs tracking-wide text-rhino-600">
                  <span className="border-b border-rhino-800 text-rhino-900">
                    Shipping
                  </span>{' '}
                  calculated at checkout.
                </p>

                <div className="rounded-md bg-[#d9d9d9] p-6 md:p-8">
                  {!isMixMatch && (
                    <div className="mb-6">
                      <p className="mb-3 text-xs font-bold text-rhino-500">
                        Scent
                      </p>
                      <div className="space-y-2">
                        {PRODUCT_A_ITEMS.map((item) => (
                          <OptionButton
                            active={selectedHandle === item.handle}
                            key={item.sku}
                            onClick={() => setSelectedHandle(item.handle)}
                          >
                            {item.shortLabel}
                          </OptionButton>
                        ))}
                      </div>
                    </div>
                  )}

                  {isMixMatch && (
                    <>
                      <div className="mb-6">
                        <p className="mb-3 text-xs font-bold text-rhino-500">
                          Scent 1
                        </p>
                        <div className="space-y-2">
                          {MIX_AND_MATCH_SCENTS.map((scent) => (
                            <OptionButton
                              active={scent1 === scent.label}
                              key={`scent-1-${scent.sku}`}
                              onClick={() => setScent1(scent.label)}
                            >
                              {scent.label}
                            </OptionButton>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <p className="mb-3 text-xs font-bold text-rhino-500">
                          Scent 2
                        </p>
                        <div className="space-y-2">
                          {MIX_AND_MATCH_SCENTS.map((scent) => (
                            <OptionButton
                              active={scent2 === scent.label}
                              key={`scent-2-${scent.sku}`}
                              onClick={() => setScent2(scent.label)}
                            >
                              {scent.label}
                            </OptionButton>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  <QuantitySelector quantity={quantity} onChange={setQuantity} />
                </div>

                {cartError && (
                  <p className="mt-4 rounded-sm border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {cartError}
                  </p>
                )}

                <button
                  className={`mt-6 w-full max-w-sm rounded-sm px-5 py-4 text-sm font-semibold text-white transition clef-button-primary ${
                    canAdd
                      ? 'bg-purple-500 hover:bg-purple-600'
                      : 'cursor-not-allowed bg-rhino-300'
                  }`}
                  disabled={!canAdd || isAdding}
                  onClick={handleAddToCart}
                  type="button"
                >
                  {isAdding
                    ? 'Adding...'
                    : isMixMatch && !canAdd
                      ? 'Select both scents'
                      : 'Add to cart'}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      <ProductTrustBenefitsStrip />
      <ProductsSectionCustomComponents4 />
    </>
  );
};

export default GroupedDeodorantProductPage;
