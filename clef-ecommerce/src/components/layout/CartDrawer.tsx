import Link from 'next/link';
import type { CartDisplayItem } from '../../context/MockCartContext';

type CartDrawerProps = {
  isOpen: boolean;
  items?: CartDisplayItem[];
  onClose?: () => void;
};

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, items = [], onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <section className="z-50 fixed inset-0 h-full w-full bg-gray-800 bg-opacity-80 overflow-hidden">
      <button aria-label="Close cart" className="absolute inset-0 h-full w-full clef-icon-button" onClick={onClose} type="button" />
      <div className="absolute z-50 right-0 top-0 h-full w-full max-w-2xl overflow-auto bg-white">
        <div className="p-6 border-b border-coolGray-200 flex items-center justify-between">
          <h2 className="text-rhino-800 text-lg font-semibold">Shopping Cart</h2>
          <button className="text-rhino-400 hover:text-rhino-700 clef-icon-button" onClick={onClose} type="button">Close</button>
        </div>
        {items.length === 0 ? (
          <div className="p-8 text-center">
            <h3 className="font-heading text-2xl font-semibold text-rhino-700 mb-2">Your cart is empty</h3>
            <p className="text-rhino-400 text-sm mb-6">Add a product to begin checkout.</p>
            <Link className="inline-block bg-purple-500 py-3 px-4 rounded-sm text-white text-sm hover:bg-purple-600 clef-button-primary" href="/shop/skincare">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="p-6">
            {items.map((item) => (
              <div className="flex gap-5 border-b border-coolGray-200 py-4" key={item.id}>
                <img className="h-24 w-24 rounded-lg object-cover" src={item.image} alt={item.name} />
                <div>
                  <h3 className="text-rhino-800">{item.name}</h3>
                  <p className="text-rhino-300">
                    {item.priceDisplay ?? `MYR${(item.salePrice ?? item.price).toFixed(2)}`}
                    {item.quantity > 1 ? ` x ${item.quantity}` : ''}
                  </p>
                  {item.metadata && (
                    <div className="mt-2 space-y-1 text-xs text-rhino-400">
                      {item.metadata.scent_1 && <p>Scent 1: {item.metadata.scent_1}</p>}
                      {item.metadata.scent_2 && <p>Scent 2: {item.metadata.scent_2}</p>}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div className="pt-6 text-right">
              <Link className="bg-purple-500 py-3 px-4 rounded-sm text-white text-sm hover:bg-purple-600 clef-button-primary" href="/payments">
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
