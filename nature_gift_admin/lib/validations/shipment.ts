import * as z from "zod";

export const shipmentSchema = z.object({
  method: z.enum(["DELIVERY", "EXPEDITION"]),
  isActive: z.boolean(),
  cost: z.number(),
  locations:z.array(z.string()).min(1),
});

export type ShipmentSchemaType = z.infer<typeof shipmentSchema>;
