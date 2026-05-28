import Link from 'next/link'
import Image from 'next/image'
import { shopifyClient, GET_PRODUCTS } from '@/lib/shopify'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const products = await shopifyClient.request(GET_PRODUCTS, { first: 8 })

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Digital Products for Creators
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Notion templates, automation workflows, Canva packs, and Lightroom presets
          to boost your productivity and creativity.
        </p>
        <Link
          href="/products"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Browse All Products
        </Link>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.products.edges.map(({ node }: { node: any }) => (
            <Link
              key={node.handle}
              href={`/products/${node.handle}`}
              className="group block border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <div className="aspect-square relative bg-gray-100">
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
                <p className="text-blue-600 font-bold">
                  {node.variants.edges[0].node.price.amount} €
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-12 bg-gray-50 -mx-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Notion', 'Canva', 'Automations', 'Lightroom'].map((cat) => (
              <Link
                key={cat}
                href={`/collections/${cat.toLowerCase()}`}
                className="block bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition"
              >
                <span className="text-lg font-medium text-gray-900">{cat}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}