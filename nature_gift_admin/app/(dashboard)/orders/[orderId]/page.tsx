import { OrderDetail } from '@/components/orders/OrderDetail'
import { getOrderByIdCache, getOrdersCache, getProductsCache } from '@/lib/actions/server'
import { ProductStatus } from '@/lib/firebase/models'
import { phoneKey } from '@/lib/orders/order-logic'
import { notFound } from 'next/navigation'

export default async function OrderPage(props: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await props.params
  const order = await getOrderByIdCache(orderId)
  if (!order) notFound()

  const [products, orders] = await Promise.all([getProductsCache(), getOrdersCache()])
  const key = phoneKey(order.data.userData?.phone)
  const history = key ? orders.filter(o => phoneKey(o.data.userData?.phone) === key) : []

  return (
    <OrderDetail
      order={order}
      customer={{
        orders: history.length,
        delivered: history.filter(o => o.data.status === 'COMPLETED').length,
        failed: history.filter(o => o.data.status === 'FAILED_DELIVERY').length,
      }}
      products={products
        .filter(p => p.data.status === ProductStatus.PUBLISHED)
        .map(p => {
          const price = p.data.price as {
            regular: number
            sale?: number | null
            saleStartDate?: string | null
            saleEndDate?: string | null
          }
          const now = Date.now()
          const onSale =
            !!price.sale &&
            !!price.saleStartDate &&
            !!price.saleEndDate &&
            new Date(price.saleStartDate).getTime() <= now &&
            now <= new Date(price.saleEndDate).getTime()
          return {
            path: p.path,
            title: p.data.title,
            price: onSale ? price.sale! : price.regular,
            stock: p.data.inventory?.stockQuantity,
          }
        })}
    />
  )
}

export const dynamic = 'force-dynamic'
