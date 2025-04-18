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
    .pipe(z.string().regex(/^(?:\+237|237)?6[2,5,8,9,7]\d{7}$/, 'Numero camerounais invalide')),
  address: z.string().min(1, 'Veuillez ajouter une address'),
  deliveryDate: z.date({
    required_error: 'Veuillez sélectionné une date',
  }),
  deliveryTime: z.string().optional().nullable(),
  shipping: shipmentSchema,
  additionalNotes: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
})

export const paymentSchema = z.object({
  cardNumber: z.string().regex(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, 'Invalid card number'),
  cardHolder: z.string().min(3, 'Cardholder name is required'),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, 'Invalid expiry date'),
  cvv: z.string().regex(/^\d{3,4}$/, 'Invalid CVV'),
})

export type DeliveryFormData = z.infer<typeof deliverySchema>
export type PaymentFormData = z.infer<typeof paymentSchema>
