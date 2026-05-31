'use client'

import { useCart } from '@/lib/cart-context'
import Image from 'next/image'
import Link from 'next/link'

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQuantity, loading } = useCart()
  const lines = cart?.lines?.edges ?? []

  if (!cartOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity"
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Cart ({cart?.totalQuantity ?? 0})
          </h2>
          <button
            onClick={() => setCartOpen(false)}
            className="p-1 text-gray-500 hover:text-gray-700"
            aria-label="Close cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-4 text-gray-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <p className="text-lg mb-4">Your cart is empty</p>
            <Link
              href="/products"
              onClick={() => setCartOpen(false)}
              className="text-[#fa5d00] hover:text-[#e05200] font-medium"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {lines.map(({ node }: { node: any }) => (
                <div key={node.id} className="flex gap-4 border-b border-gray-100 pb-4">
                  <div className="w-20 h-20 relative bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                    {node.merchandise.product.images.edges[0] && (
                      <Image
                        src={node.merchandise.product.images.edges[0].node.url}
                        alt={node.merchandise.product.images.edges[0].node.altText || node.merchandise.product.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${node.merchandise.product.handle}`}
                      onClick={() => setCartOpen(false)}
                      className="font-medium text-gray-900 hover:text-[#fa5d00] transition line-clamp-1"
                    >
                      {node.merchandise.product.title}
                    </Link>
                    {node.merchandise.title !== 'Default Title' && (
                      <p className="text-sm text-gray-500">{node.merchandise.title}</p>
                    )}
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {parseFloat(node.merchandise.price.amount).toFixed(2)} €
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          onClick={() => {
                            if (node.quantity <= 1) removeFromCart(node.id)
                            else updateQuantity(node.id, node.quantity - 1)
                          }}
                          className="px-2 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                          disabled={loading}
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-sm text-gray-900 min-w-[2rem] text-center">
                          {node.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(node.id, node.quantity + 1)}
                          className="px-2 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                          disabled={loading}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(node.id)}
                        className="text-sm text-red-500 hover:text-red-700"
                        disabled={loading}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 p-4 space-y-4">
              <div className="flex justify-between text-lg font-semibold text-gray-900">
                <span>Subtotal</span>
                <span>
                  {cart?.cost?.subtotalAmount
                    ? `${parseFloat(cart.cost.subtotalAmount.amount).toFixed(2)} €`
                    : '0.00 €'}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Shipping & taxes calculated at checkout.
              </p>
              <a
                href={cart?.checkoutUrl ?? '#'}
                className="block w-full text-center bg-[#fa5d00] text-white py-3 rounded-2xl font-semibold hover:bg-[#e05200] transition"
              >
                Checkout
              </a>
            </div>
          </>
        )}
      </div>
    </>
  )
}