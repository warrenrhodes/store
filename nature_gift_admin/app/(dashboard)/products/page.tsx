import { ProductList } from '@/components/products/ProductList'
import { getProductsCache } from '@/lib/actions/server'

export default async function Products() {
  const products = await getProductsCache()

  return (
    <div className="mx-auto w-full max-w-6xl">
      <ProductList products={products} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
