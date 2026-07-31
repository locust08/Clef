import type { GlobalConfig } from 'payload'

import {
  globalPreview,
  globalVersions,
  publishedGlobalOrAuthenticated,
} from '../preview'

const homepageVideoPlatformOptions = [
  { label: 'TikTok', value: 'tiktok' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'Facebook', value: 'facebook' },
]

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  access: {
    read: publishedGlobalOrAuthenticated,
  },
  admin: {
    preview: globalPreview('/'),
  },
  versions: globalVersions,
  fields: [
    { name: 'heroTitle', type: 'text' },
    { name: 'heroSubtitle', type: 'textarea' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'heroButtonLabel', type: 'text' },
    { name: 'heroButtonHref', type: 'text' },
    { name: 'bestSellerTitle', type: 'text' },
    {
      name: 'bestSellerMedusaProductHandles',
      label: 'Best Seller Medusa handles',
      type: 'array',
      maxRows: 4,
      admin: {
        description:
          'Paste the Medusa product handle only, for example clef-ocean-elixir-hydrating-cleanser. Do not include /product/ or a leading slash.',
      },
      fields: [
        {
          name: 'handle',
          label: 'Medusa product handle',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'promotionBanners',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'subtitle', type: 'textarea' },
        {
          name: 'images',
          label: 'Banner images',
          type: 'array',
          admin: {
            description:
              'Add one or more images. Multiple images rotate automatically on the storefront.',
          },
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
        {
          name: 'image',
          label: 'Existing banner image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description:
              'Kept for existing content. It is shown first, followed by any Banner images above.',
          },
        },
        { name: 'href', type: 'text' },
        { name: 'isActive', type: 'checkbox', defaultValue: true },
      ],
    },
    { name: 'newLaunchTitle', type: 'text' },
    {
      name: 'newLaunchMedusaProductHandles',
      label: 'New Launch Medusa handles',
      type: 'array',
      admin: {
        description:
          'Paste Medusa product handles only. Products and prices are always loaded live from Medusa.',
      },
      fields: [
        {
          name: 'handle',
          label: 'Medusa product handle',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'sections',
      label: 'Page sections',
      type: 'array',
      admin: {
        description:
          'Add, remove, drag to reorder, or disable homepage sections. Content for each section is edited in the matching fields on this page.',
        initCollapsed: true,
      },
      defaultValue: [
        { section: 'hero', isEnabled: true },
        { section: 'categories', isEnabled: true },
        { section: 'best-sellers', isEnabled: true },
        { section: 'new-launch', isEnabled: true },
        { section: 'social', isEnabled: true },
        { section: 'testimonials', isEnabled: true },
      ],
      fields: [
        {
          name: 'section',
          label: 'Section to display',
          type: 'select',
          required: true,
          options: [
            { label: 'Hero and promotion banners', value: 'hero' },
            { label: 'Category cards', value: 'categories' },
            { label: 'Best Seller products (Medusa)', value: 'best-sellers' },
            { label: 'New Launch products (Medusa)', value: 'new-launch' },
            { label: 'Social videos', value: 'social' },
            { label: 'Customer reviews', value: 'testimonials' },
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
        { name: 'title', type: 'text' },
        { name: 'videoUrl', type: 'text' },
        { name: 'thumbnail', type: 'upload', relationTo: 'media' },
        { name: 'description', type: 'textarea' },
        { name: 'isActive', type: 'checkbox', defaultValue: true },
        { name: 'displayOrder', type: 'number', defaultValue: 0 },
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
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text' },
        { name: 'review', type: 'textarea', required: true },
        { name: 'avatar', type: 'upload', relationTo: 'media' },
        { name: 'isActive', type: 'checkbox', defaultValue: true },
        { name: 'displayOrder', type: 'number', defaultValue: 0 },
      ],
    },
  ],
}
