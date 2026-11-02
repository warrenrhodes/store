// Firestore document shapes shared by the store and the admin.

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
  /** Delivered and paid. */
  COMPLETED = 'COMPLETED',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  /** Customer unreachable or refused the parcel at the door. */
  FAILED_DELIVERY = 'FAILED_DELIVERY',
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
  /** Cart subtotal (before discounts) at least this amount. */
  MINIMUM_AMOUNT = 'MINIMUM_AMOUNT',
  /** Delivery city (the picked area's city). */
  CITY = 'CITY',
  /** At least one cart item in one of these categories (by name, as products store them). */
  SPECIFIC_CATEGORIES = 'SPECIFIC_CATEGORIES',
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

interface OrderPromotion {
  promotionPath?: string
  promotionId?: string
  discountAmount: number
  code: string
  /** Action type (FREE_SHIPPING, PERCENTAGE_DISCOUNT…); missing on older orders. */
  type?: string | null
}

interface OrderPrices {
  subtotal: number
  shipping: number
  discount: number
  total: number
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
  photoURL?: string | null
  phone?: string | null
  authId: string
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
  associateProductPath?: string | null
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
  /** Reviews left by customers wait for approval; reviews without a status are shown. */
  status?: ReviewStatus | null
  orderPath?: string | null
}

export enum ReviewStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

/** A line of the storefront cart (zustand) and of the order APIs. */
export interface CartItem {
  product: Product
  quantity: number
  price: number
}

export interface OrderItem extends BaseDocument {
  product: Pick<Product, 'medias' | 'title' | 'creatorId' | 'path' | 'price'>
  quantity: number
  price: number
}

interface DeliveryInfo {
  address?: string | null
  deliveryDate?: string | null
  deliveryTime?: string | null
  city?: string | null
  additionalNotes?: string | null
  deliveryMethod?: string | null
  /** Area name at order time, kept for display even if the area is renamed later. */
  location?: string | null
  locationId?: string | null
}

interface UserData {
  id: string
  email?: string | null
  fullName: string
  phone?: string | null
}

export interface Order extends CreatorDocument {
  userPath?: string
  deliveryInfo: DeliveryInfo
  userData: UserData
  promotions?: OrderPromotion[] | null
  items: OrderItem[]
  orderPrices: OrderPrices
  status: OrderStatus
  partnersPaths: string[]
  /** Secret in the customer's tracking link (/order/<id>?t=<token>). */
  trackingToken?: string | null
  history?: OrderEvent[] | null
  /** True while the ordered quantities are taken out of product stock. */
  stockReserved?: boolean | null
  /** Discount added by hand in the admin, on top of promotions. */
  manualDiscount?: number | null
  checkoutId?: string | null
}

export interface OrderEvent {
  at: string
  /** 'customer', or the admin user's email/uid. */
  by: string
  type: 'created' | 'status' | 'edit' | 'note'
  status?: OrderStatus | null
  message?: string | null
}

/** A checkout the customer started (name and phone typed) but may not have finished. */
export interface Checkout extends BaseDocument {
  fullName: string
  phone: string
  items: Array<{ productPath: string; title: string; quantity: number; price: number }>
  total: number
  location?: string | null
  source?: string | null
  partnersPaths: string[]
  orderPath?: string | null
  contactedAt?: string | null
}

/** A neighbourhood or town (collection `locations`). Referenced everywhere by its id. */
export interface DeliveryLocation extends CreatorDocument {
  name: string
  city: string
  isActive: boolean
}

/** A delivery zone: a group of locations sharing one price. */
export interface Shipment extends CreatorDocument {
  method: ShipmentMethod
  isActive: boolean
  cost: number
  locationIds: string[]
  /** Before scripts/migrate-locations: names (or { id, name }) stored on the shipment. */
  locations?: unknown
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
  /** Orders that used it; maintained by the store's order API. */
  usageCount?: number
  /** Code promotion (typed by the customer or carried by a link) instead of automatic. */
  requiresCode?: boolean
  status: PromotionStatus
  priority: number
  metadata: Metadata
}

export interface Wishlist extends BaseDocument {
  productPath: string
  userPath: string
}
