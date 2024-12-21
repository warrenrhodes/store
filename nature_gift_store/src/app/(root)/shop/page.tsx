import { ShoppingWrapper } from '@/components/Shop/ShoppingWrapper'
import { getCategories } from '@/lib/api/categories'
import { getProducts } from '@/lib/api/products'
export default async function ProductsPage() {
  const categories = await getCategories()
  const products = await getProducts()

  return <ShoppingWrapper productList={products || []} categories={categories || []} />
}
