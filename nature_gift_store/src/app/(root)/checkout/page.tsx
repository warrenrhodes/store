import CheckoutPageView from '@/components/Checkout/Index'
import { getShippingZonesCache } from '@/lib/api/utils'

export default async function CheckoutPage() {
  const shipments = await getShippingZonesCache()
  return (
    <div className="min-h-screen bg-background">
      <CheckoutPageView shipments={shipments} />
    </div>
  )
}
