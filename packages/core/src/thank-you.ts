// An ad page's own thank-you page (admin, Blogs): HTML from the page builder with merge tags,
// filled per order. Pure. Self-check: thank-you.check.ts
import { escapeHtml } from './emails'

/** The merge tags a seller can use, with what they become (admin's table). */
export const THANK_YOU_TAGS = [
  { tag: 'customerFirstName', label: 'Customer first name', description: "The customer's first name" },
  { tag: 'customerName', label: 'Customer name', description: "The customer's full name" },
  { tag: 'productName', label: 'Product name', description: 'The ordered product(s)' },
  { tag: 'productImage', label: 'Product image', description: "The first product's image URL (for <img src>)" },
  { tag: 'quantity', label: 'Quantity', description: 'Number of items ordered' },
  { tag: 'orderTotal', label: 'Order total', description: 'Amount to pay on delivery, e.g. 12 000 FCFA' },
  { tag: 'orderId', label: 'Order ID', description: 'The short order number, e.g. 8F3K2A1B' },
  { tag: 'trackingUrl', label: 'Tracking URL', description: "The customer's order tracking page" },
  { tag: 'deliveryCity', label: 'Delivery city', description: 'The delivery city' },
  { tag: 'deliveryDate', label: 'Delivery date', description: 'The chosen delivery date, if any' },
  { tag: 'storeName', label: 'Store name', description: 'Your store name' },
  { tag: 'storeUrl', label: 'Store URL', description: "Your storefront's address" },
  { tag: 'storeWhatsapp', label: 'Store WhatsApp', description: 'Your WhatsApp number (Settings)' },
  {
    tag: 'whatsappUrl',
    label: 'WhatsApp link',
    description: 'Opens WhatsApp to your number with the order number already written',
  },
] as const

export type ThankYouValues = Record<(typeof THANK_YOU_TAGS)[number]['tag'], string>

/** `{{tag}}` → its value, HTML-escaped; unknown tags stay as typed so the seller sees them. */
export const fillTags = (html: string, values: ThankYouValues) =>
  html.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, tag: string) =>
    Object.hasOwn(values, tag) ? escapeHtml(values[tag as keyof ThankYouValues]) : match,
  )
