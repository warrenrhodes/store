import * as z from "zod";

export const mediaSchema = z.object({
  type: z.enum(["image", "video"]),
  url: z.string(),
  fileName: z.string(),
});

export type MediaSchemaType = z.infer<typeof mediaSchema>;
