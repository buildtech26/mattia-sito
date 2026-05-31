import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { CartProvider } from '@/lib/cart-context'
import CartIcon from '@/components/cart/CartIcon'
import CartDrawer from '@/components/cart/CartDrawer'

const inter = Inter({ subsets: ['latin'] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://novaflowshops.vercel.app'

export const metadata: Metadata = {
  title: 'NovaFlow - Premium Digital Products for Creators & Entrepreneurs',
  description: 'Discover premium Notion templates, Canva design kits, Make automation workflows, and Lightroom presets. Instant digital delivery — boost your productivity today.',
  keywords: 'Notion templates, Canva templates, Make automation, Lightroom presets, digital products, productivity templates, creator tools',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'NovaFlow - Digital Products for Creators',
    description: 'Premium Notion, Canva, automation, and Lightroom products — instant delivery.',
    url: siteUrl,
    siteName: 'NovaFlow',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NovaFlow - Digital Products for Creators',
    description: 'Premium Notion, Canva, Make, Lightroom products — instant delivery.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          {/* Skip link */}
          <a href="#main-content" className="rb-nav-skip">Skip to content</a>

          {/* Header */}
          <header className="rb-nav-wrap" role="banner">
            <nav className="rb-nav" aria-label="Primary">
              <div className="rb-nav-start">
                <Link href="/" className="rb-nav-logo" aria-label="NovaFlow home">
                  NovaFlow
                </Link>

                <ul className="rb-nav-links" role="list">
                  <li className="rb-nav-item rb-nav-item--has-menu">
                    <button type="button" className="rb-nav-trigger" aria-haspopup="true" aria-expanded="false">
                      <span>Products</span>
                      <svg className="rb-nav-chevron" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
                        <path d="M2.5 4.25 6 7.75l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </button>

                    <div className="rb-nav-panel" role="menu">
                      <div className="rb-nav-col">
                        <p className="rb-nav-col-label">Categories</p>
                        <ul className="rb-nav-sublist" role="list">
                          <li>
                            <Link href="/collections/notion" className="rb-nav-sublink">
                              <span className="rb-nav-sublink-icon text-2xl">📓</span>
                              <span className="rb-nav-sublink-text">Notion Templates</span>
                            </Link>
                          </li>
                          <li>
                            <Link href="/collections/canva" className="rb-nav-sublink">
                              <span className="rb-nav-sublink-icon text-2xl">🎨</span>
                              <span className="rb-nav-sublink-text">Canva Templates</span>
                            </Link>
                          </li>
                          <li>
                            <Link href="/collections/automations" className="rb-nav-sublink">
                              <span className="rb-nav-sublink-icon text-2xl">⚡</span>
                              <span className="rb-nav-sublink-text">Automations</span>
                            </Link>
                          </li>
                          <li>
                            <Link href="/collections/lightroom" className="rb-nav-sublink">
                              <span className="rb-nav-sublink-icon text-2xl">📸</span>
                              <span className="rb-nav-sublink-text">Lightroom Presets</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="rb-nav-col">
                        <p className="rb-nav-col-label">Quick links</p>
                        <ul className="rb-nav-sublist" role="list">
                          <li>
                            <Link href="/products" className="rb-nav-sublink">
                              <span className="rb-nav-sublink-text">All Products</span>
                            </Link>
                          </li>
                          <li>
                            <Link href="/account/downloads" className="rb-nav-sublink">
                              <span className="rb-nav-sublink-text">My Downloads</span>
                            </Link>
                          </li>
                        </ul>
                        <Link href="/products" className="rb-nav-panel-cta">Browse all products →</Link>
                      </div>
                    </div>
                  </li>

                  <li className="rb-nav-item">
                    <Link href="/products" className="rb-nav-trigger">
                      <span>All Products</span>
                    </Link>
                  </li>

                  <li className="rb-nav-item">
                    <Link href="/account/downloads" className="rb-nav-trigger">
                      <span>Downloads</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="rb-nav-actions">
                <CartIcon />
                <Link href="/products" className="rb-nav-btn rb-nav-btn--primary">
                  Shop Now
                </Link>
                <button type="button" className="rb-nav-mobile-toggle" aria-label="Open menu" aria-expanded="false">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                  </svg>
                </button>
              </div>
            </nav>

            {/* Mobile Nav */}
            <div id="rb-nav-mobile" hidden>
              <div className="rb-nav-mobile-item">
                <button type="button" className="rb-nav-mobile-trigger" aria-expanded="false">
                  <span>Categories</span>
                  <svg className="rb-nav-chevron" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
                    <path d="M2.5 4.25 6 7.75l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </button>
                <ul className="rb-nav-mobile-sublist" role="list">
                  <li><Link href="/collections/notion" className="rb-nav-mobile-sublink">Notion Templates</Link></li>
                  <li><Link href="/collections/canva" className="rb-nav-mobile-sublink">Canva Templates</Link></li>
                  <li><Link href="/collections/automations" className="rb-nav-mobile-sublink">Automations</Link></li>
                  <li><Link href="/collections/lightroom" className="rb-nav-mobile-sublink">Lightroom Presets</Link></li>
                </ul>
              </div>
              <div className="rb-nav-mobile-item">
                <Link href="/products" className="rb-nav-mobile-link">All Products</Link>
              </div>
              <div className="rb-nav-mobile-item">
                <Link href="/account/downloads" className="rb-nav-mobile-link">Downloads</Link>
              </div>
              <div className="rb-nav-mobile-actions">
                <Link href="/products" className="rb-nav-btn rb-nav-btn--primary" style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}>
                  Shop Now
                </Link>
              </div>
            </div>
          </header>
          <div className="rb-nav-spacer" aria-hidden="true"></div>

          {/* JSON-LD Organization Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'NovaFlow',
                url: siteUrl,
                description: 'Premium digital products for creators and entrepreneurs',
                knowsAbout: ['Notion Templates', 'Canva Templates', 'Make Automations', 'Lightroom Presets'],
              }),
            }}
          />

          {/* Main Content */}
          <main id="main-content">{children}</main>

          {/* Cart */}
          <CartDrawer />

          {/* Footer */}
          <footer className="footer">
            <div className="footer-inner">
              <div className="footer-brand">
                <Link href="/" className="footer-brand-logo" aria-label="NovaFlow home">
                  NovaFlow
                </Link>
              </div>

              <div className="footer-top">
                <nav className="footer-nav" aria-label="Footer navigation">
                  <div className="footer-nav-col">
                    <button type="button" className="footer-nav-trigger" aria-expanded="false" aria-controls="footer-col-1">
                      <span className="footer-nav-heading">Shop</span>
                      <svg className="footer-nav-chevron" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
                        <path d="M2.5 4.25 6 7.75l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </button>
                    <ul className="footer-nav-list" id="footer-col-1" role="list">
                      <li><Link href="/products">All Products</Link></li>
                      <li><Link href="/collections/notion">Notion Templates</Link></li>
                      <li><Link href="/collections/canva">Canva Templates</Link></li>
                      <li><Link href="/collections/automations">Automations</Link></li>
                      <li><Link href="/collections/lightroom">Lightroom Presets</Link></li>
                    </ul>
                  </div>

                  <div className="footer-nav-col">
                    <button type="button" className="footer-nav-trigger" aria-expanded="false" aria-controls="footer-col-2">
                      <span className="footer-nav-heading">Community</span>
                      <svg className="footer-nav-chevron" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
                        <path d="M2.5 4.25 6 7.75l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </button>
                    <ul className="footer-nav-list" id="footer-col-2" role="list">
                      <li><Link href="/products">Browse Shop</Link></li>
                      <li><Link href="/account/downloads">My Downloads</Link></li>
                    </ul>
                  </div>

                  <div className="footer-nav-col">
                    <button type="button" className="footer-nav-trigger" aria-expanded="false" aria-controls="footer-col-3">
                      <span className="footer-nav-heading">Company</span>
                      <svg className="footer-nav-chevron" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
                        <path d="M2.5 4.25 6 7.75l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </button>
                    <ul className="footer-nav-list" id="footer-col-3" role="list">
                      <li><a href="mailto:hello@novaflowshops.com">Contact</a></li>
                    </ul>
                  </div>
                </nav>

                <a href="/products" className="forecast-card">
                  <div className="forecast-card-text">
                    <p className="forecast-card-eyebrow">Explore</p>
                    <p className="forecast-card-title">NovaFlow Shop</p>
                    <p className="forecast-card-desc">The fastest way to find digital products that boost your creativity.</p>
                    <span className="forecast-card-button">Browse now →</span>
                  </div>
                  <div className="forecast-card-image" aria-hidden="true">
                    <div style={{ height: 48, background: 'rgba(250,93,0,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🚀</div>
                  </div>
                </a>
              </div>

              <div className="footer-bottom">
                <ul className="footer-legal-list">
                  <li><a href="#">Privacy</a></li>
                  <li><a href="#">Terms</a></li>
                </ul>

                <div className="footer-social" aria-label="Social media">
                  <a className="footer-social-link" target="_blank" rel="noopener" href="#" aria-label="NovaFlow on X">
                    <svg viewBox="0 0 20 19.9897" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path fill="currentColor" fillRule="nonzero" d="M11.9027,8.46429 L19.3482,0 L17.5838,0 L11.119,7.34942 L5.95547,0 L0,0 L7.8082,11.1136 L0,19.9897 L1.76443,19.9897 L8.59152,12.2285 L14.0445,19.9897 L20,19.9897 L11.9023,8.46429 L11.9027,8.46429 Z M9.48608,11.2115 L8.69495,10.1049 L2.40018,1.29901 L5.11025,1.29901 L10.1902,8.40562 L10.9813,9.51229 L17.5847,18.7498 L14.8746,18.7498 L9.48608,11.212 L9.48608,11.2115 Z"></path>
                    </svg>
                  </a>
                  <a className="footer-social-link" target="_blank" rel="noopener" href="#" aria-label="NovaFlow on LinkedIn">
                    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path fill="currentColor" d="M20 17.5v-15.1c0-1.3-1.1-2.4-2.4-2.4h-15.2c-1.3 0-2.4 1.1-2.4 2.4v15.1c0 1.4 1.1 2.5 2.4 2.5h15.2c1.3 0 2.4-1.1 2.4-2.5zm-14.1-.5h-2.9v-9.5h3v9.5h-.1zm-1.5-10.8c-1 0-1.7-.8-1.7-1.7s.8-1.7 1.7-1.7c1 0 1.7.8 1.7 1.7.1.9-.7 1.7-1.7 1.7zm12.6 10.8h-3v-4.6c0-1.101 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.5v4.6h-3v-9.5h2.8v1.3c.6-.8 1.5-1.5 3-1.5 3 0 3.6 2 3.6 4.5v5.2h-.1z"></path>
                    </svg>
                  </a>
                  <a className="footer-social-link" target="_blank" rel="noopener" href="#" aria-label="NovaFlow on Instagram">
                    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path fill="currentColor" d="M9.999 1.801c2.67 0 2.986.011 4.04.059a5.523 5.523 0 0 1 1.857.345c.434.16.827.417 1.15.75.332.322.589.715.75 1.15.22.594.337 1.222.344 1.855.048 1.055.059 1.375.059 4.041 0 2.666-.011 2.986-.059 4.041a5.524 5.524 0 0 1-.345 1.856 3.305 3.305 0 0 1-1.897 1.897 5.524 5.524 0 0 1-1.856.345c-1.055.048-1.375.059-4.04.059-2.667 0-2.987-.011-4.042-.059a5.524 5.524 0 0 1-1.856-.345 3.09 3.09 0 0 1-1.15-.75 3.09 3.09 0 0 1-.75-1.15 5.523 5.523 0 0 1-.344-1.855c-.048-1.055-.059-1.375-.059-4.041 0-2.666.011-2.986.059-4.041a5.523 5.523 0 0 1 .345-1.856 3.09 3.09 0 0 1 .75-1.15 3.09 3.09 0 0 1 1.15-.75 5.523 5.523 0 0 1 1.855-.345C7.015 1.81 7.335 1.8 10.002 1.8L10 1.8Zm0-1.801C7.283 0 6.943.011 5.874.06A7.334 7.334 0 0 0 3.45.525a4.884 4.884 0 0 0-1.771 1.154c-.51.499-.903 1.103-1.154 1.77A7.334 7.334 0 0 0 .06 5.875C.011 6.943 0 7.283 0 10s.011 3.056.06 4.124c.017.829.174 1.649.465 2.425.25.667.644 1.272 1.154 1.771.499.51 1.103.903 1.77 1.154a7.336 7.336 0 0 0 2.428.465c1.066.048 1.406.06 4.122.06s3.056-.012 4.124-.06a7.336 7.336 0 0 0 2.427-.465 5.117 5.117 0 0 0 2.925-2.925 7.336 7.336 0 0 0 .465-2.427c.049-1.066.06-1.406.06-4.125 0-2.718-.011-3.056-.06-4.124a7.335 7.335 0 0 0-.467-2.422 4.886 4.886 0 0 0-1.154-1.771A4.885 4.885 0 0 0 16.548.525 7.334 7.334 0 0 0 14.123.06C13.055.011 12.715 0 10 0Z"></path>
                    </svg>
                  </a>
                </div>

                <p className="footer-copyright">© 2026 NovaFlow. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  )
}