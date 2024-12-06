import {
  IPromotion,
  IPromotionAction,
  IPromotionCondition,
} from "../models/Promotions";

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  categoryIds: string[];
}

export interface ShippingInfo {
  method: "DELIVERY" | "PICKUP";
  cost: number;
  location: string;
}

export interface Customer {
  id: string;
  orderCount: number;
  totalSpent: number;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  appliedPromotions: Array<{
    id: string;
    code: string;
    discountAmount: number;
    type: string;
  }>;
}

export class PromotionCalculator {
  private cart: CartItem[];
  private shipping: ShippingInfo;
  private customer: Customer;
  private promotions: IPromotion[];

  constructor(
    cart: CartItem[],
    shipping: ShippingInfo,
    customer: Customer,
    promotions: IPromotion[]
  ) {
    this.cart = cart;
    this.shipping = shipping;
    this.customer = customer;
    this.promotions = this.filterValidPromotions(promotions);
  }

  private filterValidPromotions(promotions: IPromotion[]): IPromotion[] {
    const now = new Date();
    return promotions
      .filter(
        (p) =>
          p.status === "ACTIVE" &&
          new Date(p.startDate) <= now &&
          new Date(p.endDate) >= now
      )
      .sort((a, b) => (b.priority || 0) - (a.priority || 0));
  }

  private checkCondition(condition: IPromotionCondition): boolean {
    const subtotal = this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    switch (condition.type) {
      case "MINIMUM_QUANTITY":
        const totalQuantity = this.cart.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        return totalQuantity >= Number(condition.value);

      case "SPECIFIC_PRODUCTS":
        const productIds = Array.isArray(condition.value)
          ? condition.value
          : [condition.value];
        return this.cart.some((item) => productIds.includes(item.productId));

      case "DELIVERY_METHOD":
        return this.shipping.method === condition.value;

      case "LOCATION":
        return this.shipping.location === condition.value;

      default:
        return false;
    }
  }

  private calculateActionValue(action: IPromotionAction): number {
    const subtotal = this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    switch (action.type) {
      case "PERCENTAGE_DISCOUNT":
        const percentage = Number(action.value);
        const percentageDiscount = (subtotal * percentage) / 100;
        return action.maxDiscount
          ? Math.min(percentageDiscount, action.maxDiscount)
          : percentageDiscount;

      case "FIXED_DISCOUNT":
        return Number(action.value);

      case "FREE_SHIPPING":
        return this.shipping.cost;

      case "FREE_PRODUCT":
        // Find the product in cart and return its value
        const freeProductId = action.value.toString();
        const freeProduct = this.cart.find(
          (item) => item.productId === freeProductId
        );
        return freeProduct ? freeProduct.price : 0;

      case "BUY_X_GET_Y":
        const [buyQty, getQty] = action.value.toString().split(",").map(Number);
        const eligibleItems = this.cart
          .filter((item) => item.quantity >= buyQty)
          .sort((a, b) => a.price - b.price);

        if (eligibleItems.length === 0) return 0;

        const discountedItem = eligibleItems[0];
        return discountedItem.price * getQty;

      default:
        return 0;
    }
  }

  public calculate(): OrderSummary {
    let subtotal = this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    let shipping = this.shipping.cost;
    let totalDiscount = 0;
    const appliedPromotions: OrderSummary["appliedPromotions"] = [];

    for (const promotion of this.promotions) {
      // Check if all conditions are met
      const conditionsMet = promotion.conditions.every((condition: any) =>
        this.checkCondition(condition)
      );

      if (!conditionsMet) continue;

      // Calculate discount from each action
      for (const action of promotion.actions) {
        const discountAmount = this.calculateActionValue(action);
        if (discountAmount > 0) {
          totalDiscount += discountAmount;
          appliedPromotions.push({
            id: promotion.id!,
            code: promotion.code,
            discountAmount,
            type: action.type,
          });
        }
      }
    }

    // Ensure total discount doesn't exceed subtotal + shipping
    totalDiscount = Math.min(totalDiscount, subtotal + shipping);

    return {
      subtotal,
      shipping,
      discount: totalDiscount,
      total: subtotal + shipping - totalDiscount,
      appliedPromotions,
    };
  }
}
