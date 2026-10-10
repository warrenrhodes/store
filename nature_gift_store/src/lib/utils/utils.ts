import { type ClassValue, clsx } from 'clsx'
import {
  differenceInDays,
  differenceInHours,
  differenceInMonths,
  differenceInYears,
  format,
} from 'date-fns'
import { twMerge } from 'tailwind-merge'
import { Product, Review } from '../firebase/models'
import { Price } from '../type'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getPrice = (product: Product): number => {
  const now = new Date()
  const price = product.price as unknown as Price

  if (price.sale && price.saleStartDate && price.saleEndDate) {
    const startDate = new Date(price.saleStartDate)
    const endDate = new Date(price.saleEndDate)
    if (now >= startDate && now <= endDate) {
      return price.sale
    }
  }

  return price.regular
}

export const getReviewAverage = (reviews: Review[]) => {
  if (reviews.length === 0) {
    return 0
  }
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
  return Math.round((sum / reviews.length) * 10) / 10
}

export const priceFormatted = (price: number) => {
  return price.toLocaleString('fr-FR', {
    style: 'currency',
    currency: 'XAF',
    maximumFractionDigits: 0,
  })
}

export const getRegularPrice = (product: Product) => {
  const price = product.price as unknown as Price

  if (price.sale && canDisplayPromoPrice(product)) {
    return price.sale
  }
  return price.regular
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

export const canDisplayPromoPrice = (product: Product) => {
  const now = new Date()
  const price = product.price as unknown as Price
  const startDate = toDate(price.saleStartDate)
  const endDate = toDate(price.saleEndDate)
  if (!startDate || !endDate) return false

  return now >= startDate && now <= endDate
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Normalizes any stored date shape to a valid Date (or undefined): ISO string, Date, epoch ms,
 * or a Firestore Timestamp (live, or serialized as {_seconds} / {seconds}).
 */
export const toDate = (value: unknown): Date | undefined => {
  if (!value) return undefined
  const v = value as { toDate?: () => Date; _seconds?: number; seconds?: number }
  const date =
    typeof v.toDate === 'function'
      ? v.toDate()
      : typeof v._seconds === 'number' || typeof v.seconds === 'number'
        ? new Date((v._seconds ?? v.seconds!) * 1000)
        : new Date(value as string | number | Date)
  return isNaN(date.getTime()) ? undefined : date
}
