import * as z from 'zod'

export const locationSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  city: z.string().trim().min(1, 'City is required'),
  isActive: z.boolean(),
})

export type LocationSchemaType = z.infer<typeof locationSchema>
