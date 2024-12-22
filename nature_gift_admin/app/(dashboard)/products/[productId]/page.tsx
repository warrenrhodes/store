import { ProductFormV2 } from '@/components/products/ProductFormV2'
import {
  getCategories,
  getCategoriesOfProduct,
  getMediasOfProduct,
  getProductId,
} from '@/lib/actions/server'

export default async function EditProductPage(props: { params: Promise<{ productId: string }> }) {
  const params = await props.params
  const [product, categories, categoriesOfProduct, mediasOfProduct] = await Promise.all([
    getProductId(params.productId),
    getCategories(),
    getCategoriesOfProduct(params.productId),
    getMediasOfProduct(params.productId),
  ])

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Product</h1>
        <p className="text-muted-foreground">Make changes to your product</p>
      </div>
      <ProductFormV2
        initialData={product}
        categories={categories}
        categoriesOfProduct={categoriesOfProduct}
        mediasOfProduct={mediasOfProduct}
      />
    </div>
  )
}

export const dynamic = 'force-dynamic'
