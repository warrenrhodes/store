import { Document, Schema } from 'mongoose'
import { getOrCreateModel } from '../utils/utils'

interface IUser extends Document {
  fullName: string
  phone: string
  phoneContainsWhatsApp: boolean
  whatsAppNumber?: string
  address: string
  city: string
  wishlist: string[]
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    phoneContainsWhatsApp: {
      type: Boolean,
      required: true,
    },
    whatsAppNumber: String,
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    wishlist: {
      type: [String],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  },
)

const User = getOrCreateModel<IUser>('User', userSchema)

export default User
export type { IUser }
