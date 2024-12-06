export interface Customer {
  id: string
  orderCount: number
  totalSpent: number
}

export interface OrderSummary {
  subtotal: number
  shipping: number
  discount: number
  total: number
  appliedPromotions: Array<{
    id: string
    code: string
    discountAmount: number
    type: string
  }>
}
