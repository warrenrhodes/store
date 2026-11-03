import { PromotionAction, PromotionCondition } from './types'
import { CartItem, IDeliveryInfo, OrderSummary, Promotion } from './models'
import { normalize, ShippingZone } from './shipping-zones'
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

/** Same code whatever the case or surrounding spaces. */
export const normalizeCode = (code: string) => code.trim().toUpperCase()

/** Whether a promotion applies without a code, or one of `codes` unlocks it. */
export const isUnlocked = (promotion: Promotion, codes: string[] = []) =>
  !promotion.requiresCode || codes.map(normalizeCode).includes(normalizeCode(promotion.code ?? ''))

/**
 * Shopify-style usage limits: `total` orders overall, `perCustomer` orders per phone number.
 * `customerUses` = orders this customer already placed with it (unknown → only `total` checked).
 */
export const isWithinUsageLimit = (promotion: Promotion, customerUses?: number) => {
  const { total, perCustomer } = promotion.usageLimit ?? {}
  if (total && (promotion.usageCount ?? 0) >= total) return false
  if (perCustomer && customerUses !== undefined && customerUses >= perCustomer) return false
  return true
}

/**
 * Free-shipping offer a product page can advertise: null when there is none, otherwise the
 * names of the areas or cities it is limited to ([] = everywhere). Offers needing several
 * items, a minimum amount or a code the visitor doesn't have are not advertised. Expects
 * promotions already filtered to active ones (getAllValidPromotion).
 */
export const getFreeShippingAreas = (
  promotions: Promotion[],
  productPath: string,
  zones: ShippingZone[],
  codes: string[] = [],
): string[] | null => {
  const offers = promotions.filter(
    p =>
      p.actions.some(a => a.type === 'FREE_SHIPPING') &&
      isUnlocked(p, codes) &&
      isWithinUsageLimit(p) &&
      (getPromotionProducts(p)?.includes(productPath) ?? true) &&
      !p.conditions.some(
        c =>
          (c.type === 'MINIMUM_QUANTITY' && Number(parseList(c.value)[0]) > 1) ||
          c.type === 'MINIMUM_AMOUNT' ||
          c.type === 'SPECIFIC_CATEGORIES',
      ),
  )
  if (offers.length === 0) return null
  const limited = (p: Promotion) =>
    p.conditions.some(c => c.type === 'LOCATION' || c.type === 'CITY')
  if (offers.some(p => !limited(p))) return []

  // LOCATION conditions hold area ids; areas deleted or deactivated since are skipped.
  const names = new Map(zones.flatMap(z => z.areas).map(a => [a.id, a.name]))
  const labels = offers.flatMap(p =>
    p.conditions.flatMap(c =>
      c.type === 'LOCATION'
        ? parseList(c.value).flatMap(id => names.get(id) ?? [])
        : c.type === 'CITY'
          ? parseList(c.value)
          : [],
    ),
  )
  return labels.length > 0 ? [...new Set(labels)] : null
}

export type CodeStatus = 'applied' | 'not_applicable' | 'invalid'

export class PromotionCalculator {
  private cart: CartItem[]
  private deliveryInfo?: Partial<IDeliveryInfo>
  private promotions: Promotion[]
  private codes: string[]
  private pastOrders: number

  /**
   * `codes`: discount codes typed by the customer or carried by an ad link. `pastOrders`: orders
   * the customer already placed in this store (0 when unknown: the preview has no phone yet).
   */
  constructor(
    cart: CartItem[],
    shipping: Partial<IDeliveryInfo>,
    promotions: Promotion[],
    codes: string[] = [],
    pastOrders = 0,
  ) {
    this.cart = cart
    this.pastOrders = pastOrders
    this.deliveryInfo = shipping
    this.codes = [...new Set(codes.map(normalizeCode).filter(Boolean))]
    this.promotions = this.filterValidPromotions(promotions)
  }

  private filterValidPromotions(promotions: Promotion[]): Promotion[] {
    const now = new Date()
    return promotions
      .filter(p => {
        const start = toDate(p.startDate)
        const end = toDate(p.endDate)
        return (
          p.status === 'ACTIVE' &&
          !!start &&
          !!end &&
          start <= now &&
          end >= now &&
          isUnlocked(p, this.codes)
        )
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
        return !!this.deliveryInfo?.locationId && values.includes(this.deliveryInfo.locationId)

      case 'MINIMUM_AMOUNT':
        return this.cart.reduce((sum, i) => sum + i.price * i.quantity, 0) >= Number(values[0] ?? 0)

      case 'CITY': {
        const city = normalize(this.deliveryInfo?.city ?? '')
        return !!city && values.some(v => normalize(v) === city)
      }

      case 'SPECIFIC_CATEGORIES':
        return this.cart.some(item =>
          (item.product.categories ?? []).some(category => values.includes(category)),
        )

      case 'FIRST_ORDER':
        return this.pastOrders === 0

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

  /** For each code the customer entered: applied, valid but not applicable, or unknown. */
  public codeStatuses(summary: OrderSummary): Record<string, CodeStatus> {
    const applied = new Set(summary.appliedPromotions.map(p => normalizeCode(p.code ?? '')))
    const known = new Set(this.promotions.map(p => normalizeCode(p.code ?? '')))
    return Object.fromEntries(
      this.codes.map(code => [
        code,
        applied.has(code) ? 'applied' : known.has(code) ? 'not_applicable' : 'invalid',
      ]),
    )
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
