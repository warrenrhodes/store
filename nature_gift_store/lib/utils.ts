import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { CartItem, IProduct } from './types'
import mongoose, { Schema, Model, Document } from 'mongoose'

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
