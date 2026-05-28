import { shopifyClient, GET_PRODUCTS, GET_COLLECTIONS } from '@/lib/shopify'
import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://novaflow.shop'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const defaultFreq = 'weekly' as const

  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: defaultFreq, priority: 1.0 },
    { url: `${BASE_URL}/products`, lastModified: new Date(), changeFrequency: defaultFreq, priority: 0.9 },
  ]
  let productPages: MetadataRoute.Sitemap = []
  let collectionPages: MetadataRoute.Sitemap = []

  try {
    const products: any = await shopifyClient.request(GET_PRODUCTS, { first: 250 })
    productPages = products.products.edges.map(({ node }: { node: { handle: string } }) => ({
      url: `${BASE_URL}/products/${node.handle}`,
      lastModified: new Date(),
      changeFrequency: defaultFreq,
      priority: 0.7,
    }))
  } catch (e) {
    console.error('Failed to fetch products for sitemap', e)
  }

  try {
    const collections: any = await shopifyClient.request(GET_COLLECTIONS)
    collectionPages = collections.collections.edges
      .filter(({ node }: { node: { handle: string } }) => node.handle !== 'frontpage')
      .map(({ node }: { node: { handle: string } }) => ({
        url: `${BASE_URL}/collections/${node.handle}`,
        lastModified: new Date(),
        changeFrequency: defaultFreq,
        priority: 0.8,
      }))
  } catch (e) {
    console.error('Failed to fetch collections for sitemap', e)
  }

  return [...staticPages, ...collectionPages, ...productPages]
}