import { z } from 'zod'
const required_error = 'This field cannot be blank'
const invalid_type_error = 'Invalid type provided for this field'

export const reviewSchema = z.object({
  productId: z.string().min(1, required_error),
  userName: z.string().min(1, required_error),
  rating: z.number(),
  comment: z.string(),
  imageUrl: z.string().optional().nullable(),
  helpful: z.number().min(0).optional(),
  notHelpful: z.number().min(0).optional(),
  verify: z.boolean().default(false),
})

export type ReviewSchemaType = z.infer<typeof reviewSchema>
