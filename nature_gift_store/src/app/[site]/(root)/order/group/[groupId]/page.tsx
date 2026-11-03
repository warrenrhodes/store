import { GroupTracking } from '@/components/Order/GroupTracking'
import { getStoreCache, siteOf } from '@/lib/api/utils'
import { getTrackedGroup } from '@/lib/orders/tracking'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = { title: 'Suivi de commande', robots: { index: false } }
export const dynamic = 'force-dynamic'

/** A marketplace cart's orders, one per store, from the confirmation page's link. */
export default async function GroupTrackingPage(props: {
  params: Promise<{ site: string; groupId: string }>
  searchParams: Promise<{ t?: string }>
}) {
  const { groupId } = await props.params
  const { t } = await props.searchParams
  const { store } = await siteOf(props.params)
  const orders = store ? undefined : await getTrackedGroup(groupId, t)
  if (!orders) notFound()

  const groups = await Promise.all(
    orders.map(async order => ({
      id: order.id,
      store: (await getStoreCache(order.storeId ?? ''))?.name ?? '',
      status: order.status,
      total: order.orderPrices.total,
      shipping: order.orderPrices.shipping,
      items: order.items.map(i => ({ title: i.product.title, quantity: i.quantity })),
    })),
  )
  return <GroupTracking token={t!} orders={JSON.parse(JSON.stringify(groups))} />
}
