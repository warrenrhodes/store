import { z } from "zod";

export const reviewSchema = z.object({
  product: z.string().nonempty("Please select a product"),
  userName: z.string(),
  rating: z.number(),
  comment: z.string(),
  imageUrl: z.string().optional(),
  helpful: z.number().min(0).optional(),
  notHelpful: z.number().min(0).optional(),
  verify: z.boolean().default(false),
});

export type ReviewSchemaType = z.infer<typeof reviewSchema>;
