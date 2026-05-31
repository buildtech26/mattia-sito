import type { Metadata } from 'next'
import Link from 'next/link'
import { shopifyClient, GET_PRODUCTS, GET_COLLECTIONS } from '@/lib/shopify'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'All Digital Products - Notion, Canva, Make & Lightroom | NovaFlow',
  description: 'Browse 10+ premium digital products: Notion templates, Canva design kits, Make automation workflows, and Lightroom presets. Find the perfect productivity tool for your workflow.',
  openGraph: {
    title: 'All Digital Products - NovaFlow',
    description: 'Premium Notion, Canva, Make, and Lightroom products for creators.',
    type: 'website',
  },
}

const CATEGORY_ICONS: Record<string, string> = {
  notion: '📓',
  canva: '🎨',
  automation: '⚡',
  lightroom: '📸',
}

export default async function ProductsPage() {
  const products = await shopifyClient.request(GET_PRODUCTS, { first: 50 })
  const collections = await shopifyClient.request(GET_COLLECTIONS)

  return (
    <>
      {/* Page Banner */}
      <section className="page-banner">
        <div className="content-wrapper">
          <h1>All Products</h1>
          <p>Browse our collection of premium digital products for creators and small businesses.</p>
        </div>
      </section>

      <section style={{ padding: '48px 0' }}>
        <div className="content-wrapper">
          {/* Filter by Collection */}
          <div className="feature-grid-header" style={{ justifyContent: 'flex-start', marginBottom: 32 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Link
                href="/products"
                className="ss-tab is-active"
                style={{ textDecoration: 'none' }}
              >
                All
              </Link>
              {collections.collections.edges.map(({ node }: { node: any }) => (
                <Link
                  key={node.handle}
                  href={`/collections/${node.handle}`}
                  className="ss-tab"
                  style={{ textDecoration: 'none' }}
                >
                  {CATEGORY_ICONS[node.handle] || '📦'} {node.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {products.products.edges.map(({ node }: { node: any }, i: number) => (
              <Link
                key={node.handle}
                href={`/products/${node.handle}`}
                className="full-card-link"
              >
                <div className="feature-block" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{
                    aspectRatio: '16/9',
                    background: 'linear-gradient(135deg, #fff8f1, #ffe8d6)',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 48,
                    marginBottom: 16,
                  }}>
                    {node.images.edges[0] ? (
                      <img
                        src={node.images.edges[0].node.url}
                        alt={node.images.edges[0].node.altText || node.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }}
                      />
                    ) : (
                      CATEGORY_ICONS[node.productType?.toLowerCase().split(' ')[0]] || '📦'
                    )}
                  </div>
                  <div className="feature-header" style={{ marginBottom: 8 }}>
                    <h3 style={{ fontSize: 16 }}>{node.title}</h3>
                  </div>
                  <p className="feature-body" style={{ flex: 1, fontSize: 13 }}>
                    {node.description?.replace(/<[^>]*>/g, '').slice(0, 120)}...
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <span style={{ fontSize: 18, fontWeight: 700, color: '#fa5d00' }}>
                      {node.variants.edges[0].node.price.amount} €
                    </span>
                    <span className="learn-more-text">View →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}