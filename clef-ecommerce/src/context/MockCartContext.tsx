import React from 'react';
import CartDrawer from '../components/layout/CartDrawer';
import {
  addMedusaLineItem,
  getActiveCart,
  getCartErrorMessage,
  removeMedusaLineItem,
  type StorefrontCart,
  updateMedusaLineItem,
} from '../lib/medusa-cart';
import type { StorefrontProduct } from '../lib/medusa-products';

type CartContextValue = {
  cart: StorefrontCart | null;
  items: StorefrontCart['items'];
  itemCount: number;
  subtotalDisplay: string;
  isCartLoading: boolean;
  cartError: string | null;
  addMedusaItem: (input: {
    product: StorefrontProduct;
    variantId: string;
    quantity: number;
    metadata?: Record<string, string>;
  }) => Promise<void>;
  updateLineItem: (lineItemId: string, quantity: number) => Promise<void>;
  removeLineItem: (lineItemId: string) => Promise<void>;
  refreshCart: () => Promise<void>;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = React.createContext<CartContextValue | null>(null);

export const MockCartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [cart, setCart] = React.useState<StorefrontCart | null>(null);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isCartLoading, setIsCartLoading] = React.useState(true);
  const [cartError, setCartError] = React.useState<string | null>(null);

  const refreshCart = React.useCallback(async () => {
    setIsCartLoading(true);
    setCartError(null);

    try {
      setCart(await getActiveCart());
    } catch (error) {
      setCart(null);
      setCartError(getCartErrorMessage(error));
    } finally {
      setIsCartLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void refreshCart();
  }, [refreshCart]);

  const addMedusaItem = React.useCallback(
    async ({
      variantId,
      quantity,
      metadata,
    }: {
      product: StorefrontProduct;
      variantId: string;
      quantity: number;
      metadata?: Record<string, string>;
    }) => {
      if (!variantId) {
        throw new Error('Select an available variant before adding this item.');
      }

      setCartError(null);

      try {
        const updatedCart = await addMedusaLineItem({
          variantId,
          quantity: Math.max(1, quantity),
          metadata,
        });
        setCart(updatedCart);
        setIsCartOpen(true);
      } catch (error) {
        const message = getCartErrorMessage(error);
        setCartError(message);
        throw new Error(message);
      }
    },
    [],
  );

  const updateLineItem = React.useCallback(async (lineItemId: string, quantity: number) => {
    setCartError(null);

    try {
      setCart(await updateMedusaLineItem(lineItemId, quantity));
    } catch (error) {
      setCartError(getCartErrorMessage(error));
    }
  }, []);

  const removeLineItem = React.useCallback(async (lineItemId: string) => {
    setCartError(null);

    try {
      setCart(await removeMedusaLineItem(lineItemId));
    } catch (error) {
      setCartError(getCartErrorMessage(error));
    }
  }, []);

  const items = React.useMemo(() => cart?.items ?? [], [cart?.items]);
  const value = React.useMemo(
    () => ({
      cart,
      items,
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
      subtotalDisplay: cart?.subtotalDisplay ?? 'RM 0.00',
      isCartLoading,
      cartError,
      addMedusaItem,
      updateLineItem,
      removeLineItem,
      refreshCart,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
    }),
    [
      addMedusaItem,
      cart,
      cartError,
      isCartLoading,
      items,
      refreshCart,
      removeLineItem,
      updateLineItem,
    ],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer
        cart={cart}
        error={cartError}
        isLoading={isCartLoading}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRemove={removeLineItem}
        onUpdateQuantity={updateLineItem}
      />
    </CartContext.Provider>
  );
};

export const GlobalCartDrawer = CartDrawer;

export function useCart() {
  const context = React.useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside MockCartProvider.');
  }

  return context;
}

export const useMockCart = useCart;
