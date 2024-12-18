import { PromotionFormV2 } from '@/components/promotions/PromotionsFormV2'
import { getProducts, getPromotionById } from '@/lib/actions/actions'

export default async function EditPromotionPage(props: {
  params: Promise<{ promotionId: string }>
}) {
  const params = await props.params
  const [promotion, products] = await Promise.all([
    getPromotionById(params.promotionId),
    getProducts(),
  ])

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Promotion</h1>
        <p className="text-muted-foreground">Make changes to your promotion</p>
      </div>
      <PromotionFormV2 initialData={promotion} products={products} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
