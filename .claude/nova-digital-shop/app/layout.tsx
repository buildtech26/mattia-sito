import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { CartProvider } from '@/lib/cart-context'
import CartIcon from '@/components/cart/CartIcon'
import CartDrawer from '@/components/cart/CartDrawer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NovaFlow - Digital Products for Creators',
  description: 'Notion templates, automation workflows, Canva packs, and Lightroom presets',
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
          <header className="border-b border-gray-200 bg-white">
            <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                NovaFlow
              </Link>
              <div className="flex items-center gap-6">
                <Link href="/products" className="text-gray-600 hover:text-gray-900">
                  Products
                </Link>
                <Link href="/account/downloads" className="text-gray-600 hover:text-gray-900">
                  My Downloads
                </Link>
                <CartIcon />
              </div>
            </nav>
          </header>
          <main>{children}</main>
          <CartDrawer />
          <footer className="border-t border-gray-200 py-12 mt-20">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>&copy; 2025 NovaFlow. All rights reserved.</p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  )
}