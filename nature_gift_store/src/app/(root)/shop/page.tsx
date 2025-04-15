import { ShoppingWrapper } from '@/components/Shop/ShoppingWrapper'
import { getAllCollectionCache } from '@/lib/api/utils'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { Category, Product, ProductStatus } from '@/lib/firebase/models'
import { QueryFilter } from '@spreeloop/database'
export default async function ProductsPage() {
  const categories = await getAllCollectionCache<Category>({
    collection: CollectionsName.Categories,
  })
  const products = await getAllCollectionCache<Product>({
    collection: CollectionsName.Products,
    filters: [
      new QueryFilter('status', '==', ProductStatus.PUBLISHED),
      new QueryFilter('visibility', '==', true),
    ],
  })

  return <ShoppingWrapper productList={products || []} categories={categories || []} />
}
