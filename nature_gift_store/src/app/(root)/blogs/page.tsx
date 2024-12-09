import Blogs from '@/components/Blogs/Index'
import { fetchAllBlogs } from '@/lib/api/blogs'
import { Suspense } from 'react'

export default async function BlogsPage() {
  const blogsList = await fetchAllBlogs()

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div>Loading...</div>}>
        <Blogs blogs={blogsList || []} />
      </Suspense>
    </div>
  )
}
