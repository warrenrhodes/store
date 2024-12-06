import mongoose from 'mongoose'
import { IProduct } from './Product'
import { getOrCreateModel } from '../utils/utils'

export interface IDeliveryInfo {
  address: string
  deliveryDate: Date
  deliveryTime: string
  city?: string
  additionalNotes?: string
  deliveryMethod?: 'DELIVERY' | 'EXPEDITION'
  location?: string
  cost?: number
}
export interface IOrder {
  deliveryInfo: IDeliveryInfo
  userData: {
    id?: string
    email?: string
    fullName: string
    phone: string
  }
  promotions: Array<{
    promotionId: string
    discountAmount: number
    code: string
  }>
  items: Array<{
    product: IProduct
    quantity: number
    price: number
  }>
  orderPrices: {
    subtotal: number
    shipping: number
    discount: number
    total: number
  }
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELED' | 'COMPLETED'
  createdAt?: Date
  updatedAt?: Date
}

const orderSchema = new mongoose.Schema(
  {
    deliveryInfo: {
      address: String,
      deliveryDate: Date,
      deliveryTime: String,
      city: String,
      additionalNotes: String,
      deliveryMethod: String,
      location: String,
    },
    userData: {
      id: String,
      email: String,
      fullName: String,
      phone: String,
    },
    promotions: [
      {
        promotionId: String,
        discountAmount: Number,
        code: String,
      },
    ],
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: Number,
        price: Number,
      },
    ],
    orderPrices: {
      subtotal: Number,
      shipping: Number,
      discount: Number,
      total: Number,
    },
    status: {
      type: String,
      enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'CANCELED', 'COMPLETED'],
    },
  },
  {
    timestamps: true,
  },
)

const Order = getOrCreateModel('Order', orderSchema)

export default Order
