import type { GlobalConfig } from 'payload'

const homepageVideoPlatformOptions = [
  {
    label: 'TikTok',
    value: 'tiktok',
  },
  {
    label: 'Instagram',
    value: 'instagram',
  },
  {
    label: 'Facebook',
    value: 'facebook',
  },
]

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroTitle',
      type: 'text',
    },
    {
      name: 'heroSubtitle',
      type: 'textarea',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'heroButtonLabel',
      type: 'text',
    },
    {
      name: 'heroButtonHref',
      type: 'text',
    },
    {
      name: 'bestSellerTitle',
      type: 'text',
    },
    {
      name: 'bestSellerMedusaProductHandles',
      type: 'array',
      maxRows: 4,
      fields: [
        {
          name: 'handle',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'promotionBanners',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'subtitle',
          type: 'textarea',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'href',
          type: 'text',
        },
        {
          name: 'isActive',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'newLaunchTitle',
      type: 'text',
    },
    {
      name: 'newLaunchMedusaProductHandles',
      type: 'array',
      fields: [
        {
          name: 'handle',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'homepageVideos',
      type: 'array',
      maxRows: 3,
      admin: {
        description:
          'Manual homepage video cards only. Add TikTok, Instagram, and Facebook URLs manually; no social media API sync is used.',
      },
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: homepageVideoPlatformOptions,
          required: true,
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'videoUrl',
          type: 'text',
        },
        {
          name: 'thumbnail',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'isActive',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'displayOrder',
          type: 'number',
          defaultValue: 0,
        },
      ],
    },
    {
      name: 'customerReviews',
      type: 'array',
      admin: {
        description:
          'Homepage customer review carousel. Add, edit, reorder, or hide reviews here.',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
        },
        {
          name: 'review',
          type: 'textarea',
          required: true,
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'isActive',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'displayOrder',
          type: 'number',
          defaultValue: 0,
        },
      ],
    },
  ],
}
