import * as z from 'zod'
import { ShipmentMethod } from '../firebase/models'

export const shipmentSchema = z.object({
  method: z.enum([ShipmentMethod.DELIVERY, ShipmentMethod.EXPEDITION]),
  isActive: z.boolean(),
  cost: z.number(),
  locationIds: z.array(z.string()).min(1, 'Choose at least one location'),
})

export type ShipmentSchemaType = z.infer<typeof shipmentSchema>
