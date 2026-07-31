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

export const VideoSection: GlobalConfig = {
  slug: 'video-section',
  label: 'Video Section',
  access: {
    read: publishedGlobalOrAuthenticated,
  },
  admin: {
    description:
      'Manual video entries only. Do not connect this content to official social platform APIs. The canonical preview is the Homepage.',
    preview: globalPreview('/'),
  },
  versions: globalVersions,
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
    },
    {
      name: 'videos',
      type: 'array',
      admin: {
        description:
          'Add video URLs manually. Mark one or more active videos per platform and use display order to control which active video appears first.',
      },
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: platformOptions,
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
  ],
}
