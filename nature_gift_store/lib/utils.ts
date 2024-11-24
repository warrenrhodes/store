import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { CartItem, IProduct } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculateTotalPriceOfItemCart = (cartItem: CartItem): number => {
  const { quantity, item: product, promotion } = cartItem
  const price = product.promoPrice || product.price
  if (!promotion) {
    return price * quantity
  }

  if (quantity >= promotion.minProductsToApply) {
    const timesApplied = Math.floor(quantity / promotion.minProductsToApply)
    return price * quantity - promotion.discountValue * timesApplied
  } else {
    return price * quantity
  }
}

export const getPrice = (product: IProduct) => product.promoPrice || product.price
