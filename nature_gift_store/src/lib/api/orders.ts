import { CartItem } from '@/hooks/useCart'
import { Order } from '../firebase/models'

export type CreateOrderResult =
  | {
      ok: true
      /** One order per store of the cart (a store's page: one). */
      orders: (Order & { path: string })[]
      /** Set when the cart made several orders: /order/group/<id>. */
      checkoutGroupId: string | null
      trackingToken: string
    }
  | {
      ok: false
      error: 'OUT_OF_STOCK' | 'PROMOTION_EXHAUSTED' | 'FAILED'
      detail?: string
    }

export const createOrder = async (params: {
  /** The page's site: the server checks the cart against it. */
  site: string
  order: Record<string, unknown>
  cartItems: CartItem[]
  promoCodes?: string[]
  checkoutId?: string
}): Promise<CreateOrderResult> => {
  try {
    const response = await fetch(`/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    })
    const body = await response.json().catch(() => ({}))
    if (response.ok) {
      return {
        ok: true,
        orders: body.orders,
        checkoutGroupId: body.checkoutGroupId ?? null,
        trackingToken: body.trackingToken,
      }
    }
    if (response.status === 409) return { ok: false, error: body.error, detail: body.detail }
    return { ok: false, error: 'FAILED' }
  } catch {
    return { ok: false, error: 'FAILED' }
  }
}
