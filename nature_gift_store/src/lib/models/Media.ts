import { Schema, Document } from 'mongoose'
import { getOrCreateModel } from '../utils/utils'

interface IMedia extends Document<string> {
  type: 'image' | 'video'
  url: string
  fileName: string
}

const mediaSchema = new Schema<IMedia>(
  {
    fileName: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ['image', 'video'],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Media = getOrCreateModel<IMedia>('Media', mediaSchema)

export default Media
export type { IMedia }
