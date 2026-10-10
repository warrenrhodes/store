import { PromotionFormV2 } from '@/components/promotions/PromotionsFormV2'
import { getProductsCache } from '@/lib/actions/server'

export default async function NewPromotionPage() {
  const [products] = await Promise.all([getProductsCache()])
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Create New Promotion</h1>
        <p className="text-muted-foreground">Add a new promotion to your store</p>
      </div>
      <PromotionFormV2 products={products} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
