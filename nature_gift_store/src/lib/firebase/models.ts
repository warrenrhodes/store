// Enums
export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'rating'
export enum UserType {
  ADMIN = 'ADMIN',
  PARTNER = 'PARTNER',
  CLIENT = 'CLIENT',
}
export interface Filters {
  search: string
  categories: string[]
  priceRange: [number, number]
  sortBy: SortOption
  colors: string[]
  tags: string[]
}

export type IDeliveryInfo = DeliveryInfo & { cost: number }

export enum ShipmentMethod {
  DELIVERY = 'DELIVERY',
  EXPEDITION = 'EXPEDITION',
}

export enum ProductStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum BlogStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum BlogLayout {
  DEFAULT = 'DEFAULT',
  FEATURED = 'FEATURED',
  MINIMAL = 'MINIMAL',
}

export enum BlogContentType {
  TEXT = 'TEXT',
  HTML = 'HTML',
  MARKDOWN = 'MARKDOWN',
}

export enum ProductContentType {
  HTML = 'HTML',
  TEXT = 'TEXT',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  CANCELED = 'CANCELED',
  COMPLETED = 'COMPLETED',
}

export enum PromotionStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  DISABLED = 'DISABLED',
}

export enum PromotionActionType {
  PERCENTAGE_DISCOUNT = 'PERCENTAGE_DISCOUNT',
  FIXED_DISCOUNT = 'FIXED_DISCOUNT',
  FREE_SHIPPING = 'FREE_SHIPPING',
  FREE_PRODUCT = 'FREE_PRODUCT',
  BUY_X_GET_Y = 'BUY_X_GET_Y',
}

export enum PromotionConditionType {
  MINIMUM_QUANTITY = 'MINIMUM_QUANTITY',
  SPECIFIC_PRODUCTS = 'SPECIFIC_PRODUCTS',
  DELIVERY_METHOD = 'DELIVERY_METHOD',
  LOCATION = 'LOCATION',
}

export interface OrderSummary {
  subtotal: number
  shipping: number
  discount: number
  total: number
  appliedPromotions: Array<{
    id: string
    code: string
    discountAmount: number
    type: string
  }>
}

// Base interfaces
interface BaseDocument {
  createdAt: string
  updatedAt: string
}

interface CreatorDocument extends BaseDocument {
  creatorId: string
  path: string
}

// Shared Types
interface SeoMetadata {
  seoTitle: string
  seoDescription: string
  keywords: string[]
}

// Media Related
export interface Media {
  fileName: string
  type: MediaType
  url: string
  blurDataUrl?: string | null
  cloudinaryPublicPath?: string | null
}

// Product Related
interface ProductDescription {
  contentType: ProductContentType
  content: string
}

interface Feature {
  icon?: string | null
  title: string
  description?: ProductDescription | null
}

interface Price {
  regular: number
  sale?: number | null
  saleStartDate?: string | null
  saleEndDate?: string | null
}

interface Inventory {
  quantity: number
  lowStockThreshold: number
  stockQuantity: number
}

// Blog Related
export interface BlogContent {
  type: BlogContentType
  content: string
  excerpt?: string | null
}

interface BlogAuthor {
  name: string
  bio?: string | null
  avatar?: string | null
}

export interface BlogMetadata {
  title: string
  description?: string | null
  keywords: string[]
  author: BlogAuthor
  readingTime?: number | null
  coverImage?: Media | null
  blurDataUrl?: string | null
  featured: boolean
}

interface CustomFields {
  key: string
  value: string
}

// Order Related
interface UserData {
  id: string
  email: string
  fullName: string
  phone: string
}

interface OrderPromotion {
  promotionPath: string
  discountAmount: number
  code: string
}

interface OrderPrices {
  subtotal: number
  shipping: number
  discount: number
  total: number
}

interface DeliveryInfo {
  address: string
  deliveryDate: string
  deliveryTime: string
  city?: string | null
  additionalNotes?: string | null
  deliveryMethod?: string | null
  location?: string | null
}

// Promotion Related
interface PromotionAction {
  type: PromotionActionType
  value: string
  maxDiscount?: number | null
}

interface PromotionCondition {
  type: PromotionConditionType
  value: string
}

interface Metadata {
  createdBy: string
  updatedBy: string
  notes?: string | null
}

interface UsageLimit {
  perCustomer?: number | null
  total?: number | null
}

// Collection Interfaces
export interface User extends BaseDocument {
  email?: string | null
  fullName?: string | null
  avatar?: string | null
  phone?: string | null
  isAnonymous: boolean
  userType: UserType
  whitelists: string[]
}

export interface Category extends CreatorDocument {
  name: string
  slug: string
  description?: string | null
  image?: Media | null
  featured: boolean
  parentPath?: string | null
  seoMetadata?: SeoMetadata | null
}

export interface Product extends CreatorDocument {
  title: string
  slug: string
  description: ProductDescription
  medias: Media[]
  categories: string[]
  isFeature: boolean
  isNewProduct: boolean
  tags: string[]
  price: Price
  features: Feature[]
  status: ProductStatus
  visibility: boolean
  inventory: Inventory
  blogUrl?: string | null
  metadata: SeoMetadata
}

export interface Blog extends CreatorDocument {
  slug: string
  title: string
  content: BlogContent
  metadata: BlogMetadata
  categories: string[]
  tags: string[]
  status: BlogStatus
  publishedAt?: string | null
  customFields: CustomFields[]
  layout: BlogLayout
}

export interface Review extends CreatorDocument {
  productPath?: string | null
  blogPath?: string | null
  userName: string
  rating: number
  comment: string
  imageUrl?: string | null
  helpful: number
  notHelpful: number
  verify: boolean
}

export interface OrderItem extends BaseDocument {
  product: Pick<Product, 'medias' | 'title' | 'creatorId' | 'path' | 'price'>
  quantity: number
  price: number
}

export interface Order extends CreatorDocument {
  userPath?: string
  deliveryInfo: DeliveryInfo
  userData: UserData
  promotions: OrderPromotion[]
  items: OrderItem[]
  orderPrices: OrderPrices
  status: OrderStatus
  partnersPaths: string[]
}

export interface Shipment extends CreatorDocument {
  method: ShipmentMethod
  isActive: boolean
  cost: number
  locations: string[]
}

export interface Promotion extends CreatorDocument {
  code: string
  name: string
  description?: string | null
  startDate: string
  endDate: string
  conditions: PromotionCondition[]
  actions: PromotionAction[]
  usageLimit?: UsageLimit | null
  status: PromotionStatus
  priority: number
  metadata: Metadata
}

export interface Wishlist extends BaseDocument {
  productPath: string
  userPath: string
}
