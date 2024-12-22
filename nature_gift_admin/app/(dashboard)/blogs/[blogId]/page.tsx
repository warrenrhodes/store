import { BlogForm } from '@/components/blogs/BlogForm'
import { getBlogById, getCategories, getCategoriesOfBlog } from '@/lib/actions/server'
import { notFound } from 'next/navigation'

export default async function EditBlogPostPage(props: { params: Promise<{ blogId: string }> }) {
  const params = await props.params
  const [blog, categories, categoriesOnBlog] = await Promise.all([
    getBlogById(params.blogId),
    getCategories(),
    getCategoriesOfBlog(params.blogId),
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
      <BlogForm initialData={blog} categories={categories} categoriesOnBlog={categoriesOnBlog} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
