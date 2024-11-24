import * as z from "zod";

export const customerSchema = z.object({
  type: z.enum(["image", "video"]),
  clerkId: z.string(),
  name: z.string(),
  email: z.string(),
  orders: z.array(z.string()).optional(),
});

export type CustomerSchemaType = z.infer<typeof customerSchema>;
