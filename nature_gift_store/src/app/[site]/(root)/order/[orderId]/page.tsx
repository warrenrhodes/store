import { OrderTracking, TrackedOrder } from '@/components/Order/OrderTracking'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { backend } from '@/lib/firebase/firebase-server/firebase'
import { siteOf } from '@/lib/api/utils'
import { getTrackedOrder } from '@/lib/orders/tracking'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = { title: 'Suivi de commande', robots: { index: false } }

/** Customer order tracking, opened from the link on the confirmation page (no account needed). */
export default async function OrderTrackingPage(props: {
  params: Promise<{ site: string; orderId: string }>
  searchParams: Promise<{ t?: string }>
}) {
  const { orderId } = await props.params
  const { t } = await props.searchParams
  const { store } = await siteOf(props.params)
  const order = await getTrackedOrder(orderId, t)
  // A store's tracking page only opens its own orders (the marketplace opens any).
  if (!order || (store && order.storeId !== store.id)) notFound()

  // Products this order already has a review for (review ids are <orderId>_<productId>).
  const reviewRefs = order.items.map(i =>
    backend.db
      .collection(CollectionsName.Reviews)
      .doc(`${orderId}_${i.product.path.split('/').pop()}`),
  )
  const reviewed = (await backend.db.getAll(...reviewRefs))
    .filter(doc => doc.exists)
    .map(doc => doc.get('productPath') as string)

  // Only what the customer needs; no internal fields.
  const tracked: TrackedOrder = JSON.parse(
    JSON.stringify({
      id: orderId,
      token: t,
      status: order.status,
      createdAt: order.createdAt,
      history: order.history ?? [],
      deliveryInfo: order.deliveryInfo,
      fullName: order.userData?.fullName,
      prices: order.orderPrices,
      promotions: order.promotions ?? [],
      items: order.items.map(i => ({
        path: i.product.path,
        title: i.product.title,
        image: i.product.medias?.[0]?.url ?? null,
        quantity: i.quantity,
        price: i.price,
      })),
      reviewed,
    }),
  )
  return <OrderTracking order={tracked} />
}

export const dynamic = 'force-dynamic'
