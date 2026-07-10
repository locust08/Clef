import type { GlobalConfig } from 'payload'

const platformOptions = [
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

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: platformOptions,
        },
        {
          name: 'url',
          type: 'text',
        },
        {
          name: 'label',
          type: 'text',
        },
      ],
    },
    {
      name: 'quickLinks',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'href',
          type: 'text',
        },
      ],
    },
    {
      name: 'copyrightText',
      type: 'text',
    },
  ],
}
