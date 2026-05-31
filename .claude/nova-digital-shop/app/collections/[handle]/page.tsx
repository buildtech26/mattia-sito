import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { shopifyClient, GET_COLLECTION_PRODUCTS } from '@/lib/shopify'

export const dynamic = 'force-dynamic'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://novaflowshops.vercel.app'

export async function generateMetadata(
  { params }: { params: Promise<{ handle: string }> }
): Promise<Metadata> {
  const { handle } = await params

  const config: Record<string, { title: string; description: string }> = {
    notion: {
      title: 'Notion Templates | Organize Your Life & Projects | NovaFlow',
      description: 'Premium Notion templates for life planning, project management, content calendars, and finance tracking. Duplicate and start organizing in minutes.',
    },
    canva: {
      title: 'Canva Templates | Social Media & Branding Designs | NovaFlow',
      description: 'Ready-to-use Canva templates for social media, branding, and marketing. Fully customizable — no design skills needed.',
    },
    automations: {
      title: 'Make Automation Workflows | No-Code Automation | NovaFlow',
      description: 'Ready-to-use Make workflows for email marketing, invoicing, and business processes. Save hours with no-code automation.',
    },
    lightroom: {
      title: 'Lightroom Presets | Professional Photo Filters | NovaFlow',
      description: 'Professional Lightroom presets for moody, travel, portrait, and landscape photography. One-click editing for stunning photos.',
    },
  }

  const meta = config[handle]
  if (!meta) {
    return { title: 'Collection - NovaFlow' }
  }

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
    },
  }
}

const CATEGORY_ICONS: Record<string, string> = {
  notion: '📓',
  canva: '🎨',
  automations: '⚡',
  lightroom: '📸',
}

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  notion: 'Premium Notion templates to organize your life, manage projects, and boost productivity.',
  canva: 'Ready-to-use Canva templates for social media, branding, and more. Fully customizable.',
  automations: 'Make automation workflows to streamline your business processes and save time.',
  lightroom: 'Professional Lightroom presets for stunning photos. One-click editing.',
}

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
  const icon = CATEGORY_ICONS[handle] || '📦'
  const desc = CATEGORY_DESCRIPTIONS[handle] || collection.description

  return (
    <>
      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
              { '@type': 'ListItem', position: 2, name: 'Products', item: `${siteUrl}/products` },
              { '@type': 'ListItem', position: 3, name: collection.title, item: `${siteUrl}/collections/${handle}` },
            ],
          }),
        }}
      />

      {/* Page Banner */}
      <section className="page-banner">
        <div className="content-wrapper">
          <p style={{ fontSize: 40, marginBottom: 8 }}>{icon}</p>
          <h1>{collection.title}</h1>
          <p>{desc}</p>
        </div>
      </section>

      <section style={{ padding: '48px 0' }}>
        <div className="content-wrapper">
          <Link
            href="/products"
            className="learn-more-text"
            style={{ display: 'inline-block', marginBottom: 24, textDecoration: 'none' }}
          >
            &larr; All Products
          </Link>

          {products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 0', color: '#999' }}>
              <p style={{ fontSize: 18, marginBottom: 16 }}>No products found in this collection.</p>
              <Link href="/products" className="button-secondary" style={{ textDecoration: 'none' }}>
                Browse all products
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
              {products.map(({ node }: { node: any }) => (
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
                      overflow: 'hidden',
                    }}>
                      {node.images.edges[0] ? (
                        <img
                          src={node.images.edges[0].node.url}
                          alt={node.images.edges[0].node.altText || node.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        icon
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
          )}
        </div>
      </section>
    </>
  )
}