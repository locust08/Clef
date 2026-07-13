import { config as loadEnv } from 'dotenv'
import { getPayload } from 'payload'

loadEnv({ path: '.env.local' })
loadEnv()

const homepageSections = [
  { section: 'hero' as const, isEnabled: true },
  { section: 'categories' as const, isEnabled: true },
  { section: 'best-sellers' as const, isEnabled: true },
  { section: 'new-launch' as const, isEnabled: true },
  { section: 'social' as const, isEnabled: true },
  { section: 'testimonials' as const, isEnabled: true },
]

const categorySections = [
  { section: 'navigation' as const, isEnabled: true },
  { section: 'hero' as const, isEnabled: true },
  { section: 'benefits' as const, isEnabled: true },
  { section: 'products' as const, isEnabled: true },
  { section: 'video' as const, isEnabled: true },
  { section: 'editorial' as const, isEnabled: true },
  { section: 'footer' as const, isEnabled: true },
]

const main = async () => {
  const { default: config } = await import('../payload.config')
  const payload = await getPayload({ config })
  const homepage = await payload.findGlobal({ slug: 'homepage', depth: 0 })

  if (!homepage.sections?.length) {
    await payload.updateGlobal({
      slug: 'homepage',
      data: { sections: homepageSections },
    })
    console.log('Added the default Homepage section layout.')
  }

  const categoryPages = await payload.find({
    collection: 'category-pages',
    depth: 0,
    limit: 100,
  })

  for (const page of categoryPages.docs) {
    if (!page.sections?.length) {
      await payload.update({
        collection: 'category-pages',
        id: page.id,
        data: { sections: categorySections },
      })
    }
  }

  console.log(`Checked ${categoryPages.docs.length} Category Page layouts.`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
