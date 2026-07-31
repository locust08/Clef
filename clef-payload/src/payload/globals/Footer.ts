import type { GlobalConfig } from 'payload'

import {
  globalPreview,
  globalVersions,
  publishedGlobalOrAuthenticated,
} from '../preview'

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
    read: publishedGlobalOrAuthenticated,
  },
  admin: {
    description: 'The canonical Footer preview is the Homepage.',
    preview: globalPreview('/'),
  },
  versions: globalVersions,
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
