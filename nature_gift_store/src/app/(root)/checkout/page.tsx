import CheckoutPageView from '@/components/Checkout/Index'
import { getShipments } from '@/lib/api/shipments'

export default async function CheckoutPage() {
  const shipments = await getShipments()
  return (
    <div className="min-h-screen bg-background">
      <CheckoutPageView shipments={shipments} />
    </div>
  )
}
