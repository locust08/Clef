import type { Field, GlobalConfig } from 'payload'

import {
  globalPreview,
  globalVersions,
  publishedGlobalOrAuthenticated,
} from '../preview'

type CategoryCardDefault = {
  title: string
  image: null
  href: string
  badgeLabel?: string
}

type AllProductsCategoryDefault = {
  heroTitle: string
  heroImage: null
  heroCtaLabel: string
  categoryCards?: CategoryCardDefault[]
  bannerEyebrow?: string
  bannerTitle?: string
  bannerDescription?: string
  bannerVideoUrl?: string
}

export const ALL_PRODUCTS_PAGES_DEFAULTS = {
  skincare: {
    heroTitle: 'Take Care Of Your Performance Every Day.',
    heroImage: null,
    heroCtaLabel: 'Start Buying',
    categoryCards: [
      { title: 'Anti Aging', image: null, href: '/shop/skincare/anti-aging' },
      { title: 'Ocean Elixir', image: null, href: '/shop/skincare/ocean-elixir' },
      { title: 'Sheet Mask', image: null, href: '/shop/skincare/sheet-mask' },
      { title: 'Facial Mask', image: null, href: '/shop/skincare/facial-mask' },
    ],
  },
  personalCare: {
    heroTitle: 'Take Care Of Your Performance Every Day.',
    heroImage: null,
    heroCtaLabel: 'Start Buying',
    categoryCards: [
      {
        title: 'Deodorant',
        image: null,
        href: '/shop/personal-care/deodorant',
        badgeLabel: 'NEW LAUNCH',
      },
      { title: 'Sunscreen', image: null, href: '/shop/personal-care/sunscreen' },
      { title: 'Bath Gel', image: null, href: '/shop/personal-care/bath-gel' },
      { title: 'Lotion', image: null, href: '/shop/personal-care/lotion' },
    ],
  },
  fragrance: {
    heroTitle: 'Take Care Of Your Performance Every Day.',
    heroImage: null,
    heroCtaLabel: 'Start Buying',
    bannerEyebrow: 'Watch Now!',
    bannerTitle: 'Live a little and your life will come alive',
    bannerDescription:
      'CLEF Fragrance is a collection of fine fragrances that awaken your sense of ritual.',
    bannerVideoUrl: 'https://www.youtube.com/embed/_9VUPq3SxOc',
  },
} satisfies Record<string, AllProductsCategoryDefault>

const heroFields: Field[] = [
  {
    name: 'heroTitle',
    label: 'Hero title',
    type: 'text',
    required: true,
  },
  {
    name: 'heroImage',
    label: 'Hero background image',
    type: 'upload',
    relationTo: 'media',
  },
  {
    name: 'heroCtaLabel',
    label: 'Hero button label',
    type: 'text',
    required: true,
    admin: {
      description:
        'The button always scrolls to the Medusa product section. Its destination is not editable.',
    },
  },
]

const categoryCardsField = (defaults: CategoryCardDefault[]): Field => ({
  name: 'categoryCards',
  label: 'Category image cards',
  type: 'array',
  minRows: 4,
  maxRows: 4,
  defaultValue: defaults,
  admin: {
    description:
      'Edit the four existing category cards. Their order controls their position in the current mosaic layout.',
    initCollapsed: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'href',
      label: 'Destination path',
      type: 'text',
      required: true,
      admin: {
        description: 'Use a storefront path such as /shop/skincare/anti-aging.',
      },
    },
    {
      name: 'badgeLabel',
      label: 'Optional badge',
      type: 'text',
    },
  ],
})

export const AllProductsPages: GlobalConfig = {
  slug: 'all-products-pages',
  label: 'All Products Pages',
  access: {
    read: publishedGlobalOrAuthenticated,
  },
  admin: {
    description:
      'Preview opens the canonical Skincare page. The Personal Care and Fragrance tabs render at /all-personal-care and /fragrance.',
    preview: globalPreview('/all-skincare'),
  },
  versions: globalVersions,
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Skincare',
          fields: [
            {
              name: 'skincare',
              type: 'group',
              defaultValue: ALL_PRODUCTS_PAGES_DEFAULTS.skincare,
              fields: [
                ...heroFields,
                categoryCardsField(ALL_PRODUCTS_PAGES_DEFAULTS.skincare.categoryCards),
              ],
            },
          ],
        },
        {
          label: 'Personal Care',
          fields: [
            {
              name: 'personalCare',
              type: 'group',
              defaultValue: ALL_PRODUCTS_PAGES_DEFAULTS.personalCare,
              fields: [
                ...heroFields,
                categoryCardsField(ALL_PRODUCTS_PAGES_DEFAULTS.personalCare.categoryCards),
              ],
            },
          ],
        },
        {
          label: 'Fragrances',
          fields: [
            {
              name: 'fragrance',
              type: 'group',
              defaultValue: ALL_PRODUCTS_PAGES_DEFAULTS.fragrance,
              fields: [
                ...heroFields,
                {
                  name: 'bannerEyebrow',
                  label: 'Banner eyebrow',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'bannerTitle',
                  label: 'Banner title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'bannerDescription',
                  label: 'Banner description',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'bannerVideoUrl',
                  label: 'Banner video URL',
                  type: 'text',
                  required: true,
                  admin: {
                    description:
                      'Paste a YouTube watch, share, or embed URL. The storefront converts it to an embeddable URL.',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
