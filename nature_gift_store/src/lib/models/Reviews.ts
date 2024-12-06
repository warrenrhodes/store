import { Schema, Document } from 'mongoose'
import { IProduct } from './Product'
import { getOrCreateModel } from '../utils/utils'

// Define an interface for the Review document
interface IReview extends Document {
  product: IProduct
  userName: string
  rating: number
  comment: string
  imageUrl?: string
  helpful?: number
  notHelpful?: number
  verify?: boolean
  createdAt?: Date
  updatedAt?: Date
}

const reviewSchema = new Schema<IReview>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    helpful: {
      type: Number,
      default: 0,
    },
    notHelpful: {
      type: Number,
      default: 0,
    },
    verify: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

const Review = getOrCreateModel('Review', reviewSchema)

export default Review
export type { IReview }
