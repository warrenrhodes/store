'use client'

import { useCart } from '@/hooks/useCart'
import { Product } from '@/lib/firebase/models'
import { getRegularPrice } from '@/lib/utils/utils'
import { redirect } from 'next/navigation'
import { useCallback, useEffect } from 'react'

export const AutoAddToCart = ({ product }: { product: Product }) => {
  const { addItem } = useCart()
  const addProductToCart = useCallback(async () => {
    addItem({
      product: product,
      quantity: 1,
      price: getRegularPrice(product),
    })

    redirect('/checkout')
  }, [])

  useEffect(() => {
    addProductToCart()
  }, [addProductToCart])
  return (
    <div>
      <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-12 w-12"></div>
    </div>
  )
}
