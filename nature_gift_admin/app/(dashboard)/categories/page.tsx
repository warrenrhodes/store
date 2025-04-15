import { CategoryList } from '@/components/categories/CategoryList'
import { getCategoriesCache } from '@/lib/actions/server'

export default async function CategoriesPage() {
  const categories = await getCategoriesCache()
  return (
    <div className="container py-10">
      <CategoryList categories={categories} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
