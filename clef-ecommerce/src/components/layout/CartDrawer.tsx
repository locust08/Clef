import Link from 'next/link';
import type { StorefrontCart } from '../../lib/medusa-cart';

type CartDrawerProps = {
  isOpen: boolean;
  cart?: StorefrontCart | null;
  isLoading?: boolean;
  error?: string | null;
  onClose?: () => void;
  onRemove?: (lineItemId: string) => void | Promise<void>;
  onUpdateQuantity?: (lineItemId: string, quantity: number) => void | Promise<void>;
};

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  cart = null,
  isLoading = false,
  error = null,
  onClose,
  onRemove,
  onUpdateQuantity,
}) => {
  if (!isOpen) {
    return null;
  }

  const items = cart?.items ?? [];

  return (
    <section className="fixed inset-0 z-50 h-full w-full overflow-hidden bg-gray-800 bg-opacity-80">
      <button
        aria-label="Close cart"
        className="absolute inset-0 h-full w-full clef-icon-button"
        onClick={onClose}
        type="button"
      />
      <div className="absolute right-0 top-0 z-50 h-full w-full max-w-2xl overflow-auto bg-white">
        <div className="flex items-center justify-between border-b border-coolGray-200 p-6">
          <h2 className="text-lg font-semibold text-rhino-800">Shopping Cart</h2>
          <button
            className="text-rhino-400 hover:text-rhino-700 clef-icon-button"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-sm text-rhino-400">Loading cart...</div>
        ) : error ? (
          <div className="p-8 text-center">
            <h3 className="mb-2 font-heading text-2xl font-semibold text-rhino-700">
              Cart needs attention
            </h3>
            <p className="text-sm text-rhino-400">{error}</p>
          </div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center">
            <h3 className="mb-2 font-heading text-2xl font-semibold text-rhino-700">
              Your cart is empty
            </h3>
            <p className="mb-6 text-sm text-rhino-400">
              Add a product to begin checkout.
            </p>
            <Link
              className="inline-block rounded-sm bg-purple-500 px-4 py-3 text-sm text-white hover:bg-purple-600 clef-button-primary"
              href="/shop/skincare"
              onClick={onClose}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="p-6">
            {items.map((item) => (
              <div className="flex gap-5 border-b border-coolGray-200 py-4" key={item.id}>
                <div className="flex h-24 w-24 flex-none items-center justify-center overflow-hidden rounded-lg bg-rose-50 p-2">
                  {item.image ? (
                    <img className="h-full w-full object-contain" src={item.image} alt={item.title} />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <Link
                    className="block text-rhino-800 hover:text-purple-600 clef-link-highlight"
                    href={item.handle ? `/product/${item.handle}` : '/products'}
                    onClick={onClose}
                  >
                    {item.title}
                  </Link>
                  <p className="text-sm text-rhino-300">{item.variantTitle}</p>
                  <p className="mt-1 text-sm text-rhino-500">{item.unitPriceDisplay}</p>
                  {item.metadata && (
                    <div className="mt-2 space-y-1 text-xs text-rhino-400">
                      {Object.entries(item.metadata).map(([key, value]) => (
                        <p key={key}>
                          {key.replace(/_/g, ' ')}: {String(value)}
                        </p>
                      ))}
                    </div>
                  )}
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <div className="flex items-center rounded-sm border border-coolGray-200 bg-white">
                      <button
                        aria-label={`Decrease quantity for ${item.title}`}
                        className="px-3 py-1 text-coolGray-400 hover:text-rhino-700 clef-icon-button"
                        disabled={item.quantity <= 1}
                        onClick={() => onUpdateQuantity?.(item.id, item.quantity - 1)}
                        type="button"
                      >
                        -
                      </button>
                      <span className="min-w-8 text-center text-sm text-coolGray-700">
                        {item.quantity}
                      </span>
                      <button
                        aria-label={`Increase quantity for ${item.title}`}
                        className="px-3 py-1 text-coolGray-400 hover:text-rhino-700 clef-icon-button"
                        onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                        type="button"
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="rounded-sm border border-coolGray-200 px-3 py-1 text-sm text-orange-500 hover:bg-coolGray-100 clef-button-secondary"
                      onClick={() => onRemove?.(item.id)}
                      type="button"
                    >
                      Remove
                    </button>
                    <p className="ml-auto text-sm font-semibold text-rhino-800">
                      {item.lineTotalDisplay}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="space-y-2 border-b border-coolGray-200 py-5 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-rhino-400">Subtotal</span>
                <span className="text-rhino-800">{cart?.subtotalDisplay}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-rhino-400">Shipping</span>
                <span className="text-rhino-800">{cart?.shippingTotalDisplay}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-rhino-400">Discount</span>
                <span className="text-rhino-800">{cart?.discountTotalDisplay}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-rhino-400">Tax</span>
                <span className="text-rhino-800">{cart?.taxTotalDisplay}</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 py-5">
              <h3 className="text-lg font-semibold text-rhino-800">Total</h3>
              <h3 className="text-lg font-semibold text-rhino-800">{cart?.totalDisplay}</h3>
            </div>
            <div className="flex justify-end">
              <Link
                className="rounded-sm bg-purple-500 px-4 py-3 text-sm text-white hover:bg-purple-600 clef-button-primary"
                href="/payments"
                onClick={onClose}
              >
                Go to Payment
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartDrawer;
