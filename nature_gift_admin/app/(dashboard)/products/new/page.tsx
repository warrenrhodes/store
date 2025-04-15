import { ProductFormV2 } from '@/components/products/ProductFormV2'
import { getBlogsCache, getCategoriesCache } from '@/lib/actions/server'

export default async function NewProductPage() {
  const [categories, blogs] = await Promise.all([getCategoriesCache(), getBlogsCache()])
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Product</h1>
        <p className="text-muted-foreground">Add a new product to your store</p>
      </div>
      <ProductFormV2 categories={categories} blogs={blogs} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
