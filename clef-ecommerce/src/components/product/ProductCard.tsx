import Link from 'next/link';
import React from 'react';
import { useFavourites } from '../../context/FavouritesContext';
import { useCart } from '../../context/MockCartContext';
import type { StorefrontProduct } from '../../lib/medusa-products';

type ProductCardProps = {
  product: StorefrontProduct;
  showActions?: boolean;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, showActions = true }) => {
  const { addMedusaItem } = useCart();
  const { isFavourite, toggleFavourite } = useFavourites();
  const [message, setMessage] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const defaultVariant = product.variants[0];
  const favourited = isFavourite(product.id);

  const handleAddToCart = async () => {
    if (!defaultVariant) {
      setMessage('This product is unavailable.');
      return;
    }

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      await addMedusaItem({
        product,
        quantity: 1,
        variantId: defaultVariant.id,
      });
      setMessage('Added to cart.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to add to cart.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="group mb-10 flex h-full w-full flex-col">
      <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-xl bg-rose-50 p-8">
        <Link
          aria-label={`Open ${product.name}`}
          className="flex h-full w-full items-center justify-center clef-link-highlight"
          href={`/product/${product.handle}`}
        >
          {(product.isNewLaunch || product.isBestSeller) && (
            <div className="absolute left-5 top-5 z-10 rounded-full bg-orange-500 px-3 py-1 text-center text-xs font-bold uppercase text-white">
              {product.isNewLaunch ? 'New' : 'Best'}
            </div>
          )}
          {product.image ? (
            <img className="h-full w-full object-contain" src={product.image} alt={product.name} />
          ) : (
            <span className="text-sm font-medium text-rhino-400">No image</span>
          )}
        </Link>
        {showActions && (
          <button
            aria-label={favourited ? 'Remove from favourites' : 'Add to favourites'}
            className={`absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition duration-200 clef-icon-button ${
              favourited ? 'text-red-500' : 'text-rhino-300 hover:text-red-500'
            }`}
            onClick={() => {
              void toggleFavourite(product.id);
            }}
            type="button"
          >
            <svg
              aria-hidden="true"
              fill={favourited ? 'currentColor' : 'none'}
              height={17}
              viewBox="0 0 16 17"
              width={16}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.1942 3.24105C13.8537 2.90039 13.4494 2.63015 13.0045 2.44578C12.5595 2.2614 12.0826 2.1665 11.6009 2.1665C11.1192 2.1665 10.6423 2.2614 10.1973 2.44578C9.75236 2.63015 9.34807 2.90039 9.00757 3.24105L8.3009 3.94772L7.59423 3.24105C6.90644 2.55326 5.97359 2.16686 5.0009 2.16686C4.02821 2.16686 3.09536 2.55326 2.40757 3.24105C1.71977 3.92885 1.33337 4.8617 1.33337 5.83439C1.33337 6.80708 1.71977 7.73993 2.40757 8.42772L3.11423 9.13439L8.3009 14.3211L13.4876 9.13439L14.1942 8.42772C14.5349 8.08722 14.8051 7.68293 14.9895 7.23796C15.1739 6.79298 15.2688 6.31605 15.2688 5.83439C15.2688 5.35273 15.1739 4.87579 14.9895 4.43082C14.8051 3.98584 14.5349 3.58156 14.1942 3.24105Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        )}
      </div>
      <Link className="block clef-link-highlight" href={`/product/${product.handle}`}>
        {(product.isNewLaunch || product.isBestSeller) && (
          <span className="sr-only">{product.isNewLaunch ? 'New' : 'Best'} </span>
        )}
        <p className="mb-2 min-h-[16px] text-xs font-bold uppercase tracking-widest text-purple-500">{product.categoryLabel}</p>
        <p className="min-h-[56px] text-lg leading-7 text-slate-800 line-clamp-2">{product.name}</p>
        <p className="mt-1 min-h-[24px] text-lg leading-6 text-slate-400">{product.priceDisplay}</p>
      </Link>
      {showActions && (
        <div className="mt-auto pt-4">
          <button
            className="h-12 w-full rounded-sm bg-purple-500 px-3 py-2 text-sm font-medium text-white transition duration-200 hover:bg-purple-600 disabled:cursor-not-allowed disabled:bg-purple-300 clef-button-primary"
            disabled={isSubmitting || !defaultVariant}
            onClick={() => {
              void handleAddToCart();
            }}
            type="button"
          >
            {isSubmitting ? 'Adding...' : defaultVariant ? 'Add to cart' : 'Unavailable'}
          </button>
          {message && <p className="mt-2 text-xs text-rhino-400">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
