import { PromotionActionType, ProductContentType } from './firebase/models'

export type SeoMetadata = {
  seoTitle?: string
  seoDescription?: string
  keywords: string[]
}

enum PromotionConditionType {
  MINIMUM_QUANTITY = 'MINIMUM_QUANTITY',
  SPECIFIC_PRODUCTS = 'SPECIFIC_PRODUCTS',
  DELIVERY_METHOD = 'DELIVERY_METHOD',
  LOCATION = 'LOCATION',
}

export type PromotionAction = {
  type: PromotionActionType
  value: string
  maxDiscount?: number
}

export type PromotionCondition = {
  type: PromotionConditionType
  value: string
}

export type Metadata = {
  createdBy: string
  updatedBy: string
  notes?: string
}

export type UsageLimit = {
  perCustomer?: number
  total?: number
}

export type CustomFields = {
  key: string
  value: string
}

export type ProductDescription = {
  contentType: ProductContentType
  content: string
}

export type Feature = {
  icon?: string
  title: string
  description?: ProductDescription
}

export type Price = {
  regular: number
  sale?: number
  saleStartDate?: Date
  saleEndDate?: Date
}

export type Inventory = {
  quantity: number
  lowStockThreshold: number
  stockQuantity: number
}

export type ProductSeoMetadata = {
  seoTitle: string
  seoDescription: string
  keywords: string[]
}

export type UserData = {
  id: string
  email: string
  fullName: string
  phone: string
}

export type OrderPromotion = {
  promotionId: string
  discountAmount: number
  code: string
}

export type OrderPrices = {
  subtotal: number
  shipping: number
  discount: number
  total: number
}

export type DeliveryInfo = {
  address: string
  deliveryDate: Date
  deliveryTime: string
  city?: string
  additionalNotes?: string
  deliveryMethod?: string
  location?: string
}
