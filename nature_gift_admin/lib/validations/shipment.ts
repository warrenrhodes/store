import * as z from 'zod'
import { ShipmentMethod } from '../firebase/models'

export const shipmentSchema = z.object({
  method: z.enum([ShipmentMethod.DELIVERY, ShipmentMethod.EXPEDITION]),
  isActive: z.boolean(),
  cost: z.number(),
  locations: z
    .array(z.object({ id: z.string().min(1), name: z.string().trim().min(1) }))
    .min(1)
    .refine(
      locations => new Set(locations.map(l => l.name.toLowerCase())).size === locations.length,
      'Location names must be unique',
    ),
})

export type ShipmentSchemaType = z.infer<typeof shipmentSchema>
