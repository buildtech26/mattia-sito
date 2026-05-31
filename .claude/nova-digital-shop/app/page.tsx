import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { shopifyClient, GET_PRODUCTS } from '@/lib/shopify'
import { HeroRotatingWord, StackedSlideshow, TrustNumbers, TestimonialCarousel, MobileNavScript, FooterNavScript } from '@/components/harvest-components'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'NovaFlow - Notion Templates, Canva Designs & Make Automations',
  description: 'Discover premium digital products for creators: Notion templates, Canva design kits, Make automation workflows, and Lightroom presets. Instant digital delivery — boost your productivity today.',
  openGraph: {
    title: 'NovaFlow - Digital Products for Creators',
    description: 'Premium Notion templates, Canva designs, automations & Lightroom presets.',
    type: 'website',
  },
}

// Placeholder logo URLs for the trust bar
const LOGOS = [
  { name: 'DesignCo', emoji: '🎨' },
  { name: 'TechLab', emoji: '💻' },
  { name: 'StudioX', emoji: '📸' },
  { name: 'BrandHub', emoji: '🏢' },
  { name: 'CreatePro', emoji: '✨' },
  { name: 'PixelArt', emoji: '🖌️' },
]

export default async function Home() {
  const products = await shopifyClient.request(GET_PRODUCTS, { first: 8 })

  return (
    <>
      <MobileNavScript />
      <FooterNavScript />

      {/* JSON-LD WebSite Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: 'https://novaflowshops.vercel.app',
            name: 'NovaFlow',
            description: 'Premium digital products for creators',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://novaflowshops.vercel.app/products?search={search_term_string}',
              },
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />

      {/* ===== HERO ===== */}
      <section className="homepage-hero">
        <div className="content-wrapper">
          <div className="hero-columns">
            <div className="hero-text">
              <h1 className="hero-headline">
                <span className="hero-headline-line">Turn your ideas into</span>
                <span className="hero-headline-line">
                  <HeroRotatingWord />
                </span>
              </h1>
              <p className="subheading">
                NovaFlow helps creators and small businesses find premium digital products —
                Notion templates, Canva packs, automation workflows, and Lightroom presets —
                to boost productivity and creativity.
              </p>

              <div className="trial-actions">
                <form action="/products" className="email-signup-form" method="get">
                  <input type="email" name="search" id="email" placeholder="Search products..." className="email-signup-address" />
                  <input type="submit" value="Search" className="button button-trial email-signup-submit" />
                </form>
                <div className="trial-terms">
                  <ul className="trial-terms-list checked-items">
                    <li>Instant digital delivery</li>
                    <li>Lifetime access</li>
                    <li>30-day satisfaction guarantee</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="hero-image primary">
              <div style={{
                width: '100%',
                height: 400,
                background: 'linear-gradient(135deg, #1d1e1c 0%, #333 50%, #fa5d00 100%)',
                borderRadius: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 80,
                boxShadow: '0 24px 64px rgba(0,0,0,0.08)',
              }}>
                <span>⚡</span>
              </div>
            </div>
          </div>

          {/* Customer logos */}
          <div className="customer-logos desktop-only">
            <div className="trust-line">
              <p>Trusted by creators and small businesses worldwide</p>
            </div>
            <div className="customer-logo-row">
              {LOGOS.map((logo) => (
                <div key={logo.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 24 }}>{logo.emoji}</span>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURE GRID ===== */}
      <section className="homepage-hero" style={{ paddingTop: 0 }}>
        <div className="content-wrapper">
          <div className="feature-grid-header">
            <h2 className="section-heading">All your creative tools in one marketplace</h2>
          </div>
          <div className="feature-grid grid-3">
            {[
              { href: '/collections/notion', icon: '📓', title: 'Notion', subtitle: 'Stay organized', desc: 'Life planners, project managers, finance trackers, and content calendars — all ready to duplicate.', color: '#3b82f6' },
              { href: '/collections/canva', icon: '🎨', title: 'Canva', subtitle: 'Design in minutes', desc: 'Social media kits, brand identity packs, and templates for every platform. Fully customizable.', color: '#ec4899' },
              { href: '/collections/automations', icon: '⚡', title: 'Automations', subtitle: 'Work less, achieve more', desc: 'Ready-to-use Make workflows for email, invoicing, data sync, and more. No coding needed.', color: '#f59e0b' },
              { href: '/collections/lightroom', icon: '📸', title: 'Lightroom', subtitle: 'Perfect presets', desc: 'Moody, travel, portrait, and landscape presets. One-click edit for stunning photos.', color: '#10b981' },
            ].map((item) => (
              <Link key={item.title} href={item.href} className="full-card-link">
                <div className="feature-block warm">
                  <div className="feature-header">
                    <span style={{ fontSize: 40 }}>{item.icon}</span>
                    <h3>{item.title}</h3>
                  </div>
                  <div className="feature-description">
                    <p className="feature-subtitle">{item.subtitle}</p>
                    <p className="feature-body">{item.desc}</p>
                    <p className="learn-more-text">Browse {item.title} →</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STACKED SLIDESHOW ===== */}
      <StackedSlideshow />

      {/* ===== BENTO GRID ===== */}
      <section className="harvest-bento-grid">
        <div className="content-wrapper">
          <h2 className="section-heading">Everything connects,<br />so your workflow runs smoothly</h2>
          <div className="harvest-bento-grid-content">
            <div className="harvest-bento-grid-item grid-4 bento-item-1">
              <div className="bento-visual">
                <span style={{ fontSize: 48 }}>📓</span>
              </div>
              <div className="bento-text">
                <h3>Ready-to-Use Templates</h3>
                <p>Duplicate any Notion template and start organizing in minutes. No setup required.</p>
              </div>
            </div>
            <div className="harvest-bento-grid-item grid-4 bento-item-2">
              <div className="bento-visual">
                <span style={{ fontSize: 48 }}>🎨</span>
              </div>
              <div className="bento-text">
                <h3>Customizable Designs</h3>
                <p>Every Canva template is fully editable. Change colors, fonts, and images in clicks.</p>
              </div>
            </div>
            <div className="harvest-bento-grid-item grid-4 bento-item-3">
              <div className="bento-visual">
                <span style={{ fontSize: 48 }}>⚡</span>
              </div>
              <div className="bento-text">
                <h3>Automated Workflows</h3>
                <p>Import Make blueprints and connect your apps. Save hours of repetitive work.</p>
              </div>
            </div>
            <div className="harvest-bento-grid-item grid-6 bento-item-4">
              <div className="bento-visual">
                <span style={{ fontSize: 48 }}>📸</span>
              </div>
              <div className="bento-text">
                <h3>Professional Presets</h3>
                <p>Transform your photos with one click. Compatible with Lightroom Mobile & Desktop. Non-destructive editing.</p>
              </div>
            </div>
            <div className="harvest-bento-grid-item grid-6 bento-item-5">
              <div className="bento-visual">
                <span style={{ fontSize: 48 }}>🚀</span>
              </div>
              <div className="bento-text">
                <h3>Instant Digital Delivery</h3>
                <p>All products are delivered digitally. Download immediately after purchase — no shipping, no waiting.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST NUMBERS ===== */}
      <section className="trust-numbers-section">
        <div className="content-wrapper">
          <h2 className="section-heading">Numbers that speak for themselves.</h2>
          <TrustNumbers />

          {/* ===== FEATURED PRODUCTS ===== */}
          <div style={{ marginTop: 80 }}>
            <h2 className="section-heading">Popular products<br />right now.</h2>
            <div className="feature-grid">
              {products.products.edges.map(({ node }: { node: any }, i: number) => (
                <Link
                  key={node.handle}
                  href={`/products/${node.handle}`}
                  className="full-card-link"
                >
                  <div className="feature-block" style={{ minWidth: 240 }}>
                    <div className="feature-header">
                      <span style={{ fontSize: 32 }}>
                        {['📓', '📓', '📓', '📓', '🎨', '🎨', '⚡', '📸'][i] || '📦'}
                      </span>
                      <h3 style={{ fontSize: 16 }}>{node.title.length > 30 ? node.title.slice(0, 30) + '…' : node.title}</h3>
                    </div>
                    <div className="feature-description">
                      <p className="feature-subtitle">
                        {node.variants.edges[0].node.price.amount} €
                      </p>
                      <p className="feature-body line-clamp-2" style={{ fontSize: 13 }}>
                        {node.description?.replace(/<[^>]*>/g, '').slice(0, 100)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <Link href="/products" className="button-secondary">
                View All Products →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <TestimonialCarousel />

      {/* ===== SUBFOOTER CTA ===== */}
      <section className="subfooter" aria-labelledby="subfooter-headline">
        <div className="subfooter-stack">
          <div className="subfooter-card">
            <div className="subfooter-copy">
              <h2 id="subfooter-headline" className="subfooter-headline">
                Ready to boost<br />your productivity?
              </h2>
              <p className="subfooter-lede">
                Browse our collection of premium digital products and find everything you need to work smarter, not harder.
              </p>

              <Link href="/products" className="subfooter-cta">
                Browse All Products
              </Link>

              <div className="subfooter-app-downloads">
                <div className="subfooter-app-group">
                  <p className="subfooter-app-group-label">Categories</p>
                  <div className="subfooter-app-buttons">
                    <Link href="/collections/notion" className="rb-dl-btn">
                      <span>📓</span>
                      <span>Notion</span>
                    </Link>
                    <Link href="/collections/canva" className="rb-dl-btn">
                      <span>🎨</span>
                      <span>Canva</span>
                    </Link>
                    <Link href="/collections/automations" className="rb-dl-btn">
                      <span>⚡</span>
                      <span>Automations</span>
                    </Link>
                    <Link href="/collections/lightroom" className="rb-dl-btn">
                      <span>📸</span>
                      <span>Lightroom</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, rgba(250,93,0,0.1), rgba(250,93,0,0.2))',
              borderRadius: 16,
              height: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 100,
            }}>
              🛍️
            </div>
          </div>
        </div>
      </section>
    </>
  )
}