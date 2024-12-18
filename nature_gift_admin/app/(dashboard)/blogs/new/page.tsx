import { BlogForm } from '@/components/blogs/BlogForm'
import { getCategories } from '@/lib/actions/actions'

export default async function NewBlogPage() {
  const [categories] = await Promise.all([getCategories()])
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Blog Post</h1>{' '}
        <p className="text-muted-foreground">Add a new blog post to your site</p>
      </div>
      <BlogForm categories={categories} categoriesOnBlog={[]} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
