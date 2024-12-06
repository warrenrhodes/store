import { Document, Schema } from 'mongoose'
import { getOrCreateModel } from '../utils/utils'

interface IShipment extends Document {
  method: 'DELIVERY' | 'EXPEDITION'
  cost: number
  locations: string[]
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
}

const shipmentSchema = new Schema<IShipment>(
  {
    method: {
      type: String,
      enum: ['DELIVERY', 'EXPEDITION'],
      default: 'DELIVERY',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    locations: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Shipment = getOrCreateModel<IShipment>('Shipment', shipmentSchema)

export default Shipment
export type { IShipment }
