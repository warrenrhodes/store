import { IOrder } from '@/lib/api/orders'
import { priceFormatted } from '@/lib/utils/utils'
import axios from 'axios'

interface FlockConfig {
  webhookUrl: string
}

export class FlockNotifier {
  private webhookUrl: string

  constructor(config: FlockConfig) {
    this.webhookUrl = config.webhookUrl
  }

  private formatOrderMessage(order: IOrder) {
    const items = order.items
      .map(item => `- ${item.quantity}x ${item.product.title} (${priceFormatted(item.price)})`)
      .join('\n')

    return {
      text:
        `🛍️ New Order Received!\n\n` +
        `Order ID: ${order.id}\n` +
        `Customer: ${order.userData.fullName}\n` +
        `Email: ${order.userData.email}\n` +
        `Phone: ${order.userData.phone}\n\n` +
        `Items:\n${items}\n\n` +
        `Delivery Address: ${order.deliveryInfo.address}\n` +
        `Delivery Date: ${order.deliveryInfo.deliveryDate}\n` +
        `Delivery Time: ${order.deliveryInfo.deliveryTime}\n` +
        `Additional Notes: ${order.deliveryInfo.additionalNotes}\n\n` +
        `Order Summary:\n` +
        `Subtotal: ${priceFormatted(order.orderPrices.subtotal)}\n` +
        `Shipping: ${priceFormatted(order.orderPrices.shipping)}\n` +
        `Discount: ${priceFormatted(order.orderPrices.discount)}\n` +
        `Total: ${priceFormatted(order.orderPrices.total)}\n\n` +
        `Status: ${order.status}`,
    }
  }

  async sendOrderNotification(order: IOrder) {
    try {
      const message = this.formatOrderMessage(order)
      await axios.post(this.webhookUrl, message)
      console.log('Flock notification sent successfully')
    } catch (error) {
      console.error('Error sending Flock notification:', error)
      throw error
    }
  }
}
