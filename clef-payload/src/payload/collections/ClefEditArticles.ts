import type { CollectionConfig } from 'payload'

import {
  collectionPreview,
  collectionVersions,
  publishedOrAuthenticated,
} from '../preview'

export const ClefEditArticles: CollectionConfig = {
  slug: 'clef-edit-articles',
  access: {
    read: publishedOrAuthenticated,
  },
  labels: {
    singular: 'CLEF Edit Article',
    plural: 'CLEF Edit Articles',
  },
  admin: {
    defaultColumns: ['title', 'slug', 'displayOrder', 'isActive'],
    preview: collectionPreview((doc) => {
      const slug = typeof doc.slug === 'string' ? doc.slug : ''
      return slug ? `/clef-edit/${slug}` : null
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
      name: 'authorName',
      type: 'text',
      required: true,
    },
    {
      name: 'authorRole',
      type: 'text',
    },
    {
      name: 'authorImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'publishedDate',
      type: 'text',
      required: true,
    },
    {
      name: 'categoryLabel',
      type: 'text',
      defaultValue: 'Skincare',
      required: true,
    },
    {
      name: 'readTime',
      type: 'text',
      defaultValue: '8 min read',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'questions',
      type: 'array',
      fields: [
        {
          name: 'productHandle',
          type: 'text',
          admin: {
            description: 'Medusa product handle. This makes the recommendation open the live product page.',
          },
        },
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'productSuggestions',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 1,
      required: true,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
