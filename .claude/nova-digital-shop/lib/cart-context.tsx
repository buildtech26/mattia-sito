'use client'

import { createContext, useContext, useCallback, useEffect, useState, useRef } from 'react'
import { shopifyClient, CREATE_CART, ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_LINE, GET_CART } from '@/lib/shopify'

const CART_STORAGE_KEY = 'novaflow_cart_id'

interface CartLine {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    price: { amount: string; currencyCode: string }
    product: {
      title: string
      handle: string
      images: { edges: { node: { url: string; altText: string | null } }[] }
    }
  }
}

interface Cart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: { subtotalAmount: { amount: string; currencyCode: string } }
  lines: { edges: { node: CartLine }[] }
}

interface CartContextType {
  cart: Cart | null
  loading: boolean
  addToCart: (variantId: string, quantity?: number) => Promise<void>
  removeFromCart: (lineId: string) => Promise<void>
  updateQuantity: (lineId: string, quantity: number) => Promise<void>
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const initialized = useRef(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const storedId = localStorage.getItem(CART_STORAGE_KEY)
    if (storedId) {
      shopifyClient
        .request(GET_CART, { cartId: storedId })
        .then((data: any) => {
          if (data.cart) setCart(data.cart)
          else localStorage.removeItem(CART_STORAGE_KEY)
        })
        .catch(() => localStorage.removeItem(CART_STORAGE_KEY))
    }
  }, [])

  const addToCart = useCallback(async (variantId: string, quantity = 1) => {
    setLoading(true)
    try {
      if (cart?.id) {
        const data: any = await shopifyClient.request(ADD_TO_CART, {
          cartId: cart.id,
          lines: [{ merchandiseId: variantId, quantity }],
        })
        if (data.cartLinesAdd?.cart) setCart(data.cartLinesAdd.cart)
      } else {
        const data: any = await shopifyClient.request(CREATE_CART, {
          lines: [{ merchandiseId: variantId, quantity }],
        })
        if (data.cartCreate?.cart) {
          setCart(data.cartCreate.cart)
          localStorage.setItem(CART_STORAGE_KEY, data.cartCreate.cart.id)
        }
      }
    } catch (err) {
      console.error('Failed to add to cart:', err)
    } finally {
      setLoading(false)
    }
  }, [cart])

  const removeFromCart = useCallback(async (lineId: string) => {
    if (!cart?.id) return
    setLoading(true)
    try {
      const data: any = await shopifyClient.request(REMOVE_FROM_CART, {
        cartId: cart.id,
        lineIds: [lineId],
      })
      if (data.cartLinesRemove?.cart) setCart(data.cartLinesRemove.cart)
    } catch (err) {
      console.error('Failed to remove from cart:', err)
    } finally {
      setLoading(false)
    }
  }, [cart])

  const updateQuantity = useCallback(async (lineId: string, quantity: number) => {
    if (!cart?.id) return
    setLoading(true)
    try {
      const data: any = await shopifyClient.request(UPDATE_CART_LINE, {
        cartId: cart.id,
        lines: [{ id: lineId, quantity }],
      })
      if (data.cartLinesUpdate?.cart) setCart(data.cartLinesUpdate.cart)
    } catch (err) {
      console.error('Failed to update cart:', err)
    } finally {
      setLoading(false)
    }
  }, [cart])

  return (
    <CartContext.Provider
      value={{ cart, loading, addToCart, removeFromCart, updateQuantity, cartOpen, setCartOpen }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}