import mongoose from 'mongoose'

export interface IOrder extends Document {
  deliveryInfo: {
    address: string
    deliveryDate: Date
    deliveryTime: string
    city: string
    notes?: string
  }
  userData: {
    email?: string
    fullName: string
    phone: string
    phoneContainsWhatsApp: boolean
    whatsAppNumber?: string
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

export interface CartItem {
  item: IProduct
  quantity: number
  promotion?: IPromotion
  color?: string
  size?: string
}

export type CollectionType = {
  _id: string
  title: string
  description: string
  image: string
  products: IProduct[]
}

export interface ICategory extends Document {
  _id: string
  title: string
  shortDescription?: string | null
  media?: IMedia | null
  parent?: ICategory | null
  products: IProduct[]
  updatedAt: string
  createdAt: string
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

export interface IMedia extends Document {
  _id: string
  type: 'image' | 'video'
  url: string
  fileName: string
  createdAt: string
}
export type ShipmentDetailType = {
  icon: string
  description: string
}

export interface BeneficeType {
  icon: string
  title: string
  description?: string
}

export interface IPromotion extends Document {
  _id: string
  product: IProduct
  promotionName: string
  discountValue: number
  minProductsToApply: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface IReview extends Document {
  _id: string
  product: IProduct
  userName: string
  rating: number
  comment: string
  imageUrl?: string | null
  helpful?: number | null
  verify: boolean
  notHelpful?: number | null
  createdAt: string
  updatedAt: string
}

export type UserType = {
  clerkId: string
  wishlist: [string]
  createdAt: string
  updatedAt: string
}

export interface IProduct extends Document {
  _id: string
  title: string
  description: string
  media: [IMedia]
  categories: [ICategory]
  collections: [CollectionType]
  tags: [string]
  sizes: [string]
  colors: [string]
  promoPrice?: number
  price: number
  longDescription: [StoredProductDescription]
  features: [BeneficeType]
  shipmentDetails: [ShipmentDetailType]
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
  phoneContainsWhatsApp: boolean
  whatsAppNumber?: string
  address: string
  city: string
}

export interface Filters {
  search: string
  category: string
  priceRange: [number, number]
  sortBy: SortOption
  colors: string[]
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'rating'
