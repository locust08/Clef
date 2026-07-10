export type CategorySlug = 'skincare' | 'personal-care' | 'fragrance';

export type SubcategorySlug =
  | 'anti-aging'
  | 'ocean-elixir'
  | 'sheet-mask'
  | 'facial-mask'
  | 'sunscreen'
  | 'lotion'
  | 'bath-gel'
  | 'deodorant'
  | 'rose-collection'
  | 'little-delights-collection';

export type SubcategoryConfig = {
  slug: SubcategorySlug;
  displayName: string;
};

export type CategoryConfig = {
  slug: CategorySlug;
  displayName: string;
  parentHref: string;
  subcategories: SubcategoryConfig[];
};

export const categoryConfig: Record<CategorySlug, CategoryConfig> = {
  skincare: {
    slug: 'skincare',
    displayName: 'Skincare',
    parentHref: '/shop/skincare',
    subcategories: [
      { slug: 'anti-aging', displayName: 'Anti Aging' },
      { slug: 'ocean-elixir', displayName: 'Ocean Elixir' },
      { slug: 'sheet-mask', displayName: 'Sheet Mask' },
      { slug: 'facial-mask', displayName: 'Facial Mask' },
    ],
  },
  'personal-care': {
    slug: 'personal-care',
    displayName: 'Personal Care',
    parentHref: '/shop/personal-care',
    subcategories: [
      { slug: 'sunscreen', displayName: 'Sunscreen' },
      { slug: 'lotion', displayName: 'Lotion' },
      { slug: 'bath-gel', displayName: 'Bath Gel' },
      { slug: 'deodorant', displayName: 'Deodorant' },
    ],
  },
  fragrance: {
    slug: 'fragrance',
    displayName: 'Fragrance',
    parentHref: '/shop/fragrance',
    subcategories: [
      { slug: 'rose-collection', displayName: 'Rose Collection' },
      {
        slug: 'little-delights-collection',
        displayName: 'Little Delights Collection',
      },
    ],
  },
};

export const getCategoryConfig = (category: string) =>
  categoryConfig[category as CategorySlug] ?? null;

export const getSubcategoryConfig = (category: string, subcategory: string) => {
  const config = getCategoryConfig(category);

  return (
    config?.subcategories.find((item) => item.slug === subcategory) ?? null
  );
};

export const getSubcategoryHref = (
  category: CategorySlug,
  subcategory: SubcategorySlug,
) => `/shop/${category}/${subcategory}`;
