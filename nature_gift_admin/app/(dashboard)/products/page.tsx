import { ProductList } from '@/components/products/ProductList'
import { getProducts } from '@/lib/actions/server'

export default async function Products() {
  const products = await getProducts()

  return (
    <div className="sm:px-10 px-2 py-5">
      <ProductList products={products} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
