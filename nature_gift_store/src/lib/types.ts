import mongoose from 'mongoose'
import { IProduct } from './models/Product'

export interface IOrder extends Document {
  deliveryInfo: {
    address: string
    deliveryDate?: Date
    deliveryTime?: string
    city?: string
    additionalNotes?: string
  }
  userData: {
    email?: string
    fullName: string
    phone: string
  }
  items: Array<{
    productId: mongoose.Types.ObjectId
    quantity: number
    price: number
    promotion?: {
      id: mongoose.Types.ObjectId
      discountAmount: number
      promotionName: string
    }
  }>
  orderPrices: {
    totalAmount: number
    discountAmount?: number
    totalWithoutDiscount: number
    totalWithDiscount: number
  }
  status: string
  createdAt: Date
  updatedAt: Date
}

export type CollectionType = {
  _id: string
  title: string
  description: string
  image: string
  products: IProduct[]
}

export enum ContentType {
  'TEXT' = 'TEXT',
  'IMAGE' = 'IMAGE',
  'VIDEO' = 'VIDEO',
}
export interface StoredProductDescription {
  id: string
  type: ContentType
  content: string | null
  mediaIds: string[] | null
}

export type ShipmentDetailType = {
  icon: string
  description: string
}

export type UserType = {
  clerkId: string
  wishlist: [string]
  createdAt: string
  updatedAt: string
}

export type OrderColumnType = {
  _id: string
  customer: string
  products: number
  totalAmount: number
  createdAt: string
}

export type OrderItemType = {
  product: IProduct
  color: string
  size: string
  quantity: number
}

export type CustomerType = {
  clerkId: string
  name: string
  email: string
}

export type TemporalUser = {
  fullName: string
  phone: string
  email?: string
  address: string
  city?: string
}
