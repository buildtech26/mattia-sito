'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart-context'

export default function AddToCartButton({ variantId }: { variantId: string }) {
  const { addToCart, loading } = useCart()
  const [added, setAdded] = useState(false)

  const handleClick = async () => {
    await addToCart(variantId)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition ${
        added
          ? 'bg-green-600 hover:bg-green-700'
          : 'bg-blue-600 hover:bg-blue-700'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {loading ? 'Adding...' : added ? 'Added!' : 'Add to Cart'}
    </button>
  )
}