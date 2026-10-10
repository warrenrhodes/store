import { CategoryForm } from '@/components/categories/CategoryForm'
import { getCategoriesCache } from '@/lib/actions/server'

export default async function NewCategoryPage() {
  const categories = await getCategoriesCache()
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Create New Category</h1>
        <p className="text-muted-foreground">Add a new product category</p>
      </div>
      <CategoryForm categories={categories} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
