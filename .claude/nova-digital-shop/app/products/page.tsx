import Link from 'next/link'
import Image from 'next/image'
import { shopifyClient, GET_PRODUCTS, GET_COLLECTIONS } from '@/lib/shopify'

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const products = await shopifyClient.request(GET_PRODUCTS, { first: 50 })
  const collections = await shopifyClient.request(GET_COLLECTIONS)

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">All Products</h1>

      {/* Filter by Collection */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-700 mr-4 self-center">
            Filter:
          </span>
          {collections.collections.edges.map(({ node }: { node: any }) => (
            <Link
              key={node.handle}
              href={`/collections/${node.handle}`}
              className="px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              {node.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.products.edges.map(({ node }: { node: any }) => (
          <Link
            key={node.handle}
            href={`/products/${node.handle}`}
            className="group block border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <div className="aspect-video relative bg-gray-100">
              {node.images.edges[0] && (
                <Image
                  src={node.images.edges[0].node.url}
                  alt={node.images.edges[0].node.altText || node.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{node.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {node.description}
              </p>
              <p className="text-blue-600 font-bold">
                From {node.variants.edges[0].node.price.amount} €
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}