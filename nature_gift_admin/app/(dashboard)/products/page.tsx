import { ProductList } from '@/components/products/ProductList'
import { getProducts } from '@/lib/actions/actions'

export default async function Products() {
  const products = await getProducts()

  return (
    <div className="px-10 py-5">
      <ProductList products={products} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
