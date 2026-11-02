// Pure order rules shared by the admin actions and pages. Self-check: order-logic.check.ts
import { OrderStatus } from '../firebase/models'

/** Delivery workflow (cash on delivery). Final statuses have no way out. */
export const STATUS_TRANSITIONS: Record<string, OrderStatus[]> = {
  [OrderStatus.PENDING]: [OrderStatus.ACCEPTED, OrderStatus.REJECTED, OrderStatus.CANCELED],
  [OrderStatus.ACCEPTED]: [
    OrderStatus.OUT_FOR_DELIVERY,
    OrderStatus.COMPLETED,
    OrderStatus.CANCELED,
  ],
  [OrderStatus.OUT_FOR_DELIVERY]: [OrderStatus.COMPLETED, OrderStatus.FAILED_DELIVERY],
  [OrderStatus.FAILED_DELIVERY]: [OrderStatus.OUT_FOR_DELIVERY, OrderStatus.CANCELED],
  [OrderStatus.COMPLETED]: [],
  [OrderStatus.CANCELED]: [],
  [OrderStatus.REJECTED]: [],
}

export const FINAL_STATUSES: string[] = [
  OrderStatus.COMPLETED,
  OrderStatus.CANCELED,
  OrderStatus.REJECTED,
]

/** Items, prices and fees can be changed until the parcel leaves. */
export const EDITABLE_STATUSES: string[] = [OrderStatus.PENDING, OrderStatus.ACCEPTED]

/** Statuses that count as a sale (revenue, customers' amount spent comes from COMPLETED). */
export const SALE_STATUSES: string[] = [
  OrderStatus.PENDING,
  OrderStatus.ACCEPTED,
  OrderStatus.OUT_FOR_DELIVERY,
  OrderStatus.COMPLETED,
]

export const canTransition = (from: string, to: string) =>
  (STATUS_TRANSITIONS[from] ?? []).includes(to as OrderStatus)

/** Canceling or rejecting an order puts its reserved quantities back in stock. */
export const releasesStock = (to: string, stockReserved?: boolean | null) =>
  !!stockReserved && (to === OrderStatus.CANCELED || to === OrderStatus.REJECTED)

type Line = { product: { path: string }; quantity: number; price: number }
type AppliedPromotion = { code: string; discountAmount: number; type?: string | null }

/** Per product path: how many more units the edited order takes from stock (negative = returns). */
export const stockDelta = (before: Line[], after: Line[]) => {
  const delta = new Map<string, number>()
  before.forEach(l => delta.set(l.product.path, (delta.get(l.product.path) ?? 0) - l.quantity))
  after.forEach(l => delta.set(l.product.path, (delta.get(l.product.path) ?? 0) + l.quantity))
  return new Map([...delta].filter(([, n]) => n !== 0))
}

/**
 * Totals after an edit (Shopify "edit order"): promotion discounts are kept as granted, capped
 * by the new subtotal; free shipping follows the new shipping fee; a manual discount comes last.
 */
export const recomputeTotals = (input: {
  items: Line[]
  shipping: number
  promotions: AppliedPromotion[]
  manualDiscount?: number | null
}) => {
  const subtotal = input.items.reduce((sum, l) => sum + l.price * l.quantity, 0)
  const shipping = Math.max(0, input.shipping)
  let productDiscountLeft = subtotal
  const promotions = input.promotions.map(p => {
    if (p.type === 'FREE_SHIPPING') return { ...p, discountAmount: shipping }
    const discountAmount = Math.min(p.discountAmount, productDiscountLeft)
    productDiscountLeft -= discountAmount
    return { ...p, discountAmount }
  })
  const manualDiscount = Math.min(Math.max(0, input.manualDiscount ?? 0), productDiscountLeft)
  const discount = promotions.reduce((sum, p) => sum + p.discountAmount, 0) + manualDiscount
  return {
    promotions,
    manualDiscount,
    orderPrices: { subtotal, shipping, discount, total: subtotal + shipping - discount },
  }
}

/** Cameroon numbers are stored with or without +237: compare on the last 9 digits. */
export const phoneKey = (phone?: string | null) => (phone ?? '').replace(/\D/g, '').slice(-9)

type OrderLike = {
  status: string
  createdAt: string
  userData?: { fullName?: string | null; phone?: string | null; email?: string | null } | null
  orderPrices?: { total: number } | null
}

/** Customers derived from orders, one per phone number (Shopify "Customers" list). */
export const aggregateCustomers = (orders: OrderLike[]) => {
  const customers = new Map<
    string,
    {
      phone: string
      name: string
      email: string
      orders: number
      delivered: number
      failed: number
      canceled: number
      spent: number
      firstOrderAt: string
      lastOrderAt: string
    }
  >()
  for (const order of [...orders].sort((a, b) => a.createdAt.localeCompare(b.createdAt))) {
    const key = phoneKey(order.userData?.phone)
    if (!key) continue
    const c = customers.get(key) ?? {
      phone: order.userData?.phone ?? key,
      name: '',
      email: '',
      orders: 0,
      delivered: 0,
      failed: 0,
      canceled: 0,
      spent: 0,
      firstOrderAt: order.createdAt,
      lastOrderAt: order.createdAt,
    }
    c.name = order.userData?.fullName || c.name
    c.email = order.userData?.email || c.email
    c.orders += 1
    c.lastOrderAt = order.createdAt
    if (order.status === OrderStatus.COMPLETED) {
      c.delivered += 1
      c.spent += order.orderPrices?.total ?? 0
    }
    if (order.status === OrderStatus.FAILED_DELIVERY) c.failed += 1
    if (order.status === OrderStatus.CANCELED || order.status === OrderStatus.REJECTED)
      c.canceled += 1
    customers.set(key, c)
  }
  return [...customers.values()]
}

/** Share of finished deliveries the customer refused or couldn't be reached for. */
export const refusalRate = (delivered: number, failed: number) =>
  delivered + failed === 0 ? 0 : failed / (delivered + failed)

/** RFC 4180 CSV (Excel-friendly with the BOM added by the download helper). */
export const toCsv = (rows: Array<Record<string, string | number | null | undefined>>) => {
  if (rows.length === 0) return ''
  const headers = Object.keys(rows[0])
  const cell = (v: string | number | null | undefined) => {
    const s = v === null || v === undefined ? '' : String(v)
    return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }
  return [headers.join(','), ...rows.map(r => headers.map(h => cell(r[h])).join(','))].join('\n')
}

/** Abandoned checkout follow-up state. */
export const checkoutState = (c: {
  data: { orderPath?: string | null; contactedAt?: string | null }
}) => (c.data.orderPath ? 'RECOVERED' : c.data.contactedAt ? 'CONTACTED' : 'NEW')
