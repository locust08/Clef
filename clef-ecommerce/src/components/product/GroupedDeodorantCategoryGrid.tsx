import React from 'react';
import Link from 'next/link';
import { getGroupedDeodorantCards } from '../../lib/deodorant-groups';
import type { StorefrontProduct } from '../../lib/medusa-products';

type GroupedDeodorantCategoryGridProps = {
  products: StorefrontProduct[];
  medusaError?: string | null;
};

const GroupedDeodorantCategoryGrid: React.FC<GroupedDeodorantCategoryGridProps> = ({
  products,
  medusaError = null,
}) => {
  const cards = getGroupedDeodorantCards(products);

  if (medusaError) {
    return (
      <div className="rounded-xl border border-red-100 bg-white p-8 text-center">
        <h2 className="mb-2 font-heading text-2xl font-semibold text-rhino-700">
          Unable to load products.
        </h2>
        <p className="text-sm text-rhino-400">{medusaError}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap -mx-4">
      {cards.map((card) => (
        <div className="w-full px-4 md:w-1/2" key={card.id}>
          <Link className="group mb-10 block clef-link-highlight" href={card.href}>
            <div className="relative mb-4 flex w-full aspect-square items-center justify-center overflow-hidden rounded-xl bg-rose-50 p-8">
              <div className="absolute left-5 top-5 z-10 rounded-full bg-orange-500 px-3 py-1 text-center text-xs font-bold uppercase text-white">
                {card.badge}
              </div>
              {card.image ? (
                <img
                  className="h-full w-full object-contain"
                  src={card.image}
                  alt={card.name}
                />
              ) : (
                <span className="text-sm font-medium text-rhino-400">
                  No image
                </span>
              )}
            </div>
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-purple-500">
              Deodorant
            </p>
            <h2 className="text-xl font-semibold leading-snug text-slate-800">
              {card.name}
            </h2>
            <p className="mt-2 line-clamp-2 text-sm text-rhino-400">
              {card.description}
            </p>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-slate-500">{card.priceDisplay}</span>
              {card.compareAtPriceDisplay && (
                <span className="text-xs text-rhino-400 line-through">
                  {card.compareAtPriceDisplay}
                </span>
              )}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default GroupedDeodorantCategoryGrid;
