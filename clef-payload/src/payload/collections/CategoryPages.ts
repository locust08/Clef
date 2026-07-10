import type { CollectionConfig } from 'payload'

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
    read: () => true,
  },
  labels: {
    singular: 'Category Page',
    plural: 'Category Pages',
  },
  admin: {
    useAsTitle: 'title',
  },
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
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
