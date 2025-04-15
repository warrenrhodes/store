import { PromotionsList } from '@/components/promotions/PromotionsList'
import { getPromotionsCache } from '@/lib/actions/server'

export default async function PromotionsPage() {
  const promotions = await getPromotionsCache()
  return (
    <div className="container py-10">
      <PromotionsList promotions={promotions} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
