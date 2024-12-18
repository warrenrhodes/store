import * as z from 'zod'
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
  coverImageURL: z.string().optional().nullable(),
  featured: z.boolean().default(false),
})

export const blogSchema = z.object({
  slug: z.string({ invalid_type_error, required_error }).min(1, required_error),
  title: z.string({ invalid_type_error, required_error }).min(2).max(100),
  content: blogContentSchema,
  metadata: blogMetadataSchema,
  categoryIds: z.array(z.string()).min(1),
  tags: z.array(z.string()),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  publishedAt: z.string().or(z.date()).default(new Date()).nullable(),
  customFields: z.array(z.record(z.string(), z.any())).optional().nullable(),
  layout: z.enum(['DEFAULT', 'FEATURED', 'MINIMAL']).default('DEFAULT'),
})

export type BlogSchemaType = z.infer<typeof blogSchema>
export type BlogContent = z.infer<typeof blogContentSchema>
export type BlogMetadata = z.infer<typeof blogMetadataSchema>
