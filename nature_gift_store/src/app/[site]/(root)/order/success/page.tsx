import { OrderSuccess } from '@/components/Order/OrderSuccess'
import { ThankYouFooter } from '@/components/Order/ThankYouFooter'
import { getDocumentByPathFresh, getStoreCache, siteOf } from '@/lib/api/utils'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { Blog } from '@/lib/firebase/models'
import { getTrackedOrder } from '@/lib/orders/tracking'
import { safeHtml } from '@/lib/safe-html'
import { absoluteUrl } from '@/lib/site'
import { priceFormatted } from '@/lib/utils/utils'
import { fillTags } from '@ngift/core/thank-you'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import type { Metadata } from 'next'

export const metadata: Metadata = { robots: { index: false } }
export const dynamic = 'force-dynamic'

type Query = { order?: string; t?: string; ad?: string }

/**
 * The thank-you page of the ad page the order came from (`ad`: its blog id), filled with this
 * order: only with the order's tracking token, and only when the page is the order's store's.
 */
async function adThankYou(site: string, siteStoreId: string | null, query: Query) {
  const { order: orderId, t, ad } = query
  if (!orderId || !ad || !/^[\w-]{1,200}$/.test(ad)) return undefined
  const order = await getTrackedOrder(orderId, t)
  if (!order?.storeId || (siteStoreId && order.storeId !== siteStoreId)) return undefined
  // Fresh: a thank-you page saved a moment ago shows at once (one read per confirmation).
  const blog = await getDocumentByPathFresh<Blog>({ path: `${CollectionsName.Blogs}/${ad}` })
  if (!blog?.thankYouPage?.trim() || blog.storeId !== order.storeId) return undefined
  const store = await getStoreCache(order.storeId)
  if (!store) return undefined

  const orderNumber = orderId.slice(0, 8).toUpperCase()
  const tracking = `/order/${orderId}?t=${t}`
  const name = order.userData?.fullName?.trim() ?? ''
  const whatsapp = store.settings?.whatsapp ?? ''
  const delivery = order.deliveryInfo
  const html = fillTags(blog.thankYouPage, {
    customerFirstName: name.split(/\s+/)[0],
    customerName: name,
    productName: order.items.map(i => i.product.title).join(', '),
    productImage: order.items[0]?.product.medias?.[0]?.url ?? '',
    quantity: String(order.items.reduce((n, i) => n + i.quantity, 0)),
    orderTotal: priceFormatted(order.orderPrices.total),
    orderId: orderNumber,
    trackingUrl: absoluteUrl(site, tracking),
    deliveryCity: delivery?.city ?? '',
    deliveryDate: delivery?.deliveryDate
      ? format(delivery.deliveryDate, 'PPP', { locale: fr })
      : '',
    storeName: store.name,
    storeUrl: absoluteUrl(store.slug),
    storeWhatsapp: whatsapp,
    whatsappUrl: whatsapp
      ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(`Bonjour ${store.name}, à propos de ma commande ${orderNumber} : `)}`
      : '',
  })
  return { html, orderNumber, tracking }
}

/** After an order: the ad page's own thank-you page, else the platform's confirmation. */
export default async function OrderSuccessPage(props: {
  params: Promise<{ site: string }>
  searchParams: Promise<Query>
}) {
  const [{ site, store }, query] = await Promise.all([siteOf(props.params), props.searchParams])
  const custom = await adThankYou(site, store?.id ?? null, query)
  if (!custom) return <OrderSuccess />
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12">
      <div>{safeHtml(custom.html)}</div>
      <ThankYouFooter orderNumber={custom.orderNumber} tracking={custom.tracking} />
    </main>
  )
}
