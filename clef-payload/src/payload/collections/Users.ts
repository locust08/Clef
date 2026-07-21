import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    cookies: {
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
    },
    verify: true,
  },
  admin: {
    useAsTitle: 'email',
  },
  fields: [],
  hooks: {
    afterRead: [
      ({ doc }) => {
        // Users created before verification was enabled have no value. Treat
        // only that legacy null state as verified; new unverified users are
        // explicitly false and must still complete email verification.
        if (doc._verified == null) {
          return { ...doc, _verified: true }
        }

        return doc
      },
    ],
  },
}
