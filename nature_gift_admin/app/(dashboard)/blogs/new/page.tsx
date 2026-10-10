import { BlogForm } from '@/components/blogs/BlogForm'
import { getCategoriesCache, getProductsCache } from '@/lib/actions/server'

export default async function NewBlogPage() {
  const [categories, products] = await Promise.all([getCategoriesCache(), getProductsCache()])
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Create New Blog Post</h1>{' '}
        <p className="text-muted-foreground">Add a new blog post to your site</p>
      </div>
      <BlogForm categories={categories} products={products} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
