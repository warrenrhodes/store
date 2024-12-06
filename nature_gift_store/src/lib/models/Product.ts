import { Schema, Document } from 'mongoose'
import { getOrCreateModel } from '../utils/utils'
import { IMedia } from './Media'
import { ICategory } from './Category'
import { IReview } from './Reviews'

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'rating'

export interface Filters {
  search: string
  categories: string[]
  priceRange: [number, number]
  sortBy: SortOption
  colors: string[]
  tags: string[]
}

// Define interfaces for nested schemas
interface IContent {
  contentType: 'TEXT' | 'HTML'
  content: string
}

interface IPrice {
  regular: number
  sale?: number
  saleStartDate?: Date
  saleEndDate?: Date
}

interface IFeature {
  icon?: string
  title: string
  description?: IContent
}

interface IInventory {
  quantity: number
  lowStockThreshold: number
  stockQuantity?: number
}

interface IMetadata {
  seoTitle: string
  seoDescription: string
  keywords: string[]
}

// Define the main Product interface
interface IProduct extends Document<string> {
  title: string
  slug: string
  description: IContent
  media: IMedia[]
  categories: ICategory[]
  tags?: string[]
  price: IPrice
  features?: IFeature[]
  status: 'draft' | 'published' | 'archived'
  visibility: boolean
  inventory: IInventory
  metadata: IMetadata
  reviews?: IReview[]
  isFeature: boolean
  isNewProduct: boolean
  blogUrl?: string
  parternId: string
  createdAt?: Date
  updatedAt?: Date
}

const descriptionSchema = new Schema({
  contentType: {
    type: String,
    enum: ['HTML', 'TEXT'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
})
const featureSchema = new Schema({
  icon: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  description: descriptionSchema,
})

// Create the Mongoose schema
const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: descriptionSchema,
    media: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Media',
          required: true,
        },
      ],
      required: true,
    },
    reviews: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Review',
        },
      ],
    },
    isFeature: {
      type: Boolean,
      default: false,
    },
    isNewProduct: {
      type: Boolean,
      default: false,
    },
    categories: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Category',
          required: true,
        },
      ],
    },
    tags: [String],
    price: {
      regular: {
        type: Number,
        required: true,
        min: [0, 'Regular price must be non-negative'],
      },
      sale: {
        type: Number,
      },
      saleStartDate: Date,
      saleEndDate: Date,
    },
    features: [featureSchema],
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    visibility: {
      type: Boolean,
      default: true,
    },
    inventory: {
      quantity: {
        type: Number,
        default: 0,
      },
      lowStockThreshold: {
        type: Number,
        default: 5,
      },
      stockQuantity: {
        type: Number,
        default: 0,
      },
    },
    blogUrl: String,
    parternId: {
      type: String,
      required: true,
    },
    metadata: {
      seoTitle: {
        type: String,
        required: true,
      },
      seoDescription: {
        type: String,
        required: true,
      },
      keywords: {
        type: [String],
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
)

// Create and export the Mongoose model
const Product = getOrCreateModel<IProduct>('Product', productSchema)

export default Product
export type { IProduct }
