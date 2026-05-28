import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { shopifyClient, GET_COLLECTION_PRODUCTS } from '@/lib/shopify'

export const dynamic = 'force-dynamic'

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const data: any = await shopifyClient.request(GET_COLLECTION_PRODUCTS, {
    handle,
    first: 50,
  })

  if (!data.collection) {
    notFound()
  }

  const { collection } = data
  const products = collection.products.edges

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/products"
        className="text-sm text-blue-600 hover:text-blue-700 mb-4 inline-block"
      >
        &larr; All Products
      </Link>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">{collection.title}</h1>

      {collection.description && (
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">{collection.description}</p>
      )}

      {products.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">No products found in this collection.</p>
          <Link
            href="/products"
            className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Browse all products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(({ node }: { node: any }) => (
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
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{node.description}</p>
                <p className="text-blue-600 font-bold">
                  From {node.variants.edges[0].node.price.amount} €
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}