import path from 'node:path'
import { fileURLToPath } from 'node:url'

import nextEnv from '@next/env'
import { config as loadEnv } from 'dotenv'
import { getPayload } from 'payload'

import { ALL_PRODUCTS_PAGES_DEFAULTS } from '../src/payload/globals/AllProductsPages'

loadEnv({ path: '.env.local' })
loadEnv()

type ParentCategory = 'skincare' | 'personal-care' | 'fragrance'
type HomepageVideoPlatform = 'tiktok' | 'instagram' | 'facebook'

type CategorySeed = {
  title: string
  slug: string
  parentCategory: ParentCategory
  headerTitle: string
  headerSubtitle: string
  headerImage: null
  topMedusaProductHandles: { handle: string }[]
  isActive: true
}

type CategorySeedBase = Omit<
  CategorySeed,
  'headerImage' | 'topMedusaProductHandles' | 'isActive'
>

type HomepageVideoSeed = {
  platform: HomepageVideoPlatform
  title: string
  videoUrl: string
  thumbnail: null
  description: string
  isActive: true
  displayOrder: number
}

type CustomerReviewSeed = {
  name: string
  role: string
  review: string
  avatar: null
  isActive: true
  displayOrder: number
}

type ClefEditArticleSeed = {
  title: string
  slug: string
  authorName: string
  authorRole: string
  authorImage: null
  publishedDate: string
  categoryLabel: string
  readTime: string
  heroImage: null
  description: string
  questions: {
    question: string
    answer: string
  }[]
  productSuggestions: {
    productHandle: string
    name: string
    price: string
    description: string
    image: null
  }[]
  displayOrder: number
  isActive: true
}

const projectDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
)

nextEnv.loadEnvConfig(projectDir)

const handleRows = (handles: string[]) =>
  handles.map((handle) => ({
    handle,
  }))

const homepageVideos: HomepageVideoSeed[] = [
  {
    platform: 'tiktok',
    title: 'CLEF on TikTok',
    videoUrl: 'https://www.tiktok.com/@clef',
    thumbnail: null,
    description:
      'Manual TikTok video card. Update the video URL, thumbnail, title, and description in Payload CMS.',
    isActive: true,
    displayOrder: 1,
  },
  {
    platform: 'instagram',
    title: 'CLEF on Instagram',
    videoUrl: 'https://www.instagram.com/clef',
    thumbnail: null,
    description:
      'Manual Instagram video card. Update the video URL, thumbnail, title, and description in Payload CMS.',
    isActive: true,
    displayOrder: 2,
  },
  {
    platform: 'facebook',
    title: 'CLEF on Facebook',
    videoUrl: 'https://www.facebook.com/clef',
    thumbnail: null,
    description:
      'Manual Facebook video card. Update the video URL, thumbnail, title, and description in Payload CMS.',
    isActive: true,
    displayOrder: 3,
  },
]

const customerReviewSeeds: CustomerReviewSeed[] = [
  {
    name: 'Danny Bailey',
    role: 'CEO & Founder',
    review:
      'CLEF makes my daily skincare routine feel simple and consistent. The products feel gentle, lightweight, and easy to use every morning.',
    avatar: null,
    isActive: true,
    displayOrder: 1,
  },
  {
    name: 'Aina Rahman',
    role: 'CLEF Customer',
    review:
      'I love how the routine fits Malaysian weather. My skin feels fresh through the day without adding too many extra steps.',
    avatar: null,
    isActive: true,
    displayOrder: 2,
  },
]

const homepageSeed = {
  heroTitle: 'Take care of your skin every day.',
  heroSubtitle: 'Discover CLEF skincare and personal care essentials.',
  heroImage: null,
  heroButtonLabel: 'Shop now',
  heroButtonHref: '/shop/skincare',
  bestSellerTitle: 'Best Seller',
  bestSellerMedusaProductHandles: handleRows([
    'placeholder-best-seller-1',
    'placeholder-best-seller-2',
    'placeholder-best-seller-3',
    'placeholder-best-seller-4',
  ]),
  promotionBanners: [
    {
      title: 'Skincare Essentials',
      subtitle: 'Build a routine with CLEF skincare favorites.',
      images: [],
      image: null,
      href: '/all-skincare',
      isActive: true,
    },
    {
      title: 'Personal Care',
      subtitle: 'Everyday body care for simple daily rituals.',
      images: [],
      image: null,
      href: '/all-personal-care',
      isActive: true,
    },
  ],
  newLaunchTitle: 'New Launch',
  newLaunchMedusaProductHandles: handleRows([
    'placeholder-new-launch-1',
    'placeholder-new-launch-2',
    'placeholder-new-launch-3',
    'placeholder-new-launch-4',
  ]),
  homepageVideos,
  customerReviews: customerReviewSeeds,
}

const footerSeed = {
  description:
    'Sign up to our newsletter and receive 10% off your first order.',
  socialLinks: [
    {
      platform: 'tiktok' as const,
      url: 'https://www.tiktok.com/@clef',
      label: 'TikTok',
    },
    {
      platform: 'instagram' as const,
      url: 'https://www.instagram.com/clef',
      label: 'Instagram',
    },
    {
      platform: 'facebook' as const,
      url: 'https://www.facebook.com/clef',
      label: 'Facebook',
    },
  ],
  quickLinks: [
    {
      label: 'Privacy Policy',
      href: '/privacy-policy',
    },
    {
      label: 'Terms & Conditions',
      href: '/terms-and-conditions',
    },
    {
      label: 'Contact',
      href: '/contact',
    },
  ],
  copyrightText: 'Copyright 2026. All rights reserved by CLEF.',
}

const categorySeedBases: CategorySeedBase[] = [
  {
    title: 'Anti-Aging',
    slug: 'anti-aging',
    parentCategory: 'skincare',
    headerTitle: 'Anti-Aging',
    headerSubtitle: 'Targeted skincare essentials for a smooth daily routine.',
  },
  {
    title: 'Ocean Elixir',
    slug: 'ocean-elixir',
    parentCategory: 'skincare',
    headerTitle: 'Ocean Elixir',
    headerSubtitle: 'Hydrating skincare inspired by fresh, lightweight care.',
  },
  {
    title: 'Sheet Mask',
    slug: 'sheet-mask',
    parentCategory: 'skincare',
    headerTitle: 'Sheet Mask',
    headerSubtitle: 'Easy mask rituals for quick skincare moments.',
  },
  {
    title: 'Facial Mask',
    slug: 'facial-mask',
    parentCategory: 'skincare',
    headerTitle: 'Facial Mask',
    headerSubtitle: 'Weekly masking essentials for refreshed skin.',
  },
  {
    title: 'Sunscreen',
    slug: 'sunscreen',
    parentCategory: 'skincare',
    headerTitle: 'Sunscreen',
    headerSubtitle: 'Daily sun care for every routine.',
  },
  {
    title: 'Lotion',
    slug: 'lotion',
    parentCategory: 'personal-care',
    headerTitle: 'Lotion',
    headerSubtitle: 'Comfortable body care for everyday softness.',
  },
  {
    title: 'Bath Gel',
    slug: 'bath-gel',
    parentCategory: 'personal-care',
    headerTitle: 'Bath Gel',
    headerSubtitle: 'Fresh cleansing essentials for the shower.',
  },
  {
    title: 'Deodorant',
    slug: 'deodorant',
    parentCategory: 'personal-care',
    headerTitle: 'Deodorant',
    headerSubtitle: 'Everyday freshness from CLEF personal care.',
  },
  {
    title: 'Rose Collection',
    slug: 'rose-collection',
    parentCategory: 'fragrance',
    headerTitle: 'Rose Collection',
    headerSubtitle: 'Rose-inspired CLEF fragrance favorites.',
  },
  {
    title: 'Little Delights Collection',
    slug: 'little-delights-collection',
    parentCategory: 'fragrance',
    headerTitle: 'Little Delights Collection',
    headerSubtitle: 'Small fragrance treats for everyday moments.',
  },
]

const categorySeeds: CategorySeed[] = categorySeedBases.map((category) => ({
  ...category,
  headerImage: null,
  topMedusaProductHandles: handleRows([
    `${category.slug}-product-1`,
    `${category.slug}-product-2`,
    `${category.slug}-product-3`,
  ]),
  isActive: true,
}))

const sharedProductSuggestions = [
  {
    productHandle: 'clef-ocean-elixir-hydrating-cleanser',
    name: 'Gentle Hydrating Cleanser',
    price: 'RM 45.00',
    description:
      'A fragrance-free cleanser formulated to support the skin barrier without leaving skin tight or stripped.',
    image: null,
  },
  {
    productHandle: 'clef-ocean-elixir-hydrating-moisturiser',
    name: 'Barrier Repair Moisturizer',
    price: 'RM 68.00',
    description:
      'A lightweight moisturizer for daily comfort, especially when skin feels reactive in humid weather.',
    image: null,
  },
  {
    productHandle: 'clef-ocean-elixir-hydrating-toner',
    name: 'Soothing Calm Serum',
    price: 'RM 89.00',
    description:
      'A calming serum designed to reduce the look of redness and keep sensitive skin routines simple.',
    image: null,
  },
]

const clefEditArticleSeeds: ClefEditArticleSeed[] = [
  {
    title: 'How to Care for Sensitive, Acne-Prone Skin Under the Hijab',
    slug: 'how-to-care-for-sensitive-acne-prone-skin-under-the-hijab',
    authorName: 'Macky Clyde',
    authorRole: 'Skincare Writer',
    authorImage: null,
    publishedDate: 'March 13, 2026',
    categoryLabel: 'Skincare',
    readTime: '8 min read',
    heroImage: null,
    description:
      'Sensitive, acne-prone skin under the hijab needs a routine that respects heat, friction, sweat, and the skin barrier. The goal is not to add more steps, but to keep every step gentle, breathable, and consistent.',
    questions: [
      {
        question: 'Why can acne feel worse under the hijab?',
        answer:
          'Heat, sweat, fabric friction, and trapped skincare residue can make clogged pores and irritation more likely. A gentle cleanse and lightweight moisturizer help reduce that daily buildup.',
      },
      {
        question: 'What should the morning routine focus on?',
        answer:
          'Use a mild cleanser, a light hydrating layer, and sunscreen that does not feel heavy. Let each layer settle before wearing the hijab so product transfer is reduced.',
      },
    ],
    productSuggestions: sharedProductSuggestions,
    displayOrder: 1,
    isActive: true,
  },
  {
    title: 'Dehydrated vs Dry Skin: How to Tell the Difference',
    slug: 'dehydrated-vs-dry-skin-how-to-tell-the-difference',
    authorName: 'Macky Clyde',
    authorRole: 'Skincare Writer',
    authorImage: null,
    publishedDate: 'March 13, 2026',
    categoryLabel: 'Skincare',
    readTime: '6 min read',
    heroImage: null,
    description:
      'Dry skin usually lacks oil, while dehydrated skin lacks water. Knowing which one you are dealing with helps you choose the right cleanser, serum, and moisturizer without overloading your routine.',
    questions: [
      {
        question: 'How does dehydrated skin usually feel?',
        answer:
          'Dehydrated skin may feel tight, look dull, and show fine lines even when it still gets oily during the day. Hydrating ingredients and a barrier-friendly moisturizer are usually helpful.',
      },
      {
        question: 'How does dry skin usually feel?',
        answer:
          'Dry skin often feels rough or flaky because it naturally produces less oil. Creamier moisturizers and less stripping cleansers can make it more comfortable.',
      },
    ],
    productSuggestions: sharedProductSuggestions,
    displayOrder: 2,
    isActive: true,
  },
  {
    title: 'Fragrance-Free vs Essential Oils: What Malaysian Skincare Users Need to Know',
    slug: 'fragrance-free-vs-essential-oils-what-malaysian-skincare-users-need-to-know',
    authorName: 'Sarah Lim',
    authorRole: 'Skincare Specialist',
    authorImage: null,
    publishedDate: 'June 12, 2024',
    categoryLabel: 'Skincare',
    readTime: '8 min read',
    heroImage: null,
    description:
      'Fragrance-free formulas and essential-oil-based formulas can feel very different on sensitive skin, especially in hot and humid weather. Understanding the label helps reduce unnecessary irritation.',
    questions: [
      {
        question: 'What does fragrance-free mean on a product label?',
        answer:
          'It should mean no added perfuming agents, whether synthetic or natural. The product may still have a natural base scent from functional ingredients.',
      },
      {
        question: 'Are essential oils always gentler?',
        answer:
          'Not always. Essential oils can still act as fragrance components, and some sensitive skin types may react to them. Patch testing is useful when trying a new product.',
      },
    ],
    productSuggestions: sharedProductSuggestions,
    displayOrder: 3,
    isActive: true,
  },
]

const seedGlobals = async (payload: Awaited<ReturnType<typeof getPayload>>) => {
  await payload.updateGlobal({
    slug: 'homepage',
    data: homepageSeed,
    depth: 0,
    overrideAccess: true,
  })
  console.log('Updated Homepage global.')

  await payload.updateGlobal({
    slug: 'footer',
    data: footerSeed,
    depth: 0,
    overrideAccess: true,
  })
  console.log('Updated Footer global.')
}

const seedAllProductsPages = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
) => {
  const allProductsPages = await payload.findGlobal({
    slug: 'all-products-pages',
    depth: 0,
    overrideAccess: true,
  })

  await payload.updateGlobal({
    slug: 'all-products-pages',
    data: {
      skincare: {
        ...ALL_PRODUCTS_PAGES_DEFAULTS.skincare,
        ...allProductsPages.skincare,
        categoryCards: allProductsPages.skincare?.categoryCards?.length
          ? allProductsPages.skincare.categoryCards
          : ALL_PRODUCTS_PAGES_DEFAULTS.skincare.categoryCards,
      },
      personalCare: {
        ...ALL_PRODUCTS_PAGES_DEFAULTS.personalCare,
        ...allProductsPages.personalCare,
        categoryCards: allProductsPages.personalCare?.categoryCards?.length
          ? allProductsPages.personalCare.categoryCards
          : ALL_PRODUCTS_PAGES_DEFAULTS.personalCare.categoryCards,
      },
      fragrance: {
        ...ALL_PRODUCTS_PAGES_DEFAULTS.fragrance,
        ...allProductsPages.fragrance,
      },
    },
    depth: 0,
    overrideAccess: true,
  })
  console.log('Initialized missing All Products Pages global content.')
}

const seedCustomerReviews = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
) => {
  const homepage = await payload.findGlobal({
    slug: 'homepage',
    depth: 0,
    overrideAccess: true,
  })

  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      ...homepage,
      customerReviews: customerReviewSeeds,
    },
    depth: 0,
    overrideAccess: true,
  })

  console.log('Updated Homepage customer reviews.')
}

const upsertCategoryPages = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
) => {
  for (const category of categorySeeds) {
    const existing = await payload.find({
      collection: 'category-pages',
      depth: 0,
      limit: 1,
      overrideAccess: true,
      where: {
        slug: {
          equals: category.slug,
        },
      },
    })

    const existingCategory = existing.docs[0]

    if (existingCategory) {
      await payload.update({
        collection: 'category-pages',
        id: existingCategory.id,
        data: category,
        depth: 0,
        overrideAccess: true,
      })
      console.log(`Updated Category Page: ${category.slug}`)
      continue
    }

    await payload.create({
      collection: 'category-pages',
      data: category,
      depth: 0,
      overrideAccess: true,
    })
    console.log(`Created Category Page: ${category.slug}`)
  }
}

const upsertClefEditArticles = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
) => {
  for (const article of clefEditArticleSeeds) {
    const existing = await payload.find({
      collection: 'clef-edit-articles',
      depth: 0,
      limit: 1,
      overrideAccess: true,
      where: {
        slug: {
          equals: article.slug,
        },
      },
    })

    const existingArticle = existing.docs[0]

    if (existingArticle) {
      await payload.update({
        collection: 'clef-edit-articles',
        id: existingArticle.id,
        data: article,
        depth: 0,
        overrideAccess: true,
      })
      console.log(`Updated CLEF Edit Article: ${article.slug}`)
      continue
    }

    await payload.create({
      collection: 'clef-edit-articles',
      data: article,
      depth: 0,
      overrideAccess: true,
    })
    console.log(`Created CLEF Edit Article: ${article.slug}`)
  }
}

const destroyPayload = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
) => {
  await Promise.race([
    payload.destroy(),
    new Promise<void>((resolve) => {
      setTimeout(() => {
        console.warn('Payload shutdown timed out; exiting seed process.')
        resolve()
      }, 5000)
    }),
  ])
}

const main = async () => {
  const shouldSeedClefEditOnly = process.argv.includes('--clef-edit-only')
  const shouldSeedReviewsOnly = process.argv.includes('--reviews-only')
  const shouldSeedAllProductsOnly = process.argv.includes('--all-products-only')

  console.log('Loading Payload config...')
  const { default: config } = await import('../payload.config')
  console.log('Initializing Payload Local API...')
  const payload = await getPayload({
    config,
  })

  try {
    if (shouldSeedClefEditOnly) {
      console.log('Seeding Payload CMS CLEF Edit articles only...')
      await upsertClefEditArticles(payload)
      console.log('Payload CMS CLEF Edit article seed complete.')
      return
    }

    if (shouldSeedReviewsOnly) {
      console.log('Seeding Payload CMS homepage customer reviews only...')
      await seedCustomerReviews(payload)
      console.log('Payload CMS homepage customer review seed complete.')
      return
    }

    if (shouldSeedAllProductsOnly) {
      console.log('Initializing Payload CMS All Products Pages only...')
      await seedAllProductsPages(payload)
      console.log('Payload CMS All Products Pages initialization complete.')
      return
    }

    console.log('Seeding Payload CMS default CLEF content...')
    console.log('Homepage videos: TikTok, Instagram, Facebook only.')

    await seedGlobals(payload)
    await seedAllProductsPages(payload)
    await upsertCategoryPages(payload)
    await upsertClefEditArticles(payload)

    console.log('Payload CMS seed complete.')
  } finally {
    await destroyPayload(payload)
  }
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((error: unknown) => {
    console.error('Payload CMS seed failed.')
    console.error(error)
    process.exit(1)
  })
