import type { CollectionConfig } from 'payload'

import {
  collectionPreview,
  collectionVersions,
  publishedOrAuthenticated,
} from '../preview'

const parentCategoryOptions = [
  {
    label: 'Skincare',
    value: 'skincare',
  },
  {
    label: 'Personal Care',
    value: 'personal-care',
  },
  {
    label: 'Fragrance',
    value: 'fragrance',
  },
]

export const CategoryPages: CollectionConfig = {
  slug: 'category-pages',
  access: {
    read: publishedOrAuthenticated,
  },
  labels: {
    singular: 'Category Page',
    plural: 'Category Pages',
  },
  admin: {
    preview: collectionPreview((doc) => {
      const parent =
        typeof doc.parentCategory === 'string' ? doc.parentCategory : ''
      const slug = typeof doc.slug === 'string' ? doc.slug : ''
      return parent && slug ? `/shop/${parent}/${slug}` : null
    }),
    useAsTitle: 'title',
  },
  versions: collectionVersions,
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'parentCategory',
      type: 'select',
      options: parentCategoryOptions,
      required: true,
    },
    {
      name: 'headerTitle',
      type: 'text',
    },
    {
      name: 'headerSubtitle',
      type: 'textarea',
    },
    {
      name: 'headerImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'topMedusaProductHandles',
      type: 'array',
      maxRows: 3,
      fields: [
        {
          name: 'handle',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'videoTitle',
      type: 'text',
    },
    {
      name: 'videoUrl',
      type: 'text',
    },
    {
      name: 'videoThumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'sections',
      label: 'Page sections',
      type: 'array',
      admin: {
        description:
          'Add, remove, drag to reorder, or disable sections for this category page.',
        initCollapsed: true,
      },
      defaultValue: [
        { section: 'navigation', isEnabled: true },
        { section: 'hero', isEnabled: true },
        { section: 'benefits', isEnabled: true },
        { section: 'products', isEnabled: true },
        { section: 'video', isEnabled: true },
        { section: 'editorial', isEnabled: true },
        { section: 'footer', isEnabled: true },
      ],
      fields: [
        {
          name: 'section',
          label: 'Section to display',
          type: 'select',
          required: true,
          options: [
            { label: 'Category navigation', value: 'navigation' },
            { label: 'Hero and featured Medusa products', value: 'hero' },
            { label: 'Trust benefits', value: 'benefits' },
            { label: 'Medusa product grid', value: 'products' },
            { label: 'Video', value: 'video' },
            { label: 'Editorial banners', value: 'editorial' },
            { label: 'Footer', value: 'footer' },
          ],
        },
        {
          name: 'isEnabled',
          label: 'Show this section',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
