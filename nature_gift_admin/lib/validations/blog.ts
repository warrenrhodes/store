import * as z from 'zod'
import { BlogLayout, BlogStatus, MediaType } from '../firebase/models'
const required_error = 'This field cannot be blank'
const invalid_type_error = 'Invalid type provided for this field'

export const blogContentSchema = z.object({
  type: z.enum(['TEXT', 'HTML', 'MARKDOWN']),
  content: z.string(),
  excerpt: z.string().optional().nullable(),
})

export const blogMetadataSchema = z.object({
  title: z.string({ invalid_type_error, required_error }).min(2).max(100),
  description: z.string().optional().nullable(),
  keywords: z.array(z.string({ invalid_type_error, required_error })),
  author: z.object({
    name: z.string({ invalid_type_error, required_error }),
    bio: z.string().optional().nullable(),
    avatar: z.string().optional().nullable(),
  }),
  coverImage: z
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
})

export const blogSchema = z.object({
  slug: z.string({ invalid_type_error, required_error }).min(1, required_error),
  title: z.string({ invalid_type_error, required_error }).min(2).max(100),
  content: blogContentSchema,
  metadata: blogMetadataSchema,
  categories: z.array(z.string()).min(1),
  tags: z.array(z.string()),
  status: z
    .enum([BlogStatus.DRAFT, BlogStatus.PUBLISHED, BlogStatus.ARCHIVED])
    .default(BlogStatus.DRAFT),
  publishedAt: z.string().or(z.date()).default(new Date()).nullable(),
  customFields: z.array(z.record(z.string(), z.any())).optional().nullable(),
  layout: z
    .enum([BlogLayout.DEFAULT, BlogLayout.FEATURED, BlogLayout.MINIMAL])
    .default(BlogLayout.DEFAULT),
})

export type BlogSchemaType = z.infer<typeof blogSchema>
export type BlogContent = z.infer<typeof blogContentSchema>
export type BlogMetadata = z.infer<typeof blogMetadataSchema>
