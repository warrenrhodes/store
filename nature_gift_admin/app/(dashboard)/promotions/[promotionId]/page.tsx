import { PromotionFormV2 } from '@/components/promotions/PromotionsFormV2'
import { getProductsCache, getPromotionByIdCache } from '@/lib/actions/server'

export default async function EditPromotionPage(props: {
  params: Promise<{ promotionId: string }>
}) {
  const params = await props.params
  const [promotion, products] = await Promise.all([
    getPromotionByIdCache(params.promotionId),
    getProductsCache(),
  ])

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Edit Promotion</h1>
        <p className="text-muted-foreground">Make changes to your promotion</p>
      </div>
      <PromotionFormV2 initialData={promotion} products={products} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
