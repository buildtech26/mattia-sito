import { notFound } from 'next/navigation'
import Image from 'next/image'
import { shopifyClient, GET_PRODUCT } from '@/lib/shopify'
import AddToCartButton from '@/components/cart/AddToCartButton'

export const dynamic = 'force-dynamic'

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const product = await shopifyClient.request(GET_PRODUCT, { handle })

  if (!product.product) {
    notFound()
  }

  const { product: prod } = product

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {prod.images.edges.map(({ node }: { node: any }, i: number) => (
            <div key={i} className="aspect-video relative bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={node.url}
                alt={node.altText || prod.title}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{prod.title}</h1>
          <p className="text-3xl text-blue-600 font-bold mb-6">
            {prod.variants.edges[0].node.price.amount} €
          </p>

          <div
            className="prose mb-8"
            dangerouslySetInnerHTML={{ __html: prod.description }}
          />

          {/* What's Included */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-3">What's included:</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Instant digital download</li>
              <li>PDF guide with instructions</li>
              <li>Lifetime access</li>
            </ul>
          </div>

          {/* Add to Cart Button */}
          <div className="mb-6">
            <AddToCartButton variantId={prod.variants.edges[0].node.id} />
          </div>

          <p className="text-sm text-gray-500">
            This is a digital product. No physical item will be shipped.
          </p>
        </div>
      </div>
    </div>
  )
}