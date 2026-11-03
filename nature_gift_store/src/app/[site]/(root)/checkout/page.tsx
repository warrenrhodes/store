import CheckoutPageView from '@/components/Checkout/Index'
import { getShippingZonesCache, siteOf } from '@/lib/api/utils'

export default async function CheckoutPage({ params }: { params: Promise<{ site: string }> }) {
  // A store's zones; on the marketplace every store's, the checkout keeps the cart's store's.
  const shipments = await getShippingZonesCache((await siteOf(params)).store?.id ?? null)
  return (
    <div className="min-h-screen bg-background">
      <CheckoutPageView shipments={shipments} />
    </div>
  )
}
