import * as z from 'zod'

// Error messages are dictionary keys, translated by <FormMessage>.

const shipmentSchema = z.object({
  method: z.enum(['DELIVERY', 'EXPEDITION']).default('DELIVERY'),
  location: z.string().default(''),
})

export const deliverySchema = z
  .object({
    fullName: z.string().min(2, 'errorNameRequired'),
    email: z.string().email().optional().nullable(),
    phone: z
      .string()
      .min(9, 'errorInvalidPhone')
      .transform(val => val.replace(/\s+/g, ''))
      .pipe(z.string().regex(/^(?:\+237|237)?6[2,5,8,9,7]\d{7}$/, 'errorCameroonPhone')),
    address: z.string().default(''),
    deliveryDate: z.date({
      required_error: 'errorDateRequired',
    }),
    deliveryTime: z.string().optional().nullable(),
    shipping: shipmentSchema,
    additionalNotes: z.string().optional().nullable(),
    city: z.string().optional().nullable(),
  })
  // The address is only asked when the delivery area is not in the shipments list.
  .refine(data => !!data.shipping.location || data.address.trim().length > 0, {
    message: 'errorAddressRequired',
    path: ['address'],
  })

export type DeliveryFormData = z.infer<typeof deliverySchema>
