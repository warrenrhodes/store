import { CartItem } from '@/hooks/useCart'
import { PromotionAction, PromotionCondition } from '../type'
import { IDeliveryInfo, OrderSummary, Promotion } from '../firebase/models'
import { toDate } from './utils'

/**
 * Condition/action values are stored as strings: either a plain value ("DELIVERY",
 * "products/abc") or a JSON array ('["Medong","Etoudi"]'). Normalizes both to a list.
 */
export const parseList = (value: unknown): string[] => {
  let parsed = value
  if (typeof value === 'string') {
    try {
      parsed = JSON.parse(value)
    } catch {
      parsed = value
    }
  }
  return (Array.isArray(parsed) ? parsed : [parsed])
    .filter(v => v !== '' && v !== null && v !== undefined)
    .map(String)
}

/** Product paths a promotion is restricted to, or null when it applies to the whole cart. */
export const getPromotionProducts = (promotion: Promotion): string[] | null => {
  const condition = promotion.conditions.find(c => c.type === 'SPECIFIC_PRODUCTS')
  return condition ? parseList(condition.value) : null
}

/**
 * Free-shipping offer a product page can advertise: null when there is none, otherwise the
 * areas it is limited to ([] = everywhere). Offers needing several items are not advertised.
 * Expects promotions already filtered to active ones (getAllValidPromotion).
 */
export const getFreeShippingAreas = (promotions: Promotion[], productPath: string) => {
  const offers = promotions.filter(
    p =>
      p.actions.some(a => a.type === 'FREE_SHIPPING') &&
      (getPromotionProducts(p)?.includes(productPath) ?? true) &&
      !p.conditions.some(c => c.type === 'MINIMUM_QUANTITY' && Number(parseList(c.value)[0]) > 1),
  )
  if (offers.length === 0) return null
  const areas = offers.map(p =>
    p.conditions.filter(c => c.type === 'LOCATION').flatMap(c => parseList(c.value)),
  )
  return areas.some(a => a.length === 0) ? [] : [...new Set(areas.flat())]
}

export class PromotionCalculator {
  private cart: CartItem[]
  private deliveryInfo?: Partial<IDeliveryInfo>
  private promotions: Promotion[]

  constructor(cart: CartItem[], shipping: Partial<IDeliveryInfo>, promotions: Promotion[]) {
    this.cart = cart
    this.deliveryInfo = shipping
    this.promotions = this.filterValidPromotions(promotions)
  }

  private filterValidPromotions(promotions: Promotion[]): Promotion[] {
    const now = new Date()
    return promotions
      .filter(p => {
        const start = toDate(p.startDate)
        const end = toDate(p.endDate)
        return p.status === 'ACTIVE' && !!start && !!end && start <= now && end >= now
      })
      .sort((a, b) => (b.priority || 0) - (a.priority || 0))
  }

  private checkCondition(condition: PromotionCondition): boolean {
    const values = parseList(condition.value)

    switch (condition.type) {
      case 'MINIMUM_QUANTITY': {
        const totalQuantity = this.cart.reduce((sum, item) => sum + item.quantity, 0)
        return totalQuantity >= Number(values[0] ?? 0)
      }

      case 'SPECIFIC_PRODUCTS':
        return this.cart.some(item => values.includes(item.product.path))

      case 'DELIVERY_METHOD':
        return (
          !!this.deliveryInfo?.deliveryMethod && values.includes(this.deliveryInfo.deliveryMethod)
        )

      case 'LOCATION':
        return !!this.deliveryInfo?.location && values.includes(this.deliveryInfo.location)

      default:
        return false
    }
  }

  /** Product discount of one action; `targets` restricts it to the promotion's products. */
  private calculateActionValue(action: PromotionAction, targets: string[] | null): number {
    const value = parseList(action.value)[0] ?? ''
    const items = targets ? this.cart.filter(i => targets.includes(i.product.path)) : this.cart
    const base = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    switch (action.type) {
      case 'PERCENTAGE_DISCOUNT': {
        const discount = (base * Number(value)) / 100
        return action.maxDiscount ? Math.min(discount, action.maxDiscount) : discount
      }

      case 'FIXED_DISCOUNT':
        return Number(value) || 0

      case 'FREE_PRODUCT': {
        // Older promotions saved no product: fall back to the promotion's product.
        const freeProductId = value || targets?.[0]
        return this.cart.find(item => item.product.path === freeProductId)?.price ?? 0
      }

      case 'BUY_X_GET_Y': {
        // "Buy 2 get 1": every full group of 3 units of a product makes 1 unit free.
        const [buyQty, getQty] = String(action.value).split(',').map(Number)
        if (!(buyQty > 0) || !(getQty > 0)) return 0
        return items.reduce(
          (sum, item) => sum + Math.floor(item.quantity / (buyQty + getQty)) * getQty * item.price,
          0,
        )
      }

      default:
        return 0
    }
  }

  public calculate(): OrderSummary {
    const subtotal = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = this.deliveryInfo?.cost || 0
    let productDiscount = 0
    let shippingLeft = shipping
    const appliedPromotions: OrderSummary['appliedPromotions'] = []

    for (const promotion of this.promotions) {
      if (!promotion.conditions.every(condition => this.checkCondition(condition))) continue
      const targets = getPromotionProducts(promotion)

      for (const action of promotion.actions as PromotionAction[]) {
        let discountAmount: number
        if (action.type === 'FREE_SHIPPING') {
          // Shipping can only be waived once, however many promotions offer it.
          discountAmount = shippingLeft
          shippingLeft = 0
        } else {
          discountAmount = Math.min(
            this.calculateActionValue(action, targets),
            subtotal - productDiscount,
          )
          productDiscount += discountAmount
        }
        if (discountAmount > 0) {
          appliedPromotions.push({
            id: promotion.path,
            code: promotion.code,
            discountAmount,
            type: action.type,
          })
        }
      }
    }

    const discount = productDiscount + (shipping - shippingLeft)
    return {
      subtotal,
      shipping,
      discount,
      total: subtotal + shipping - discount,
      appliedPromotions,
    }
  }
}
