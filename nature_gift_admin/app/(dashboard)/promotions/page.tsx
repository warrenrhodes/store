import { PromotionsList } from '@/components/promotions/PromotionsList'
import { getPromotionsCache } from '@/lib/actions/server'

export default async function PromotionsPage() {
  const promotions = await getPromotionsCache()
  return (
    <div className="mx-auto w-full max-w-6xl">
      <PromotionsList promotions={promotions} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
