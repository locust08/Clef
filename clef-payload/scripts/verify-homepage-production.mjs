const expectedOrigin = 'https://clef-payload-preview.easondev.workers.dev'
const configuredOrigin =
  process.env.PAYLOAD_PUBLIC_SERVER_URL || expectedOrigin
const origin = new URL(configuredOrigin)

if (origin.origin !== expectedOrigin || origin.protocol !== 'https:') {
  throw new Error('Unexpected Payload production origin')
}

const response = await fetch(
  new URL('/api/globals/homepage?depth=2', origin),
  {
    cache: 'no-store',
    headers: {
      accept: 'application/json',
      'cache-control': 'no-cache',
    },
  },
)

if (!response.ok) {
  throw new Error(`Payload Homepage returned HTTP ${response.status}`)
}

const homepage = await response.json()

if (!homepage.id || homepage.heroTitle !== 'Take care of your skin every day.') {
  throw new Error('Payload Homepage canonical content is missing')
}

if (homepage._status && homepage._status !== 'published') {
  throw new Error('Payload Homepage public endpoint returned draft content')
}

if (homepage.promotionBanners?.length !== 2) {
  throw new Error('Payload Homepage must contain exactly two promotion banners')
}

const media = [
  homepage.heroImage,
  ...homepage.promotionBanners.flatMap((banner) => [
    banner.image,
    ...(banner.images?.map((row) => row.image) ?? []),
  ]),
  ...(homepage.homepageVideos?.map((video) => video.thumbnail) ?? []),
  ...(homepage.customerReviews?.map((review) => review.avatar) ?? []),
].filter((value) => value && typeof value === 'object')

for (const item of media) {
  const mediaURL = new URL(item.url)

  if (
    mediaURL.protocol !== 'https:' ||
    mediaURL.origin !== expectedOrigin ||
    ['localhost', '127.0.0.1', '::1'].includes(mediaURL.hostname)
  ) {
    throw new Error('Payload returned an invalid production media URL')
  }

  const mediaResponse = await fetch(mediaURL, {
    cache: 'no-store',
    headers: {
      'cache-control': 'no-cache',
    },
  })

  if (!mediaResponse.ok) {
    throw new Error(
      `Payload media failed for ${item.filename}: HTTP ${mediaResponse.status}`,
    )
  }
}

console.log(
  JSON.stringify({
    status: response.status,
    homepageID: homepage.id,
    heroTitle: homepage.heroTitle,
    promotionBanners: homepage.promotionBanners.length,
    mediaVerified: media.length,
    publicAccess: 'verified',
    draftContent: 'not-returned',
  }),
)
