import { getDocumentId } from '@spreeloop/database'
import { PromotionFormV2 } from '@/components/promotions/PromotionsFormV2'
import {
  getProductsCache,
  getPromotionByIdCache,
  getLocationsCache,
  getCategoriesCache,
} from '@/lib/actions/server'

export default async function EditPromotionPage(props: {
  params: Promise<{ promotionId: string }>
}) {
  const params = await props.params
  const [promotion, products, locations] = await Promise.all([
    getPromotionByIdCache(params.promotionId),
    getProductsCache(),
    getLocationsCache(),
  ])
  const categories = await getCategoriesCache()

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Edit Promotion</h1>
        <p className="text-muted-foreground">Make changes to your promotion</p>
      </div>
      <PromotionFormV2
        initialData={promotion}
        products={products}
        locations={locations.map(l => ({
          id: getDocumentId(l.path),
          name: `${l.data.name} (${l.data.city})`,
        }))}
        cities={[...new Set(locations.map(l => l.data.city).filter(Boolean))].sort()}
        categories={categories.map(c => c.data.name).sort()}
      />
    </div>
  )
}

export const dynamic = 'force-dynamic'
