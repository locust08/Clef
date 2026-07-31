import React from 'react';
import type { AllProductsCategoryCard } from '../../lib/cms';

type CategoryImageCardsSectionProps = {
  cards: AllProductsCategoryCard[];
};

type CategoryCardProps = {
  card: AllProductsCategoryCard;
  titlePosition: 'bottom-left' | 'center';
  fillHeight?: boolean;
};

const CategoryCard: React.FC<CategoryCardProps> = ({
  card,
  titlePosition,
  fillHeight = false,
}) => (
  <a
    aria-label={`Shop ${card.title}`}
    className={`relative block overflow-hidden rounded-xl clef-link-highlight ${
      fillHeight ? 'h-full' : ''
    }`}
    href={card.href}
  >
    <img
      alt={card.image.alt || card.title}
      className={`w-full object-cover ${fillHeight ? 'h-full' : ''}`}
      src={card.image.src}
    />
    {card.badgeLabel && (
      <div className="absolute left-5 top-5">
        <span className="inline-block rounded-full bg-pink-500 px-3 py-1 text-2xs font-bold uppercase text-white">
          {card.badgeLabel}
        </span>
      </div>
    )}
    <div
      className={
        titlePosition === 'bottom-left'
          ? 'absolute bottom-6 left-6'
          : 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
      }
    >
      <h2 className="text-center font-heading text-3xl font-semibold text-white">
        {card.title}
      </h2>
    </div>
  </a>
);

const CategoryImageCardsSection: React.FC<CategoryImageCardsSectionProps> = ({
  cards,
}) => {
  const [first, second, third, fourth] = cards;

  if (!first || !second || !third || !fourth) {
    return null;
  }

  return (
    <section className="relative overflow-hidden py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/2">
            <div className="flex h-full flex-col justify-between">
              <div className="flex flex-wrap">
                <div className="w-full px-4 pb-4 lg:w-1/2 lg:pb-0">
                  <CategoryCard card={first} titlePosition="bottom-left" />
                </div>
                <div className="w-full px-4 lg:w-1/2">
                  <CategoryCard card={second} titlePosition="center" />
                </div>
              </div>
              <div className="w-full px-4 pt-4">
                <CategoryCard card={third} titlePosition="center" />
              </div>
            </div>
          </div>
          <div className="w-full px-4 pt-4 lg:w-1/2 lg:pt-0">
            <CategoryCard card={fourth} fillHeight titlePosition="center" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryImageCardsSection;
