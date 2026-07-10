import React from 'react';
import CartDrawer from '../components/layout/CartDrawer';
import { addMedusaLineItem } from '../lib/medusa-cart';
import type { StorefrontProduct } from '../lib/medusa-products';

const CART_STORAGE_KEY = 'clef_mock_cart';

export type CartDisplayItem = {
  id: string;
  variantId?: string;
  handle: string;
  name: string;
  category: string;
  subcategory?: string | null;
  price: number;
  salePrice?: number | null;
  priceDisplay?: string;
  image: string;
  description: string;
  quantity: number;
  metadata?: Record<string, string>;
};

type MockCartContextValue = {
  items: CartDisplayItem[];
  itemCount: number;
  addItem: (product: CartDisplayItem) => void;
  addMedusaItem: (input: {
    product: StorefrontProduct;
    variantId: string;
    quantity: number;
    metadata?: Record<string, string>;
  }) => Promise<void>;
  openCart: () => void;
  closeCart: () => void;
};

const MockCartContext = React.createContext<MockCartContextValue | null>(null);

export const MockCartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [items, setItems] = React.useState<CartDisplayItem[]>([]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  React.useEffect(() => {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!storedCart) {
      return;
    }

    try {
      setItems(JSON.parse(storedCart) as CartDisplayItem[]);
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = React.useCallback((product: CartDisplayItem) => {
    setItems((currentItems) => [...currentItems, product]);
    setIsCartOpen(true);
  }, []);

  const addMedusaItem = React.useCallback(
    async ({
      product,
      variantId,
      quantity,
      metadata,
    }: {
      product: StorefrontProduct;
      variantId: string;
      quantity: number;
      metadata?: Record<string, string>;
    }) => {
      await addMedusaLineItem({
        variantId,
        quantity,
        metadata,
      });

      setItems((currentItems) => [
        ...currentItems,
        {
          id: `${product.id}-${variantId}-${Date.now()}`,
          variantId,
          handle: product.handle,
          name: product.name,
          category: product.category,
          subcategory: product.subcategory,
          price: product.price,
          salePrice: product.salePrice ?? null,
          priceDisplay: product.priceDisplay,
          image: product.image,
          description: product.description,
          quantity,
          metadata,
        },
      ]);
      setIsCartOpen(true);
    },
    [],
  );

  const value = React.useMemo(
    () => ({
      items,
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
      addItem,
      addMedusaItem,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
    }),
    [addItem, addMedusaItem, items],
  );

  return (
    <MockCartContext.Provider value={value}>
      {children}
      <GlobalCartDrawer isOpen={isCartOpen} items={items} onClose={() => setIsCartOpen(false)} />
    </MockCartContext.Provider>
  );
};

export const GlobalCartDrawer = CartDrawer;

export function useMockCart() {
  const context = React.useContext(MockCartContext);

  if (!context) {
    throw new Error('useMockCart must be used inside MockCartProvider.');
  }

  return context;
}
