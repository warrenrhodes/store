import { CategoryForm } from '@/components/categories/CategoryForm'
import { getCategoriesCache, getCategoryByIdCache } from '@/lib/actions/server'
import { notFound } from 'next/navigation'

export default async function EditCategoryPage(props: { params: Promise<{ categoryId: string }> }) {
  const params = await props.params
  const [category, categories] = await Promise.all([
    getCategoryByIdCache(params.categoryId),
    getCategoriesCache(),
  ])

  if (!category) {
    notFound()
  }
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Edit Category</h1>
        <p className="text-muted-foreground">Make changes to your category</p>
      </div>
      <CategoryForm category={category} categories={categories} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
