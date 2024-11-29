import * as z from "zod";

export const blogContentSchema = z.object({
  type: z.enum(["TEXT", "HTML", "MARKDOWN"]),
  content: z.string(),
  excerpt: z.string().optional(),
});

export const blogMetadataSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().optional(),
  keywords: z.array(z.string()),
  author: z.object({
    name: z.string(),
    bio: z.string().optional(),
    avatar: z.string().optional(),
  }),
  readingTime: z.number().optional(),
  coverImage: z.string().optional(),
  featured: z.boolean().default(false),
});

export const blogSchema = z.object({
  slug: z.string(),
  title: z.string().min(2).max(100),
  content: blogContentSchema,
  metadata: blogMetadataSchema,
  categories: z.array(z.string()),
  tags: z.array(z.string()),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  publishedAt: z.string().or(z.date()).default(new Date()),
  customFields: z.record(z.string(), z.any()).optional(),
  layout: z.enum(["DEFAULT", "FEATURED", "MINIMAL"]).default("DEFAULT"),
  comments: z.boolean().default(true),
});

export type BlogSchemaType = z.infer<typeof blogSchema>;
export type BlogContent = z.infer<typeof blogContentSchema>;
export type BlogMetadata = z.infer<typeof blogMetadataSchema>;
