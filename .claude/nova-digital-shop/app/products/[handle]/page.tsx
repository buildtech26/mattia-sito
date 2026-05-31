import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { shopifyClient, GET_PRODUCT } from '@/lib/shopify'
import { getProductContent } from '@/lib/product-content'
import AddToCartButton from '@/components/cart/AddToCartButton'

export const dynamic = 'force-dynamic'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://novaflowshops.vercel.app'

export async function generateMetadata(
  { params }: { params: Promise<{ handle: string }> }
): Promise<Metadata> {
  const { handle } = await params
  const product = await shopifyClient.request(GET_PRODUCT, { handle })

  if (!product.product) {
    return { title: 'Product Not Found - NovaFlow' }
  }

  const { product: prod } = product
  const image = prod.images.edges[0]?.node.url
  const cleanDesc = prod.description?.replace(/<[^>]*>/g, '').slice(0, 140) || 'Premium digital product'

  return {
    title: `${prod.title} | NovaFlow - Premium Digital Product`,
    description: `Buy ${prod.title}. ${cleanDesc}. Instant digital delivery.`,
    openGraph: {
      title: `${prod.title} - NovaFlow`,
      description: cleanDesc,
      images: image ? [{ url: image, width: 800, height: 800, alt: prod.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${prod.title} - NovaFlow`,
      description: cleanDesc,
      images: image ? [image] : undefined,
    },
  }
}

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
  const content = getProductContent(handle, prod.productType || prod.title)

  const price = prod.variants.edges[0]?.node.price.amount || '0'
  const productImage = prod.images.edges[0]?.node.url

  return (
    <>
      {/* JSON-LD Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: prod.title,
            description: prod.description?.replace(/<[^>]*>/g, '') || '',
            image: productImage || undefined,
            brand: { '@type': 'Brand', name: 'NovaFlow' },
            offers: {
              '@type': 'Offer',
              price,
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
            },
          }),
        }}
      />

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
              { '@type': 'ListItem', position: 3, name: prod.title, item: `${siteUrl}/products/${handle}` },
            ],
          }),
        }}
      />

      {/* Page Banner */}
      <section className="page-banner">
        <div className="content-wrapper">
          <p style={{ fontSize: 13, color: '#999', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
            {prod.productType || 'Digital Product'}
          </p>
          <h1>{prod.title}</h1>
        </div>
      </section>

      {/* Product Content */}
      <section style={{ padding: '48px 0' }}>
        <div className="content-wrapper">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            {/* Product Images */}
            <div>
              {prod.images.edges.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {prod.images.edges.map(({ node }: { node: any }, i: number) => (
                    <div
                      key={i}
                      style={{
                        aspectRatio: '16/10',
                        background: '#f8f8f8',
                        borderRadius: 16,
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      <Image
                        src={node.url}
                        alt={node.altText || prod.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{
                  aspectRatio: '16/10',
                  background: 'linear-gradient(135deg, #fff8f1, #ffe8d6)',
                  borderRadius: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 80,
                }}>
                  {prod.productType?.toLowerCase().includes('notion') ? '📓' :
                   prod.productType?.toLowerCase().includes('canva') ? '🎨' :
                   prod.productType?.toLowerCase().includes('automation') ? '⚡' :
                   '📸'}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div style={{
                fontSize: 36,
                fontWeight: 700,
                color: '#fa5d00',
                marginBottom: 24,
              }}>
                {prod.variants.edges[0].node.price.amount} €
              </div>

              <div className="feature-block warm" style={{ marginBottom: 24 }}>
                <div className="feature-description">
                  {prod.description && (
                    <div
                      className="feature-body"
                      style={{ fontSize: 15, lineHeight: 1.7 }}
                      dangerouslySetInnerHTML={{ __html: prod.description }}
                    />
                  )}
                </div>
              </div>

              {/* What's Inside — Visual Preview Gallery */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    background: '#fff8f1',
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                    fontWeight: 700,
                    color: '#fa5d00',
                  }}>
                    i
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>What&apos;s Inside</h3>
                </div>

                <p style={{ fontSize: 14, color: '#666', marginBottom: 16 }}>{content.tagline}</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {content.previewScreens.map((screen, i) => (
                    <div
                      key={i}
                      style={{
                        borderRadius: 12,
                        overflow: 'hidden',
                        border: `1px solid ${screen.isLocked ? '#e9e9e9' : '#fa5d00'}`,
                        position: 'relative',
                      }}
                    >
                      <div style={{ aspectRatio: '4/3', position: 'relative' }}>
                        <div style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: i === 0 ? 'linear-gradient(135deg, #fff8f1, #ffe8d6)' :
                                      i === 1 ? 'linear-gradient(135deg, #f0f0ff, #e8e8ff)' :
                                      i === 2 ? 'linear-gradient(135deg, #f0fff4, #e0ffe8)' :
                                      'linear-gradient(135deg, #fff8e1, #ffe0b0)',
                        }}>
                          <span style={{ fontSize: 32 }}>
                            {i === 0 ? '📊' : i === 1 ? '📈' : i === 2 ? '🎯' : '📝'}
                          </span>
                        </div>

                        {screen.isLocked && (
                          <div style={{
                            position: 'absolute',
                            inset: 0,
                            backdropFilter: 'blur(4px)',
                            background: 'rgba(255,255,255,0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                            <div style={{
                              background: 'rgba(255,255,255,0.9)',
                              borderRadius: 8,
                              padding: 8,
                            }}>
                              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" width={20} height={20}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>

                      <div style={{ padding: 8 }}>
                        <p style={{ fontSize: 12, fontWeight: 600, margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {screen.label}
                        </p>
                        <p style={{ fontSize: 10, color: '#999', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {screen.description}
                        </p>
                      </div>

                      {screen.isLocked && (
                        <div style={{ position: 'absolute', top: 6, right: 6 }}>
                          <span style={{ fontSize: 10, background: '#fef3c7', color: '#b45309', padding: '2px 6px', borderRadius: 12, fontWeight: 500 }}>
                            Premium
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div style={{
                  marginTop: 16,
                  background: '#fff8f1',
                  border: '1px solid #fde68a',
                  borderRadius: 12,
                  padding: 12,
                  display: 'flex',
                  gap: 8,
                  alignItems: 'flex-start',
                  fontSize: 12,
                  color: '#92400e',
                }}>
                  <span>🔒</span>
                  <p style={{ margin: 0 }}>
                    {content.previewScreens.filter(s => s.isLocked).length} of {content.previewScreens.length} previews are locked.
                    Full access unlocked after purchase.
                  </p>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 16,
                  marginTop: 16,
                  paddingTop: 16,
                  borderTop: '1px solid #e9e9e9',
                }}>
                  <div>
                    <h4 style={{ fontSize: 11, fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Format</h4>
                    <p style={{ fontSize: 14, margin: 0 }}>{content.format}</p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: 11, fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Compatibility</h4>
                    <p style={{ fontSize: 14, margin: 0 }}>{content.compatibility.join(', ')}</p>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div style={{ marginBottom: 16 }}>
                <AddToCartButton variantId={prod.variants.edges[0].node.id} />
              </div>

              <p style={{ fontSize: 13, color: '#999' }}>
                This is a digital product. No physical item will be shipped.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}