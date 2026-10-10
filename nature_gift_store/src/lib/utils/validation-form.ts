import * as z from 'zod'

const shipmentSchema = z.object({
  method: z.enum(['DELIVERY', 'EXPEDITION']).default('DELIVERY'),
  location: z.string().default(''),
})

export const deliverySchema = z.object({
  fullName: z.string().min(2, 'Le nom est requis'),
  email: z.string().email().optional().nullable(),
  phone: z
    .string()
    .min(9, 'Numéro invalide')
    .transform(val => val.replace(/\s+/g, ''))
    .pipe(z.string().regex(/^(?:\+237|237)?6[2,5,8,9,7]\d{7}$/, 'Numéro camerounais invalide')),
  address: z.string().min(1, 'Veuillez ajouter une adresse'),
  deliveryDate: z.date({
    required_error: 'Veuillez sélectionner une date',
  }),
  deliveryTime: z.string().optional().nullable(),
  shipping: shipmentSchema,
  additionalNotes: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
})

export type DeliveryFormData = z.infer<typeof deliverySchema>
