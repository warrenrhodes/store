import CheckoutPageView from '@/components/Checkout/Index'
import { getAllCollectionCache } from '@/lib/api/utils'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { Shipment } from '@/lib/firebase/models'

export default async function CheckoutPage() {
  const shipments = await getAllCollectionCache<Shipment>({ collection: CollectionsName.Shipments })
  return (
    <div className="min-h-screen bg-background">
      <CheckoutPageView shipments={shipments} />
    </div>
  )
}
