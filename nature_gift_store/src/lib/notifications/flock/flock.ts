import { Order } from '@/lib/firebase/models'
import { DeliveryInfo, OrderPrices, UserData } from '@/lib/type'
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

  private formatOrderMessage(order: Order) {
    const items = order.items
      .map(item => `- ${item.quantity}x ${item.product.title} (${priceFormatted(item.price)})`)
      .join('\n')

    const userData = order.userData as UserData
    const deliveryInfo = order.deliveryInfo as unknown as DeliveryInfo
    const orderPrices = order.orderPrices as OrderPrices
    return {
      text:
        `🛍️ New Order Received!\n\n` +
        `Order ID: ${order.path}\n` +
        `Customer: ${userData.fullName}\n` +
        `Email: ${userData.email}\n` +
        `Phone: ${userData.phone}\n\n` +
        `Items:\n${items}\n\n` +
        `Delivery Address: ${deliveryInfo.address}\n` +
        `Delivery Date: ${deliveryInfo.deliveryDate}\n` +
        `Delivery Time: ${deliveryInfo.deliveryTime}\n` +
        `Additional Notes: ${deliveryInfo.additionalNotes}\n\n` +
        `Order Summary:\n` +
        `Subtotal: ${priceFormatted(orderPrices.subtotal)}\n` +
        `Shipping: ${priceFormatted(orderPrices.shipping)}\n` +
        `Discount: ${priceFormatted(orderPrices.discount)}\n` +
        `Total: ${priceFormatted(orderPrices.total)}\n\n` +
        `Status: ${order.status}`,
    }
  }

  async sendOrderNotification(order: Order) {
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
