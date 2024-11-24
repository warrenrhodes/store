import * as z from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  slug: z.string(),
  description: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  featured: z.boolean().default(false),
  parent: z.string().optional().nullable(),
  metadata: z
    .object({
      seoTitle: z.string().optional().nullable(),
      seoDescription: z.string().optional().nullable(),
      keywords: z.array(z.string()).optional().nullable(),
    })
    .optional()
    .nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type CategorySchemaType = z.infer<typeof categorySchema>;
