import { toDate } from '@ngift/core/utils'
import { type ClassValue, clsx } from 'clsx'
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

/** "dans 3 jours" / "in 3 days": hours under a day, days under two months, then months. */
export const endsIn = (endDate: string, locale: string) => {
  const end = toDate(endDate)
  if (!end) return ''
  const hours = Math.max(0, Math.round((end.getTime() - Date.now()) / 3600_000))
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
  if (hours < 24) return rtf.format(hours, 'hour')
  if (hours < 60 * 24) return rtf.format(Math.round(hours / 24), 'day')
  return rtf.format(Math.round(hours / 24 / 30), 'month')
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

export { toDate }

/** Customer reviews wait for approval; reviews created before moderation have no status. */
export const isPublishedReview = (review: { status?: string | null }) =>
  !review.status || review.status === 'APPROVED'

/**
 * Free shipping is shown as "Shipping: Free", never as the cost then the same amount off
 * (customers read it as a fee to pay). The shipping and promotions to display; totals unchanged.
 */
export const foldFreeShipping = <P extends { type?: string | null; discountAmount: number }>(
  shipping: number,
  promotions: P[],
) => {
  const waived = promotions
    .filter(p => p.type === 'FREE_SHIPPING')
    .reduce((sum, p) => sum + p.discountAmount, 0)
  return {
    shipping: shipping - waived,
    waived,
    promotions: promotions.filter(p => p.type !== 'FREE_SHIPPING'),
  }
}
