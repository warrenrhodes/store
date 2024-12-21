import { CartItem } from '@/hooks/useCart'
import { IDeliveryInfo, OrderSummary } from '../api/orders'
import { IPromotion } from '../api/promotions'

type IPromotionCondition = IPromotion['conditions'][0]
type IPromotionAction = IPromotion['actions'][0]

export class PromotionCalculator {
  private cart: CartItem[]
  private deliveryInfo?: Partial<IDeliveryInfo>
  private promotions: IPromotion[]

  constructor(cart: CartItem[], shipping: Partial<IDeliveryInfo>, promotions: IPromotion[]) {
    this.cart = cart
    this.deliveryInfo = shipping
    this.promotions = this.filterValidPromotions(promotions)
  }

  private filterValidPromotions(promotions: IPromotion[]): IPromotion[] {
    const now = new Date()
    return promotions
      .filter(
        p => p.status === 'ACTIVE' && new Date(p.startDate) <= now && new Date(p.endDate) >= now,
      )
      .sort((a, b) => (b.priority || 0) - (a.priority || 0))
  }

  private checkCondition(condition: IPromotionCondition): boolean {
    const conditionValue = JSON.parse(condition.value)
    switch (condition.type) {
      case 'MINIMUM_QUANTITY':
        const totalQuantity = this.cart.reduce((sum, item) => sum + item.quantity, 0)
        return totalQuantity >= Number(conditionValue)

      case 'SPECIFIC_PRODUCTS':
        const productIds = Array.isArray(conditionValue) ? conditionValue : [conditionValue]
        return this.cart.some(item => productIds.includes(item.product.id))

      case 'DELIVERY_METHOD':
        return this.deliveryInfo?.deliveryMethod === conditionValue

      case 'LOCATION':
        return !this.deliveryInfo?.location
          ? false
          : Array.isArray(conditionValue)
            ? conditionValue.includes(this.deliveryInfo.location)
            : [conditionValue].includes(this.deliveryInfo.location)

      default:
        return false
    }
  }

  private calculateActionValue(action: IPromotionAction): number {
    const actionValue = JSON.parse(action.value)
    const subtotal = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    switch (action.type) {
      case 'PERCENTAGE_DISCOUNT':
        const percentage = Number(actionValue)
        const percentageDiscount = (subtotal * percentage) / 100
        return action.maxDiscount
          ? Math.min(percentageDiscount, action.maxDiscount)
          : percentageDiscount

      case 'FIXED_DISCOUNT':
        return Number(actionValue)

      case 'FREE_SHIPPING':
        return this.deliveryInfo?.cost || 0

      case 'FREE_PRODUCT':
        // Find the product in cart and return its value
        const freeProductId = actionValue.toString()
        const freeProduct = this.cart.find(item => item.product.id === freeProductId)
        return freeProduct ? freeProduct.price : 0

      case 'BUY_X_GET_Y':
        const [buyQty, getQty] = actionValue.toString().split(',').map(Number)
        const eligibleItems = this.cart
          .filter(item => item.quantity >= buyQty)
          .sort((a, b) => a.price - b.price)

        if (eligibleItems.length === 0) return 0

        const discountedItem = eligibleItems[0]
        return discountedItem.price * getQty

      default:
        return 0
    }
  }

  public calculate(): OrderSummary {
    const subtotal = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = this.deliveryInfo?.cost || 0
    let totalDiscount = 0
    const appliedPromotions: OrderSummary['appliedPromotions'] = []

    for (const promotion of this.promotions) {
      // Check if all conditions are met
      const conditionsMet = promotion.conditions.every((condition: any) =>
        this.checkCondition(condition),
      )

      if (!conditionsMet) continue

      // Calculate discount from each action
      for (const action of promotion.actions) {
        const discountAmount = this.calculateActionValue(action)
        if (discountAmount > 0) {
          totalDiscount += discountAmount
          appliedPromotions.push({
            id: promotion.id,
            code: promotion.code,
            discountAmount,
            type: action.type,
          })
        }
      }
    }

    // Ensure total discount doesn't exceed subtotal + shipping
    totalDiscount = Math.min(totalDiscount, subtotal + shipping)

    return {
      subtotal,
      shipping,
      discount: totalDiscount,
      total: subtotal + shipping - totalDiscount,
      appliedPromotions,
    }
  }
}
