import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import mongoose, { Schema, Model, Document } from 'mongoose'
import { IProduct } from '../models/Product'
import { IReview } from '../models/Reviews'
import { differenceInWeeks, differenceInDays, differenceInHours } from 'date-fns'

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

// Singleton pattern to prevent model redefinition
export function getOrCreateModel<T extends Document>(
  modelName: string,
  schema: Schema<T>,
): Model<T> {
  // Check if the model already exists
  if (mongoose.models[modelName]) {
    return mongoose.models[modelName] as Model<T>
  }

  // If not, create and return the model
  return mongoose.model<T>(modelName, schema)
}

export const getReviewAverage = (reviews: IReview[]) => {
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
  const weeks = differenceInWeeks(endDate, startDate)
  if (weeks > 0) {
    return `${weeks} week${weeks !== 1 ? 's' : ''}`
  }

  const days = differenceInDays(endDate, startDate)
  if (days > 0) {
    return `${days} day${days !== 1 ? 's' : ''}`
  }

  const hours = differenceInHours(endDate, startDate)
  return `${hours} hour${hours !== 1 ? 's' : ''}`
}

export const canDisplayPromoPrice = (product: IProduct) => {
  const now = new Date()
  if (!product.price.saleStartDate || !product.price.saleEndDate) return false

  const startDate = new Date(product.price.saleStartDate)
  const endDate = new Date(product.price.saleEndDate)

  return now >= startDate && now <= endDate
}
