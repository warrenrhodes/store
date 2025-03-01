import { CategoryForm } from '@/components/categories/CategoryForm'
import { getCategories, getCategoryById } from '@/lib/actions/server'
import { notFound } from 'next/navigation'

export default async function EditCategoryPage(props: { params: Promise<{ categoryId: string }> }) {
  const params = await props.params
  const [category, categories] = await Promise.all([
    getCategoryById(params.categoryId),
    getCategories(),
  ])

  if (!category) {
    notFound()
  }
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Category</h1>
        <p className="text-muted-foreground">Make changes to your category</p>
      </div>
      <CategoryForm category={category} categories={categories} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
