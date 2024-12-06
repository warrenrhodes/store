import * as z from 'zod'

const shipmentSchema = z.object({
  method: z.enum(['DELIVERY', 'EXPEDITION']).default('DELIVERY'),
  location: z.string().min(1, 'Please select an location.'),
})

export const deliverySchema = z.object({
  fullName: z.string().min(2, 'FullName name is required'),
  email: z.string().email().optional(),
  phone: z
    .string()
    .min(9, 'Invalid phone number')
    .transform(val => val.replace(/\s+/g, ''))
    .pipe(z.string().regex(/^(?:\+237|237)?6[2,5,8,9,7]\d{7}$/, 'Invalid Cameroon phone number')),
  address: z.string().min(5, 'Address is required'),
  deliveryDate: z.date({
    required_error: 'Please select a delivery date',
  }),
  deliveryTime: z.string().min(1, 'Please select a delivery time'),
  shipping: shipmentSchema,
  additionalNotes: z.string().optional(),
  city: z.string(),
})

export const paymentSchema = z.object({
  cardNumber: z.string().regex(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, 'Invalid card number'),
  cardHolder: z.string().min(3, 'Cardholder name is required'),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, 'Invalid expiry date'),
  cvv: z.string().regex(/^\d{3,4}$/, 'Invalid CVV'),
})

export type DeliveryFormData = z.infer<typeof deliverySchema>
export type PaymentFormData = z.infer<typeof paymentSchema>
