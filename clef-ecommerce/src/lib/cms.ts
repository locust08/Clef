export type CmsImage = {
  src: string
  alt: string
  width?: number
  height?: number
}

export type HomepagePromotionBanner = {
  title: string
  subtitle: string
  images: CmsImage[]
  href: string
  isActive: boolean
}

export type HomepageSectionKey =
  | 'hero'
  | 'categories'
  | 'best-sellers'
  | 'new-launch'
  | 'social'
  | 'testimonials'

export type HomepageSection = {
  section: HomepageSectionKey
  isEnabled: boolean
}

export type CustomerReviewContent = {
  name: string
  role: string
  review: string
  avatar: CmsImage | null
  isActive: boolean
  displayOrder: number
}

export type HomepageContent = {
  heroTitle: string
  heroSubtitle: string
  heroImage: CmsImage | null
  heroButtonLabel: string
  heroButtonHref: string
  bestSellerTitle: string
  bestSellerMedusaProductHandles: string[]
  promotionBanners: HomepagePromotionBanner[]
  newLaunchTitle: string
  newLaunchMedusaProductHandles: string[]
  homepageVideos: VideoCardContent[]
  customerReviews: CustomerReviewContent[]
  sections: HomepageSection[]
}

export type VideoPlatform = 'tiktok' | 'instagram' | 'facebook'

export type VideoCardContent = {
  platform: VideoPlatform
  platformLabel: string
  title: string
  videoUrl: string
  thumbnail: CmsImage | null
  description: string
  isActive: boolean
  displayOrder: number
}

export type VideoSectionContent = {
  sectionTitle: string
  videos: VideoCardContent[]
}

export type FooterContent = {
  logo: CmsImage | null
  description: string
  socialLinks: {
    platform: string
    url: string
    label: string
  }[]
  quickLinks: {
    label: string
    href: string
  }[]
  copyrightText: string
}

export type CategoryPageContent = {
  title: string
  slug: string
  parentCategory: 'skincare' | 'personal-care' | 'fragrance'
  headerTitle: string
  headerSubtitle: string
  headerImage: CmsImage | null
  topMedusaProductHandles: string[]
  videoTitle: string
  videoUrl: string
  videoThumbnail: CmsImage | null
  isActive: boolean
  sections: CategoryPageSection[]
}

export type AllProductsCategoryCard = {
  title: string
  image: CmsImage
  href: string
  badgeLabel: string
}

export type AllProductsHeroContent = {
  title: string
  image: CmsImage
  ctaLabel: string
}

export type AllProductsFragranceBanner = {
  eyebrow: string
  title: string
  description: string
  videoUrl: string
}

export type AllProductsPageContent = {
  title: string
  hero: AllProductsHeroContent
  categoryCards: AllProductsCategoryCard[]
  fragranceBanner: AllProductsFragranceBanner | null
}

export type CategoryPageSectionKey =
  | 'navigation'
  | 'hero'
  | 'benefits'
  | 'products'
  | 'video'
  | 'editorial'
  | 'footer'

export type CategoryPageSection = {
  section: CategoryPageSectionKey
  isEnabled: boolean
}

export type ClefEditArticleQuestion = {
  question: string
  answer: string
}

export type ClefEditArticleProductSuggestion = {
  productHandle: string
  name: string
  price: string
  description: string
  image: CmsImage | null
}

export type ClefEditArticle = {
  title: string
  slug: string
  href: string
  authorName: string
  authorRole: string
  authorImage: CmsImage | null
  publishedDate: string
  categoryLabel: string
  readTime: string
  heroImage: CmsImage | null
  description: string
  questions: ClefEditArticleQuestion[]
  productSuggestions: ClefEditArticleProductSuggestion[]
  displayOrder: number
  isActive: boolean
}

type CmsMedia = {
  url?: string | null
  alt?: string | null
  width?: number | null
  height?: number | null
}

type CmsHomepage = {
  id?: number | string | null
  updatedAt?: string | null
  _status?: string | null
  heroTitle?: string | null
  heroSubtitle?: string | null
  heroImage?: CmsMedia | number | null
  heroButtonLabel?: string | null
  heroButtonHref?: string | null
  bestSellerTitle?: string | null
  bestSellerMedusaProductHandles?: { handle?: string | null }[] | null
  promotionBanners?:
    | {
        title?: string | null
        subtitle?: string | null
        images?:
          | {
              image?: CmsMedia | number | null
            }[]
          | null
        image?: CmsMedia | number | null
        href?: string | null
        isActive?: boolean | null
      }[]
    | null
  newLaunchTitle?: string | null
  newLaunchMedusaProductHandles?: { handle?: string | null }[] | null
  homepageVideos?: CmsVideoRow[] | null
  customerReviews?: CmsCustomerReviewRow[] | null
  sections?:
    | {
        section?: HomepageSectionKey | null
        isEnabled?: boolean | null
      }[]
    | null
}

type CmsFooter = {
  logo?: CmsMedia | number | null
  description?: string | null
  socialLinks?:
    | {
        platform?: string | null
        url?: string | null
        label?: string | null
      }[]
    | null
  quickLinks?:
    | {
        label?: string | null
        href?: string | null
      }[]
    | null
  copyrightText?: string | null
}

type CmsCategoryPage = {
  title?: string | null
  slug?: string | null
  parentCategory?: 'skincare' | 'personal-care' | 'fragrance' | null
  headerTitle?: string | null
  headerSubtitle?: string | null
  headerImage?: CmsMedia | number | null
  topMedusaProductHandles?: { handle?: string | null }[] | null
  videoTitle?: string | null
  videoUrl?: string | null
  videoThumbnail?: CmsMedia | number | null
  sections?:
    | {
        section?: CategoryPageSectionKey | null
        isEnabled?: boolean | null
      }[]
    | null
  isActive?: boolean | null
}

type CmsAllProductsCategoryCard = {
  title?: string | null
  image?: CmsMedia | number | null
  href?: string | null
  badgeLabel?: string | null
}

type CmsAllProductsCategory = {
  heroTitle?: string | null
  heroImage?: CmsMedia | number | null
  heroCtaLabel?: string | null
  categoryCards?: CmsAllProductsCategoryCard[] | null
  bannerEyebrow?: string | null
  bannerTitle?: string | null
  bannerDescription?: string | null
  bannerVideoUrl?: string | null
}

type CmsAllProductsPages = {
  skincare?: CmsAllProductsCategory | null
  personalCare?: CmsAllProductsCategory | null
  fragrance?: CmsAllProductsCategory | null
}

type CmsClefEditArticle = {
  title?: string | null
  slug?: string | null
  authorName?: string | null
  authorRole?: string | null
  authorImage?: CmsMedia | number | null
  publishedDate?: string | null
  categoryLabel?: string | null
  readTime?: string | null
  heroImage?: CmsMedia | number | null
  description?: string | null
  questions?:
    | {
        question?: string | null
        answer?: string | null
      }[]
    | null
  productSuggestions?:
    | {
        productHandle?: string | null
        name?: string | null
        price?: string | null
        description?: string | null
        image?: CmsMedia | number | null
      }[]
    | null
  displayOrder?: number | null
  isActive?: boolean | null
}

type CmsVideoRow = {
  platform?: string | null
  title?: string | null
  videoUrl?: string | null
  thumbnail?: CmsMedia | number | null
  description?: string | null
  isActive?: boolean | null
  displayOrder?: number | null
}

type CmsVideoSection = {
  sectionTitle?: string | null
  videos?: CmsVideoRow[] | null
}

type CmsCustomerReviewRow = {
  name?: string | null
  role?: string | null
  review?: string | null
  avatar?: CmsMedia | number | null
  isActive?: boolean | null
  displayOrder?: number | null
}

type CmsFindResponse<T> = {
  docs?: T[]
}

export const DEFAULT_HOMEPAGE_CONTENT: HomepageContent = {
  heroTitle: 'Take care of your skin every day.',
  heroSubtitle: 'Choose from thousands of skincare products.',
  heroImage: {
    src: '/coleos-assets/headers/home-hero-clef-model.png',
    alt: 'CLEF skincare model with products',
    width: 700,
    height: 700,
  },
  heroButtonLabel: 'Start Buying',
  heroButtonHref: '/shop/skincare',
  bestSellerTitle: 'Best Seller',
  bestSellerMedusaProductHandles: [],
  promotionBanners: [
    {
      title: 'Skincare',
      subtitle: '',
      images: [
        {
          src: '/coleos-assets/banners/homepage-category-skincare.png',
          alt: 'Skincare',
          width: 632,
          height: 316,
        },
      ],
      href: '/all-skincare',
      isActive: true,
    },
    {
      title: 'Personal Care',
      subtitle: '',
      images: [
        {
          src: '/coleos-assets/banners/homepage-category-personal-care.png',
          alt: 'Personal Care',
          width: 632,
          height: 316,
        },
      ],
      href: '/all-personal-care',
      isActive: true,
    },
    {
      title: 'Fragrance',
      subtitle: '',
      images: [
        {
          src: '/coleos-assets/banners/homepage-category-fragrance.png',
          alt: 'Fragrance',
          width: 632,
          height: 316,
        },
      ],
      href: '/fragrance',
      isActive: true,
    },
  ],
  newLaunchTitle: 'New Launch',
  newLaunchMedusaProductHandles: [],
  homepageVideos: [
    {
      platform: 'tiktok',
      platformLabel: 'TikTok',
      title: 'CLEF on TikTok',
      videoUrl: '#',
      thumbnail: null,
      description: 'Manually curated TikTok video from CMS.',
      isActive: true,
      displayOrder: 1,
    },
    {
      platform: 'instagram',
      platformLabel: 'Instagram',
      title: 'CLEF on Instagram',
      videoUrl: '#',
      thumbnail: null,
      description: 'Manually curated Instagram video from CMS.',
      isActive: true,
      displayOrder: 2,
    },
    {
      platform: 'facebook',
      platformLabel: 'Facebook',
      title: 'CLEF on Facebook',
      videoUrl: '#',
      thumbnail: null,
      description: 'Manually curated Facebook video from CMS.',
      isActive: true,
      displayOrder: 3,
    },
  ],
  customerReviews: [
    {
      name: 'Danny Bailey',
      role: 'CEO & Founder',
      review:
        'CLEF makes my daily skincare routine feel simple and consistent. The products feel gentle, lightweight, and easy to use every morning.',
      avatar: {
        src: '/coleos-assets/testimonials/avatar1.png',
        alt: 'Danny Bailey',
        width: 64,
        height: 64,
      },
      isActive: true,
      displayOrder: 1,
    },
    {
      name: 'Aina Rahman',
      role: 'CLEF Customer',
      review:
        'I love how the routine fits Malaysian weather. My skin feels fresh through the day without adding too many extra steps.',
      avatar: {
        src: '/coleos-assets/testimonials/avatar1.png',
        alt: 'Aina Rahman',
        width: 64,
        height: 64,
      },
      isActive: true,
      displayOrder: 2,
    },
  ],
  sections: [
    { section: 'hero', isEnabled: true },
    { section: 'categories', isEnabled: true },
    { section: 'best-sellers', isEnabled: true },
    { section: 'new-launch', isEnabled: true },
    { section: 'social', isEnabled: true },
    { section: 'testimonials', isEnabled: true },
  ],
}

const DEFAULT_VIDEO_SECTION_CONTENT: VideoSectionContent = {
  sectionTitle: 'CLEF on Social',
  videos: [],
}

const DEFAULT_FOOTER_CONTENT: FooterContent = {
  logo: {
    src: 'https://static.shuffle.dev/uploads/files/6f/6fb48a03fbf8bf9e36f18c917c673f67c9eac42d/CLEF-LOGO-FINAL-90be4a24-9d08-4222-ab18-073e39e89319-100x.avif',
    alt: 'CLEF',
    width: 100,
    height: 54,
  },
  description:
    'Sign Up to our newsletter and receive 10% off your first order!',
  socialLinks: [
    { platform: 'tiktok', url: '#', label: 'TikTok' },
    { platform: 'instagram', url: '#', label: 'Instagram' },
    { platform: 'facebook', url: '#', label: 'Facebook' },
  ],
  quickLinks: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms & Conditions', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  copyrightText: 'Copyright 2026. All Rights reserved by CLEF.',
}

const DEFAULT_CATEGORY_CONTENT: Record<string, CategoryPageContent> = {
  skincare: {
    title: 'Skincare',
    slug: 'skincare',
    parentCategory: 'skincare',
    headerTitle: 'Take care of your performance every day.',
    headerSubtitle: '',
    headerImage: {
      src: 'https://static.shuffle.dev/uploads/files/6f/6fb48a03fbf8bf9e36f18c917c673f67c9eac42d/5cb097d9-0f1d-4b51-9ad3-3cfab9fcfeec.png',
      alt: 'Skincare',
      width: 1600,
      height: 700,
    },
    topMedusaProductHandles: [],
    videoTitle: '',
    videoUrl: '',
    videoThumbnail: null,
    isActive: true,
    sections: [
      { section: 'navigation', isEnabled: true },
      { section: 'hero', isEnabled: true },
      { section: 'benefits', isEnabled: true },
      { section: 'products', isEnabled: true },
      { section: 'video', isEnabled: true },
      { section: 'editorial', isEnabled: true },
      { section: 'footer', isEnabled: true },
    ],
  },
  'personal-care': {
    title: 'Personal Care',
    slug: 'personal-care',
    parentCategory: 'personal-care',
    headerTitle: 'CLEF Personal Care Malaysia - Everyday Care That Feels Effortless',
    headerSubtitle:
      'Personal Care Malaysia essentials from CLEF bring body, hand, hair, and sun care into one simple daily routine.',
    headerImage: {
      src: '/coleos-assets/headers/personal-care-hero.png',
      alt: 'Personal Care',
      width: 1600,
      height: 700,
    },
    topMedusaProductHandles: [],
    videoTitle: '',
    videoUrl: '',
    videoThumbnail: null,
    isActive: true,
    sections: [
      { section: 'navigation', isEnabled: true },
      { section: 'hero', isEnabled: true },
      { section: 'benefits', isEnabled: true },
      { section: 'products', isEnabled: true },
      { section: 'video', isEnabled: true },
      { section: 'editorial', isEnabled: true },
      { section: 'footer', isEnabled: true },
    ],
  },
  fragrance: {
    title: 'Fragrance',
    slug: 'fragrance',
    parentCategory: 'fragrance',
    headerTitle: 'Take care of your performance every day.',
    headerSubtitle: '',
    headerImage: {
      src: '/coleos-assets/headers/fragrance-rose-echoes-hero.png',
      alt: 'Fragrance',
      width: 1600,
      height: 700,
    },
    topMedusaProductHandles: [],
    videoTitle: '',
    videoUrl: '',
    videoThumbnail: null,
    isActive: true,
    sections: [
      { section: 'navigation', isEnabled: true },
      { section: 'hero', isEnabled: true },
      { section: 'benefits', isEnabled: true },
      { section: 'products', isEnabled: true },
      { section: 'video', isEnabled: true },
      { section: 'editorial', isEnabled: true },
      { section: 'footer', isEnabled: true },
    ],
  },
}

export const DEFAULT_ALL_PRODUCTS_PAGE_CONTENT: Record<
  'skincare' | 'personal-care' | 'fragrance',
  AllProductsPageContent
> = {
  skincare: {
    title: 'Skincare',
    hero: {
      title: 'Take Care Of Your Performance Every Day.',
      image: {
        src: 'https://static.shuffle.dev/uploads/files/6f/6fb48a03fbf8bf9e36f18c917c673f67c9eac42d/5cb097d9-0f1d-4b51-9ad3-3cfab9fcfeec.png',
        alt: 'Skincare',
      },
      ctaLabel: 'Start Buying',
    },
    categoryCards: [
      {
        title: 'Anti Aging',
        image: { src: '/coleos-assets/banners/image7.png', alt: 'Anti Aging' },
        href: '/shop/skincare/anti-aging',
        badgeLabel: '',
      },
      {
        title: 'Ocean Elixir',
        image: { src: '/coleos-assets/banners/image6-small.png', alt: 'Ocean Elixir' },
        href: '/shop/skincare/ocean-elixir',
        badgeLabel: '',
      },
      {
        title: 'Sheet Mask',
        image: { src: '/coleos-assets/banners/image5-large.png', alt: 'Sheet Mask' },
        href: '/shop/skincare/sheet-mask',
        badgeLabel: '',
      },
      {
        title: 'Facial Mask',
        image: { src: '/coleos-assets/banners/image4-large.png', alt: 'Facial Mask' },
        href: '/shop/skincare/facial-mask',
        badgeLabel: '',
      },
    ],
    fragranceBanner: null,
  },
  'personal-care': {
    title: 'Personal Care',
    hero: {
      title: 'Take Care Of Your Performance Every Day.',
      image: {
        src: '/coleos-assets/headers/personal-care-hero.png',
        alt: 'Personal Care',
      },
      ctaLabel: 'Start Buying',
    },
    categoryCards: [
      {
        title: 'Deodorant',
        image: { src: '/coleos-assets/banners/image7.png', alt: 'Deodorant' },
        href: '/shop/personal-care/deodorant',
        badgeLabel: 'NEW LAUNCH',
      },
      {
        title: 'Sunscreen',
        image: { src: '/coleos-assets/banners/image6-small.png', alt: 'Sunscreen' },
        href: '/shop/personal-care/sunscreen',
        badgeLabel: '',
      },
      {
        title: 'Bath Gel',
        image: { src: '/coleos-assets/banners/image5-large.png', alt: 'Bath Gel' },
        href: '/shop/personal-care/bath-gel',
        badgeLabel: '',
      },
      {
        title: 'Lotion',
        image: { src: '/coleos-assets/banners/image4-large.png', alt: 'Lotion' },
        href: '/shop/personal-care/lotion',
        badgeLabel: '',
      },
    ],
    fragranceBanner: null,
  },
  fragrance: {
    title: 'Fragrance',
    hero: {
      title: 'Take Care Of Your Performance Every Day.',
      image: {
        src: '/coleos-assets/headers/fragrance-rose-echoes-hero.png',
        alt: 'Fragrance',
      },
      ctaLabel: 'Start Buying',
    },
    categoryCards: [],
    fragranceBanner: {
      eyebrow: 'Watch Now!',
      title: 'Live a little and your life will come alive',
      description:
        'CLEF Fragrance is a collection of fine fragrances that awaken your sense of ritual.',
      videoUrl: 'https://www.youtube.com/embed/_9VUPq3SxOc',
    },
  },
}

const DEFAULT_CLEF_EDIT_HERO_IMAGE: CmsImage = {
  src: 'https://static.shuffle.dev/uploads/files/6f/6fb48a03fbf8bf9e36f18c917c673f67c9eac42d/pexels-rdne-4911181-1-09e74c56-aaec-46c1-a984-83a9632240d0.webp',
  alt: 'Woman applying skincare while wearing a pink hijab',
  width: 900,
  height: 560,
}

const DEFAULT_CLEF_EDIT_PRODUCTS: ClefEditArticleProductSuggestion[] = [
  {
    productHandle: 'clef-ocean-elixir-hydrating-cleanser',
    name: 'Gentle Hydrating Cleanser',
    price: 'RM 45.00',
    description:
      'A fragrance-free cleanser formulated to support the skin barrier without leaving skin tight or stripped.',
    image: {
      src: 'https://static.shuffle.dev/uploads/files/6f/6fb48a03fbf8bf9e36f18c917c673f67c9eac42d/Clef-08.webp',
      alt: 'Gentle Hydrating Cleanser',
    },
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

export const DEFAULT_CLEF_EDIT_ARTICLES: ClefEditArticle[] = [
  {
    title: 'How to Care for Sensitive, Acne-Prone Skin Under the Hijab',
    slug: 'how-to-care-for-sensitive-acne-prone-skin-under-the-hijab',
    href: '/clef-edit/how-to-care-for-sensitive-acne-prone-skin-under-the-hijab',
    authorName: 'Macky Clyde',
    authorRole: 'Skincare Writer',
    authorImage: null,
    publishedDate: 'March 13, 2026',
    categoryLabel: 'Skincare',
    readTime: '8 min read',
    heroImage: DEFAULT_CLEF_EDIT_HERO_IMAGE,
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
    productSuggestions: DEFAULT_CLEF_EDIT_PRODUCTS,
    displayOrder: 1,
    isActive: true,
  },
  {
    title: 'Dehydrated vs Dry Skin: How to Tell the Difference',
    slug: 'dehydrated-vs-dry-skin-how-to-tell-the-difference',
    href: '/clef-edit/dehydrated-vs-dry-skin-how-to-tell-the-difference',
    authorName: 'Macky Clyde',
    authorRole: 'Skincare Writer',
    authorImage: null,
    publishedDate: 'March 13, 2026',
    categoryLabel: 'Skincare',
    readTime: '6 min read',
    heroImage: DEFAULT_CLEF_EDIT_HERO_IMAGE,
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
    productSuggestions: DEFAULT_CLEF_EDIT_PRODUCTS,
    displayOrder: 2,
    isActive: true,
  },
  {
    title: 'Fragrance-Free vs Essential Oils: What Malaysian Skincare Users Need to Know',
    slug: 'fragrance-free-vs-essential-oils-what-malaysian-skincare-users-need-to-know',
    href: '/clef-edit/fragrance-free-vs-essential-oils-what-malaysian-skincare-users-need-to-know',
    authorName: 'Sarah Lim',
    authorRole: 'Skincare Specialist',
    authorImage: null,
    publishedDate: 'June 12, 2024',
    categoryLabel: 'Skincare',
    readTime: '8 min read',
    heroImage: DEFAULT_CLEF_EDIT_HERO_IMAGE,
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
    productSuggestions: DEFAULT_CLEF_EDIT_PRODUCTS,
    displayOrder: 3,
    isActive: true,
  },
]

const platformLabels: Record<VideoPlatform, string> = {
  tiktok: 'TikTok',
  instagram: 'Instagram',
  facebook: 'Facebook',
}

const homepageVideoPlatforms: VideoPlatform[] = [
  'tiktok',
  'instagram',
  'facebook',
]

const loopbackHostnames = new Set(['localhost', '127.0.0.1', '::1'])

const withDraftQuery = (path: string) => {
  const url = new URL(path, 'https://payload.invalid')
  url.searchParams.set('draft', 'true')
  return `${url.pathname}${url.search}`
}

export const getCmsBaseUrl = () => {
  const configuredUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL?.trim()

  if (configuredUrl) {
    const url = new URL(configuredUrl)

    if (
      url.username ||
      url.password ||
      !['', '/'].includes(url.pathname) ||
      (process.env.NODE_ENV === 'production' &&
        (url.protocol !== 'https:' || loopbackHostnames.has(url.hostname)))
    ) {
      throw new Error(
        'NEXT_PUBLIC_PAYLOAD_URL must be a credential-free production HTTPS origin.',
      )
    }

    return url.origin
  }

  if (process.env.NODE_ENV !== 'production') {
    return 'http://localhost:3001'
  }

  throw new Error('NEXT_PUBLIC_PAYLOAD_URL is required in production.')
}

export const getCmsUrl = (path = '') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  return new URL(normalizedPath, `${getCmsBaseUrl()}/`).toString()
}

const cmsFetch = async <T>(path: string, preview = false) => {
  const response = await fetch(getCmsUrl(preview ? withDraftQuery(path) : path), {
    cache: 'no-store',
    headers: {
      accept: 'application/json',
      'cache-control': 'no-cache',
      ...(preview
        ? { 'x-payload-preview-secret': process.env.PREVIEW_SECRET || '' }
        : {}),
    },
  })

  if (!response.ok) {
    throw new Error(`CMS API request failed: ${path}`)
  }

  return response.json() as Promise<T>
}

const isMedia = (value: unknown): value is CmsMedia =>
  Boolean(value && typeof value === 'object' && 'url' in value)

const toCmsImage = (
  value: CmsMedia | number | null | undefined,
  fallbackAlt = '',
): CmsImage | null => {
  if (!isMedia(value) || !value.url) {
    return null
  }

  const src = value.url.startsWith('/')
    ? getCmsUrl(value.url)
    : value.url
  let mediaURL: URL

  try {
    mediaURL = new URL(src)
  } catch {
    return null
  }

  if (
    process.env.NODE_ENV === 'production' &&
    (mediaURL.protocol !== 'https:' || loopbackHostnames.has(mediaURL.hostname))
  ) {
    return null
  }

  return {
    src: mediaURL.toString(),
    alt: value.alt ?? fallbackAlt,
    width: value.width ?? undefined,
    height: value.height ?? undefined,
  }
}

const textOrFallback = (
  value: string | null | undefined,
  fallback: string,
) => {
  const trimmed = value?.trim()

  return trimmed ? trimmed : fallback
}

const rowsToHandles = (
  rows: { handle?: string | null }[] | null | undefined,
  limit?: number,
) => {
  const handles =
    rows
      ?.map((row) =>
        row.handle
          ?.trim()
          .replace(/^https?:\/\/[^/]+\//, '')
          .replace(/^(?:product|products)\//, '')
          .replace(/^\/+/, ''),
      )
      .filter((handle): handle is string => Boolean(handle)) ?? []

  return typeof limit === 'number' ? handles.slice(0, limit) : handles
}

const homepageSectionKeys: HomepageSectionKey[] = [
  'hero',
  'categories',
  'best-sellers',
  'new-launch',
  'social',
  'testimonials',
]

const isHomepageSectionKey = (value: unknown): value is HomepageSectionKey =>
  homepageSectionKeys.includes(value as HomepageSectionKey)

const categoryPageSectionKeys: CategoryPageSectionKey[] = [
  'navigation',
  'hero',
  'benefits',
  'products',
  'video',
  'editorial',
  'footer',
]

const isCategoryPageSectionKey = (
  value: unknown,
): value is CategoryPageSectionKey =>
  categoryPageSectionKeys.includes(value as CategoryPageSectionKey)

const isHomepageVideoPlatform = (
  platform: string | null | undefined,
): platform is VideoPlatform =>
  homepageVideoPlatforms.includes(platform as VideoPlatform)

const rowsToHomepageVideos = (
  rows: CmsVideoRow[] | null | undefined,
) => {
  const videos = [...(rows ?? [])]
    .filter(
      (video) =>
        video.isActive !== false && isHomepageVideoPlatform(video.platform),
    )
    .sort(
      (a, b) =>
        (a.displayOrder ?? Number.MAX_SAFE_INTEGER) -
        (b.displayOrder ?? Number.MAX_SAFE_INTEGER),
    )

  const selectedVideos = new Map<VideoPlatform, VideoCardContent>()

  for (const video of videos) {
    if (!isHomepageVideoPlatform(video.platform)) {
      continue
    }

    if (selectedVideos.has(video.platform)) {
      continue
    }

    selectedVideos.set(video.platform, {
      platform: video.platform,
      platformLabel: platformLabels[video.platform],
      title: textOrFallback(video.title, platformLabels[video.platform]),
      videoUrl: textOrFallback(video.videoUrl, '#'),
      thumbnail: toCmsImage(video.thumbnail, video.title ?? ''),
      description: video.description ?? '',
      isActive: video.isActive !== false,
      displayOrder: video.displayOrder ?? 0,
    })
  }

  return homepageVideoPlatforms
    .map((platform) => selectedVideos.get(platform))
    .filter((video): video is VideoCardContent => Boolean(video))
}

const rowsToCustomerReviews = (
  rows: CmsCustomerReviewRow[] | null | undefined,
) => {
  const reviews =
    rows
      ?.filter((review) => review.isActive !== false)
      .map((review) => ({
        name: textOrFallback(review.name, 'CLEF Customer'),
        role: review.role ?? '',
        review: textOrFallback(review.review, ''),
        avatar: toCmsImage(review.avatar, review.name ?? 'CLEF Customer'),
        isActive: review.isActive !== false,
        displayOrder: review.displayOrder ?? 0,
      }))
      .filter((review) => review.review)
      .sort((a, b) => a.displayOrder - b.displayOrder) ?? []

  return reviews.length ? reviews : DEFAULT_HOMEPAGE_CONTENT.customerReviews
}

const getDefaultClefEditArticle = (slug: string) =>
  DEFAULT_CLEF_EDIT_ARTICLES.find((article) => article.slug === slug) ?? null

const rowsToArticleQuestions = (
  rows: CmsClefEditArticle['questions'],
  fallback: ClefEditArticleQuestion[],
) => {
  const questions =
    rows
      ?.map((row) => ({
        question: row.question?.trim() ?? '',
        answer: row.answer?.trim() ?? '',
      }))
      .filter((row) => row.question && row.answer) ?? []

  return questions.length ? questions : fallback
}

const rowsToArticleProducts = (
  rows: CmsClefEditArticle['productSuggestions'],
  fallback: ClefEditArticleProductSuggestion[],
) => {
  const products =
    rows
      ?.map((row) => ({
        productHandle: row.productHandle?.trim() ?? '',
        name: row.name?.trim() ?? '',
        price: row.price?.trim() ?? '',
        description: row.description?.trim() ?? '',
        image: toCmsImage(row.image, row.name ?? ''),
      }))
      .filter((row) => row.name && row.description) ?? []

  if (!products.length) {
    return fallback
  }

  return products.map((product, index) => ({
    ...product,
    productHandle: product.productHandle || fallback[index]?.productHandle || '',
  }))
}

const toClefEditArticle = (
  article: CmsClefEditArticle,
  fallback: ClefEditArticle,
): ClefEditArticle => {
  const slug = textOrFallback(article.slug, fallback.slug)

  return {
    title: textOrFallback(article.title, fallback.title),
    slug,
    href: `/clef-edit/${slug}`,
    authorName: textOrFallback(article.authorName, fallback.authorName),
    authorRole: article.authorRole ?? fallback.authorRole,
    authorImage:
      toCmsImage(article.authorImage, article.authorName ?? fallback.authorName) ??
      fallback.authorImage,
    publishedDate: textOrFallback(article.publishedDate, fallback.publishedDate),
    categoryLabel: textOrFallback(article.categoryLabel, fallback.categoryLabel),
    readTime: article.readTime ?? fallback.readTime,
    heroImage:
      toCmsImage(article.heroImage, article.title ?? fallback.title) ??
      fallback.heroImage,
    description: textOrFallback(article.description, fallback.description),
    questions: rowsToArticleQuestions(article.questions, fallback.questions),
    productSuggestions: rowsToArticleProducts(
      article.productSuggestions,
      fallback.productSuggestions,
    ),
    displayOrder: article.displayOrder ?? fallback.displayOrder,
    isActive: article.isActive !== false,
  }
}

export const getHomepageContent = async (
  preview = false,
): Promise<HomepageContent> => {
  try {
    const homepage = await cmsFetch<CmsHomepage>(
      '/api/globals/homepage?depth=1',
      preview,
    )

    if (
      homepage.id == null ||
      !homepage.heroTitle?.trim() ||
      (!preview && homepage._status != null && homepage._status !== 'published')
    ) {
      throw new Error('Payload Homepage global is missing canonical published content.')
    }

    const activeBanners =
      homepage.promotionBanners
        ?.filter((banner) => banner.isActive !== false)
        .map((banner) => {
          const title = textOrFallback(banner.title, 'CLEF')
          const images = [
            toCmsImage(banner.image, title),
            ...(banner.images?.map((row) => toCmsImage(row.image, title)) ?? []),
          ].filter((image): image is CmsImage => Boolean(image))
          const uniqueImages = images.filter(
            (image, index) =>
              images.findIndex((candidate) => candidate.src === image.src) === index,
          )

          return {
            title,
            subtitle: banner.subtitle ?? '',
            images: uniqueImages,
            href: textOrFallback(banner.href, '#'),
            isActive: banner.isActive !== false,
          }
        }) ?? []
    const sections =
      homepage.sections
        ?.filter(
          (row): row is { section: HomepageSectionKey; isEnabled?: boolean | null } =>
            isHomepageSectionKey(row.section),
        )
        .map((row) => ({
          section: row.section,
          isEnabled: row.isEnabled !== false,
        })) ?? []

    return {
      heroTitle: textOrFallback(
        homepage.heroTitle,
        DEFAULT_HOMEPAGE_CONTENT.heroTitle,
      ),
      heroSubtitle: textOrFallback(
        homepage.heroSubtitle,
        DEFAULT_HOMEPAGE_CONTENT.heroSubtitle,
      ),
      heroImage:
        toCmsImage(homepage.heroImage, homepage.heroTitle ?? 'CLEF') ??
        DEFAULT_HOMEPAGE_CONTENT.heroImage,
      heroButtonLabel: textOrFallback(
        homepage.heroButtonLabel,
        DEFAULT_HOMEPAGE_CONTENT.heroButtonLabel,
      ),
      heroButtonHref: textOrFallback(
        homepage.heroButtonHref,
        DEFAULT_HOMEPAGE_CONTENT.heroButtonHref,
      ),
      bestSellerTitle: textOrFallback(
        homepage.bestSellerTitle,
        DEFAULT_HOMEPAGE_CONTENT.bestSellerTitle,
      ),
      bestSellerMedusaProductHandles: rowsToHandles(
        homepage.bestSellerMedusaProductHandles,
        4,
      ),
      promotionBanners: activeBanners.length
        ? activeBanners
        : DEFAULT_HOMEPAGE_CONTENT.promotionBanners,
      newLaunchTitle: textOrFallback(
        homepage.newLaunchTitle,
        DEFAULT_HOMEPAGE_CONTENT.newLaunchTitle,
      ),
      newLaunchMedusaProductHandles: rowsToHandles(
        homepage.newLaunchMedusaProductHandles,
      ),
      homepageVideos: rowsToHomepageVideos(homepage.homepageVideos),
      customerReviews: rowsToCustomerReviews(homepage.customerReviews),
      sections: sections.length
        ? sections
        : DEFAULT_HOMEPAGE_CONTENT.sections,
    }
  } catch (error) {
    console.error(
      '[CMS] Homepage content unavailable; using controlled fallback.',
      error instanceof Error ? error.message : 'Unknown CMS error',
    )

    return DEFAULT_HOMEPAGE_CONTENT
  }
}

export const getVideoSectionContent =
  async (preview = false): Promise<VideoSectionContent> => {
    try {
      const videoSection = await cmsFetch<CmsVideoSection>(
        '/api/globals/video-section?depth=1',
        preview,
      )
      const videos = rowsToHomepageVideos(videoSection.videos)

      return {
        sectionTitle: textOrFallback(
          videoSection.sectionTitle,
          DEFAULT_VIDEO_SECTION_CONTENT.sectionTitle,
        ),
        videos: videos.length
          ? videos
          : DEFAULT_HOMEPAGE_CONTENT.homepageVideos,
      }
    } catch {
      const homepage = await getHomepageContent(preview)
      return {
        sectionTitle: DEFAULT_VIDEO_SECTION_CONTENT.sectionTitle,
        videos: homepage.homepageVideos.length
          ? homepage.homepageVideos
          : DEFAULT_HOMEPAGE_CONTENT.homepageVideos,
      }
    }
  }

export const getFooterContent = async (
  preview = false,
): Promise<FooterContent> => {
  try {
    const footer = await cmsFetch<CmsFooter>(
      '/api/globals/footer?depth=1',
      preview,
    )
    const socialLinks =
      footer.socialLinks
        ?.map((link) => ({
          platform: link.platform ?? 'tiktok',
          url: textOrFallback(link.url, '#'),
          label: textOrFallback(link.label, link.platform ?? 'Social'),
        }))
        .filter((link) => link.url && isHomepageVideoPlatform(link.platform)) ??
      []
    const quickLinks =
      footer.quickLinks
        ?.map((link) => ({
          label: textOrFallback(link.label, 'Link'),
          href: textOrFallback(link.href, '#'),
        }))
        .filter((link) => link.label && link.href) ?? []

    return {
      logo: toCmsImage(footer.logo, 'CLEF') ?? DEFAULT_FOOTER_CONTENT.logo,
      description: textOrFallback(
        footer.description,
        DEFAULT_FOOTER_CONTENT.description,
      ),
      socialLinks: socialLinks.length
        ? socialLinks
        : DEFAULT_FOOTER_CONTENT.socialLinks,
      quickLinks: quickLinks.length
        ? quickLinks
        : DEFAULT_FOOTER_CONTENT.quickLinks,
      copyrightText: textOrFallback(
        footer.copyrightText,
        DEFAULT_FOOTER_CONTENT.copyrightText,
      ),
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[CMS] Unable to load Footer global.', error)
    }

    return DEFAULT_FOOTER_CONTENT
  }
}

export const getAllProductsPageContent = async (
  slug: 'skincare' | 'personal-care' | 'fragrance',
  preview = false,
): Promise<AllProductsPageContent> => {
  const fallback = DEFAULT_ALL_PRODUCTS_PAGE_CONTENT[slug]

  try {
    const allProductsPages = await cmsFetch<CmsAllProductsPages>(
      '/api/globals/all-products-pages?depth=1',
      preview,
    )
    const cmsContent =
      slug === 'personal-care'
        ? allProductsPages.personalCare
        : allProductsPages[slug]

    if (!cmsContent) {
      return fallback
    }

    const categoryCards = fallback.categoryCards.map((fallbackCard, index) => {
      const cmsCard = cmsContent.categoryCards?.[index]

      return {
        title: textOrFallback(cmsCard?.title, fallbackCard.title),
        image:
          toCmsImage(cmsCard?.image, cmsCard?.title ?? fallbackCard.title) ??
          fallbackCard.image,
        href: textOrFallback(cmsCard?.href, fallbackCard.href),
        badgeLabel:
          cmsCard?.badgeLabel?.trim() ?? fallbackCard.badgeLabel,
      }
    })

    return {
      title: fallback.title,
      hero: {
        title: textOrFallback(cmsContent.heroTitle, fallback.hero.title),
        image:
          toCmsImage(cmsContent.heroImage, fallback.title) ??
          fallback.hero.image,
        ctaLabel: textOrFallback(
          cmsContent.heroCtaLabel,
          fallback.hero.ctaLabel,
        ),
      },
      categoryCards,
      fragranceBanner: fallback.fragranceBanner
        ? {
            eyebrow: textOrFallback(
              cmsContent.bannerEyebrow,
              fallback.fragranceBanner.eyebrow,
            ),
            title: textOrFallback(
              cmsContent.bannerTitle,
              fallback.fragranceBanner.title,
            ),
            description: textOrFallback(
              cmsContent.bannerDescription,
              fallback.fragranceBanner.description,
            ),
            videoUrl: textOrFallback(
              cmsContent.bannerVideoUrl,
              fallback.fragranceBanner.videoUrl,
            ),
          }
        : null,
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[CMS] Unable to load All Products Page "${slug}".`, error)
    }

    return fallback
  }
}

export const getCategoryPageContent = async (
  slug: string,
  preview = false,
): Promise<CategoryPageContent> => {
  const fallback =
    DEFAULT_CATEGORY_CONTENT[slug] ??
    ({
      ...DEFAULT_CATEGORY_CONTENT.skincare,
      slug,
      title: slug,
    } satisfies CategoryPageContent)

  const params = new URLSearchParams({
    depth: '1',
    limit: '1',
    'where[slug][equals]': slug,
    'where[isActive][not_equals]': 'false',
  })

  try {
    const result = await cmsFetch<CmsFindResponse<CmsCategoryPage>>(
      `/api/category-pages?${params.toString()}`,
      preview,
    )
    const categoryPage = result.docs?.[0]

    if (!categoryPage || categoryPage.isActive === false) {
      return fallback
    }

    const sections =
      categoryPage.sections
        ?.filter(
          (row): row is {
            section: CategoryPageSectionKey
            isEnabled?: boolean | null
          } => isCategoryPageSectionKey(row.section),
        )
        .map((row) => ({
          section: row.section,
          isEnabled: row.isEnabled !== false,
        })) ?? []

    return {
      title: textOrFallback(categoryPage.title, fallback.title),
      slug: categoryPage.slug ?? fallback.slug,
      parentCategory: categoryPage.parentCategory ?? fallback.parentCategory,
      headerTitle: textOrFallback(categoryPage.headerTitle, fallback.headerTitle),
      headerSubtitle: textOrFallback(
        categoryPage.headerSubtitle,
        fallback.headerSubtitle,
      ),
      headerImage:
        toCmsImage(categoryPage.headerImage, categoryPage.title ?? fallback.title) ??
        fallback.headerImage,
      topMedusaProductHandles: rowsToHandles(
        categoryPage.topMedusaProductHandles,
        3,
      ),
      videoTitle: categoryPage.videoTitle ?? fallback.videoTitle,
      videoUrl: categoryPage.videoUrl ?? fallback.videoUrl,
      videoThumbnail:
        toCmsImage(categoryPage.videoThumbnail, categoryPage.videoTitle ?? '') ??
        fallback.videoThumbnail,
      isActive: true,
      sections: sections.length ? sections : fallback.sections,
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[CMS] Unable to load Category Page "${slug}".`, error)
    }

    return fallback
  }
}

export const getClefEditArticles = async (
  preview = false,
): Promise<ClefEditArticle[]> => {
  const params = new URLSearchParams({
    depth: '1',
    limit: '12',
    sort: 'displayOrder',
    'where[isActive][not_equals]': 'false',
  })

  try {
    const result = await cmsFetch<CmsFindResponse<CmsClefEditArticle>>(
      `/api/clef-edit-articles?${params.toString()}`,
      preview,
    )
    const articles =
      result.docs
        ?.map((article) => {
          const slug = article.slug?.trim()
          const fallback = slug ? getDefaultClefEditArticle(slug) : null

          return toClefEditArticle(
            article,
            fallback ?? DEFAULT_CLEF_EDIT_ARTICLES[0],
          )
        })
        .filter((article) => article.isActive)
        .sort((a, b) => a.displayOrder - b.displayOrder) ?? []

    return articles.length ? articles : DEFAULT_CLEF_EDIT_ARTICLES
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[CMS] Unable to load CLEF Edit articles.', error)
    }

    return DEFAULT_CLEF_EDIT_ARTICLES
  }
}

export const getClefEditArticle = async (
  slug: string,
  preview = false,
): Promise<ClefEditArticle | null> => {
  const fallback = getDefaultClefEditArticle(slug)
  const params = new URLSearchParams({
    depth: '1',
    limit: '1',
    'where[slug][equals]': slug,
    'where[isActive][not_equals]': 'false',
  })

  try {
    const result = await cmsFetch<CmsFindResponse<CmsClefEditArticle>>(
      `/api/clef-edit-articles?${params.toString()}`,
      preview,
    )
    const article = result.docs?.[0]

    if (!article || article.isActive === false) {
      return fallback
    }

    return toClefEditArticle(
      article,
      fallback ?? DEFAULT_CLEF_EDIT_ARTICLES[0],
    )
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[CMS] Unable to load CLEF Edit article "${slug}".`, error)
    }

    return fallback
  }
}
