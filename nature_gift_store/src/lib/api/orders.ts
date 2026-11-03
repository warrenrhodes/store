import { CartItem } from '@/hooks/useCart'
import { Order } from '../firebase/models'

export type CreateOrderResult =
  | { ok: true; order: Order }
  | {
      ok: false
      error: 'OUT_OF_STOCK' | 'PROMOTION_EXHAUSTED' | 'MIXED_STORES' | 'FAILED'
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
    if (response.ok) return { ok: true, order: body }
    if (response.status === 409) return { ok: false, error: body.error, detail: body.detail }
    return { ok: false, error: 'FAILED' }
  } catch {
    return { ok: false, error: 'FAILED' }
  }
}
