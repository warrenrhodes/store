import { ShoppingWrapper } from '@/components/Shop/ShoppingWrapper'
import { getCategories } from '@/lib/api/categories'
import { fetchAllProducts, fetchProducts } from '@/lib/api/products'
export default async function ProductsPage() {
  const categories = await getCategories()
  const products = await fetchAllProducts()

  return <ShoppingWrapper productList={products || []} categories={categories || []} />
}
