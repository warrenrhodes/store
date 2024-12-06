import Blogs from '@/components/Blogs/Index'
import { getAllBlogs } from '@/lib/api/blogs'
import { Suspense } from 'react'

export default async function BlogsPage() {
  const blogsList = await getAllBlogs()

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div>Loading...</div>}>
        <Blogs blogs={blogsList || []} />
      </Suspense>
    </div>
  )
}
