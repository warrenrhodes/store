import { BlogForm } from '@/components/blogs/BlogForm'
import { getBlogByIdCache, getCategoriesCache, getProductsCache } from '@/lib/actions/server'
import { notFound } from 'next/navigation'

export default async function EditBlogPostPage(props: { params: Promise<{ blogId: string }> }) {
  const params = await props.params
  const [blog, categories, products] = await Promise.all([
    getBlogByIdCache(params.blogId),
    getCategoriesCache(),
    getProductsCache(),
  ])

  if (!blog) {
    notFound()
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Blog Post</h1>
        <p className="text-muted-foreground">Make changes to your blog post</p>
      </div>
      <BlogForm initialData={blog} categories={categories} products={products} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
