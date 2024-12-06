import { IOrder } from '../models/order'

export const getOrders = async (customerId: string) => {
  const orders = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL}/api/orders/customers/${customerId}`,
  )
  return await orders.json()
}

export const createOrder = async (order: IOrder): Promise<string | null> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL}/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })

  if (!response.ok || response.status !== 200) {
    return null
  }
  return await response.json()
}
