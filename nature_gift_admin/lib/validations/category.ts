import * as z from 'zod'
import { MediaType } from '../firebase/models'

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  slug: z.string(),
  description: z.string().optional().nullable(),
  image: z
    .object({
      fileName: z.string(),
      url: z.string(),
      type: z.enum([MediaType.IMAGE, MediaType.VIDEO]),
      blurDataUrl: z.string().optional().nullable(),
      cloudinaryPublicPath: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
  featured: z.boolean().default(false),
  parentPath: z.string().optional().nullable(),
  seoMetadata: z
    .object({
      seoTitle: z.string(),
      seoDescription: z.string(),
      keywords: z.array(z.string()),
    })
    .optional()
    .nullable(),
})

export type CategorySchemaType = z.infer<typeof categorySchema>
