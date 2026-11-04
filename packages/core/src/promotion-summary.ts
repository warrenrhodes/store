// How a promotion reads in the admin's list: its real state today and what it gives. Pure.
// Self-check: promotion-summary.check.ts
import { toDate } from './utils'

type Dated = { status: string; startDate?: unknown; endDate?: unknown }

/** An ACTIVE promotion outside its dates isn't running: 'EXPIRED' or 'SCHEDULED'. */
export const promotionState = (promotion: Dated, now = new Date()) => {
  if (promotion.status !== 'ACTIVE') return promotion.status
  const end = toDate(promotion.endDate as never)
  const start = toDate(promotion.startDate as never)
  if (end && end < now) return 'EXPIRED'
  if (start && start > now) return 'SCHEDULED'
  return 'ACTIVE'
}

type Action = { type: string; value?: string | null }

/** "-10%", "-2 000 FCFA", "Free shipping", "Buy 2 get 1"; several joined by " + ". */
export const discountLabel = (actions: Action[], money: (amount: number) => string) =>
  actions
    .map(action => {
      switch (action.type) {
        case 'PERCENTAGE_DISCOUNT':
          return `-${action.value}%`
        case 'FIXED_DISCOUNT':
          return `-${money(Number(action.value))}`
        case 'FREE_SHIPPING':
          return 'Free shipping'
        case 'FREE_PRODUCT':
          return 'Free product'
        case 'BUY_X_GET_Y': {
          const [buy, get] = String(action.value ?? '').split(',')
          return `Buy ${buy} get ${get}`
        }
        default:
          return action.type
      }
    })
    .join(' + ')
