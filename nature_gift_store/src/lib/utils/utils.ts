import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import {
  differenceInDays,
  differenceInYears,
  differenceInMonths,
  differenceInHours,
  format,
} from 'date-fns'
import { IProduct } from '../api/products'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getPrice = (product: IProduct): number => {
  const now = new Date()

  if (product.price.sale && product.price.saleStartDate && product.price.saleEndDate) {
    if (now >= product.price.saleStartDate && now <= product.price.saleEndDate) {
      return product.price.sale
    }
  }

  return product.price.regular
}

export const getReviewAverage = (reviews: IProduct['reviews']) => {
  if (reviews.length === 0) {
    return 0
  }
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
  return sum / reviews.length
}

export const priceFormatted = (price: number) => {
  return price.toLocaleString('en-US', { style: 'currency', currency: 'XAF' })
}

export const getRegularPrice = (product: IProduct) => {
  if (product.price.sale && canDisplayPromoPrice(product)) {
    return product.price.sale
  }
  return product.price.regular
}

export const getPercentageDiscount = (regularPrice: number, salePrice: number) => {
  const discount = regularPrice - salePrice
  const percentageDiscount = (discount / regularPrice) * 100
  return percentageDiscount
}

export function getDetailedExpiresIn(endDate: Date): string {
  const startDate = new Date()
  const daysDiff = differenceInDays(endDate, startDate)
  const hoursDiff = differenceInHours(endDate, startDate)
  const monthsDiff = differenceInMonths(endDate, startDate)
  const yearsDiff = differenceInYears(endDate, startDate)

  if (hoursDiff < 24) {
    return `expired in ${hoursDiff} hour${hoursDiff !== 1 ? 's' : ''}`
  }

  if (daysDiff < 7) {
    return `expired in ${daysDiff} day${daysDiff !== 1 ? 's' : ''}`
  }

  if (monthsDiff < 1) {
    return `expired on ${format(endDate, 'MMM dd, yyyy')}`
  }

  if (yearsDiff < 1) {
    return `expired in ${monthsDiff} month${monthsDiff !== 1 ? 's' : ''}`
  }

  return `expired in ${yearsDiff} year${yearsDiff !== 1 ? 's' : ''}`
}

export const canDisplayPromoPrice = (product: IProduct) => {
  const now = new Date()
  if (!product.price.saleStartDate || !product.price.saleEndDate) return false

  const startDate = new Date(product.price.saleStartDate)
  const endDate = new Date(product.price.saleEndDate)

  return now >= startDate && now <= endDate
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
