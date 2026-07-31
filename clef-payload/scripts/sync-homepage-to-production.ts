import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { getPayload } from 'payload'

import { disposePayloadCloudflareProxy } from '../payload.config'

const EXPECTED_PRODUCTION_ORIGIN =
  'https://clef-payload-preview.easondev.workers.dev'
const projectDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
)
const applyChanges = process.argv.includes('--apply')
const sourceURL = new URL(
  process.env.PAYLOAD_HOMEPAGE_SOURCE_URL || 'http://localhost:3001',
)
const productionURL = new URL(
  process.env.PAYLOAD_PUBLIC_SERVER_URL || EXPECTED_PRODUCTION_ORIGIN,
)
const backupPath = process.env.PAYLOAD_PRODUCTION_BACKUP_PATH?.trim()

type SourceMedia = {
  id: number | string
  alt?: string | null
  filename?: string | null
  filesize?: number | null
}

type HomepageSection =
  | 'hero'
  | 'categories'
  | 'best-sellers'
  | 'new-launch'
  | 'social'
  | 'testimonials'

type HomepageVideoPlatform = 'tiktok' | 'instagram' | 'facebook'

type SourceHomepage = {
  id?: number | string | null
  heroTitle?: string | null
  heroSubtitle?: string | null
  heroImage?: SourceMedia | number | string | null
  heroButtonLabel?: string | null
  heroButtonHref?: string | null
  bestSellerTitle?: string | null
  bestSellerMedusaProductHandles?: { handle?: string | null }[] | null
  promotionBanners?:
    | {
        title?: string | null
        subtitle?: string | null
        image?: SourceMedia | number | string | null
        images?: { image?: SourceMedia | number | string | null }[] | null
        href?: string | null
        isActive?: boolean | null
      }[]
    | null
  newLaunchTitle?: string | null
  newLaunchMedusaProductHandles?: { handle?: string | null }[] | null
  sections?:
    | {
        section?: HomepageSection | null
        isEnabled?: boolean | null
      }[]
    | null
  homepageVideos?:
    | {
        platform?: HomepageVideoPlatform | null
        title?: string | null
        videoUrl?: string | null
        thumbnail?: SourceMedia | number | string | null
        description?: string | null
        isActive?: boolean | null
        displayOrder?: number | null
      }[]
    | null
  customerReviews?:
    | {
        name?: string | null
        role?: string | null
        review?: string | null
        avatar?: SourceMedia | number | string | null
        isActive?: boolean | null
        displayOrder?: number | null
      }[]
    | null
}

const isSourceMedia = (value: unknown): value is SourceMedia =>
  Boolean(
    value &&
      typeof value === 'object' &&
      'id' in value &&
      'filename' in value,
  )

const normalizeHandle = (value: string | null | undefined) =>
  value
    ?.trim()
    .replace(/^https?:\/\/[^/]+\//, '')
    .replace(/^(?:product|products)\//, '')
    .replace(/^\/+/, '') || ''

const requireHomepageSection = (
  value: HomepageSection | null | undefined,
): HomepageSection => {
  if (!value) {
    throw new Error('Homepage section is missing its required section value')
  }

  return value
}

const requireVideoPlatform = (
  value: HomepageVideoPlatform | null | undefined,
): HomepageVideoPlatform => {
  if (!value) {
    throw new Error('Homepage video is missing its required platform value')
  }

  return value
}

const validateExecution = () => {
  if (
    !['localhost', '127.0.0.1', '::1'].includes(sourceURL.hostname) ||
    sourceURL.username ||
    sourceURL.password
  ) {
    throw new Error('Homepage source must be a credential-free loopback URL')
  }

  if (
    productionURL.origin !== EXPECTED_PRODUCTION_ORIGIN ||
    productionURL.protocol !== 'https:'
  ) {
    throw new Error('Unexpected Payload production origin')
  }

  if (applyChanges) {
    if (
      process.env.NODE_ENV !== 'production' ||
      process.env.DEPLOYMENT_TARGET !== 'cloudflare-workers' ||
      process.env.PAYLOAD_USE_WRANGLER_REMOTE !== 'true'
    ) {
      throw new Error('Production sync requires the remote Cloudflare D1/R2 adapter')
    }

    if (!backupPath || !fs.existsSync(backupPath)) {
      throw new Error('A verified production D1 backup path is required')
    }
  }
}

const fetchHomepage = async () => {
  const endpoint = new URL('/api/globals/homepage?depth=2', sourceURL)
  const response = await fetch(endpoint, {
    cache: 'no-store',
    headers: {
      accept: 'application/json',
      'cache-control': 'no-cache',
    },
  })

  if (!response.ok) {
    throw new Error(`Local Homepage export failed with HTTP ${response.status}`)
  }

  const homepage = (await response.json()) as SourceHomepage

  if (!homepage.id || !homepage.heroTitle?.trim()) {
    throw new Error('Local Homepage export is missing canonical content')
  }

  return homepage
}

const collectReferencedMedia = (homepage: SourceHomepage) => {
  const mediaByID = new Map<number | string, SourceMedia>()
  const add = (value: unknown) => {
    if (isSourceMedia(value)) {
      mediaByID.set(value.id, value)
    }
  }

  add(homepage.heroImage)
  homepage.promotionBanners?.forEach((banner) => {
    add(banner.image)
    banner.images?.forEach((row) => add(row.image))
  })
  homepage.homepageVideos?.forEach((video) => add(video.thumbnail))
  homepage.customerReviews?.forEach((review) => add(review.avatar))

  return mediaByID
}

const main = async () => {
  validateExecution()
  const homepage = await fetchHomepage()
  const referencedMedia = collectReferencedMedia(homepage)

  if (!applyChanges) {
    console.log(
      JSON.stringify({
        mode: 'dry-run',
        sourceHomepageID: homepage.id,
        heroTitle: homepage.heroTitle,
        promotionBanners: homepage.promotionBanners?.length ?? 0,
        referencedMedia: [...referencedMedia.values()].map(
          ({ filename }) => filename,
        ),
      }),
    )
    return
  }

  const { default: config } = await import('../payload.config')
  const payload = await getPayload({ config })
  const productionMediaIDs = new Map<number | string, number>()
  let createdMedia = 0
  let reusedMedia = 0

  try {
    for (const sourceMedia of referencedMedia.values()) {
      const filename = sourceMedia.filename?.trim()

      if (!filename || path.basename(filename) !== filename) {
        throw new Error('Referenced media has an invalid filename')
      }

      const filePath = path.resolve(projectDir, 'public', 'payload-media', filename)
      const expectedMediaRoot = path.resolve(projectDir, 'public', 'payload-media')

      if (
        !filePath.startsWith(`${expectedMediaRoot}${path.sep}`) ||
        !fs.existsSync(filePath)
      ) {
        throw new Error(`Referenced media file is missing: ${filename}`)
      }

      const localFile = fs.statSync(filePath)

      if (
        sourceMedia.filesize &&
        Number(sourceMedia.filesize) !== localFile.size
      ) {
        throw new Error(`Referenced media file size changed: ${filename}`)
      }

      const existing = await payload.find({
        collection: 'media',
        depth: 0,
        limit: 1,
        overrideAccess: true,
        where: {
          filename: {
            equals: filename,
          },
        },
      })
      const existingMedia = existing.docs[0]

      if (existingMedia) {
        if (typeof existingMedia.id !== 'number') {
          throw new Error('Production D1 returned a non-numeric media ID')
        }

        productionMediaIDs.set(sourceMedia.id, existingMedia.id)
        reusedMedia += 1
        continue
      }

      const created = await payload.create({
        collection: 'media',
        data: {
          alt: sourceMedia.alt ?? '',
        },
        depth: 0,
        filePath,
        overrideAccess: true,
      })

      if (typeof created.id !== 'number') {
        throw new Error('Production D1 created a non-numeric media ID')
      }

      productionMediaIDs.set(sourceMedia.id, created.id)
      createdMedia += 1
    }

    const relationID = (
      value: SourceMedia | number | string | null | undefined,
    ) => {
      if (!isSourceMedia(value)) {
        return null
      }

      const mapped = productionMediaIDs.get(value.id)

      if (!mapped) {
        throw new Error('A referenced media relationship was not migrated')
      }

      return mapped
    }

    const homepageData = {
      heroTitle: homepage.heroTitle?.trim() ?? '',
      heroSubtitle: homepage.heroSubtitle ?? '',
      heroImage: relationID(homepage.heroImage),
      heroButtonLabel: homepage.heroButtonLabel ?? '',
      heroButtonHref: homepage.heroButtonHref ?? '',
      bestSellerTitle: homepage.bestSellerTitle ?? '',
      bestSellerMedusaProductHandles:
        homepage.bestSellerMedusaProductHandles
          ?.map(({ handle }) => normalizeHandle(handle))
          .filter(Boolean)
          .map((handle) => ({ handle })) ?? [],
      promotionBanners:
        homepage.promotionBanners?.map((banner) => ({
          title: banner.title ?? '',
          subtitle: banner.subtitle ?? '',
          image: relationID(banner.image),
          images:
            banner.images
              ?.map(({ image }) => relationID(image))
              .filter(
                (image): image is number =>
                  image !== null && image !== undefined,
              )
              .map((image) => ({ image })) ?? [],
          href: banner.href ?? '',
          isActive: banner.isActive !== false,
        })) ?? [],
      newLaunchTitle: homepage.newLaunchTitle ?? '',
      newLaunchMedusaProductHandles:
        homepage.newLaunchMedusaProductHandles
          ?.map(({ handle }) => normalizeHandle(handle))
          .filter(Boolean)
          .map((handle) => ({ handle })) ?? [],
      sections:
        homepage.sections?.map((row) => ({
          section: requireHomepageSection(row.section),
          isEnabled: row.isEnabled !== false,
        })) ?? [],
      homepageVideos:
        homepage.homepageVideos?.map((video) => ({
          platform: requireVideoPlatform(video.platform),
          title: video.title ?? '',
          videoUrl: video.videoUrl ?? '',
          thumbnail: relationID(video.thumbnail),
          description: video.description ?? '',
          isActive: video.isActive !== false,
          displayOrder: video.displayOrder ?? 0,
        })) ?? [],
      customerReviews:
        homepage.customerReviews?.map((review) => ({
          name: review.name ?? '',
          role: review.role ?? '',
          review: review.review ?? '',
          avatar: relationID(review.avatar),
          isActive: review.isActive !== false,
          displayOrder: review.displayOrder ?? 0,
        })) ?? [],
    }

    const updated = await payload.updateGlobal({
      slug: 'homepage',
      data: homepageData,
      depth: 2,
      overrideAccess: true,
    })

    console.log(
      JSON.stringify({
        mode: 'applied',
        productionHomepageID: updated.id,
        createdMedia,
        reusedMedia,
        promotionBanners: updated.promotionBanners?.length ?? 0,
        homepageVideos: updated.homepageVideos?.length ?? 0,
        customerReviews: updated.customerReviews?.length ?? 0,
      }),
    )
  } finally {
    await Promise.race([
      payload.destroy(),
      new Promise<void>((resolve) => setTimeout(resolve, 5000)),
    ])
    await disposePayloadCloudflareProxy()
  }
}

main().catch((error: unknown) => {
  console.error(
    JSON.stringify({
      error:
        error instanceof Error
          ? error.message.replace(/https?:\/\/\S+/g, '<redacted-url>')
          : 'Homepage production sync failed',
    }),
  )
  process.exitCode = 1
})
