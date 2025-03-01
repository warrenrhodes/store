import Blogs from '@/components/Blogs/Index'
import { getAllCollection } from '@/lib/api/utils'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { Blog, BlogStatus } from '@/lib/firebase/models'
import { QueryFilter } from '@spreeloop/database'
import { Suspense } from 'react'

export default async function BlogsPage() {
  const blogsList = await getAllCollection<Blog>({
    collection: CollectionsName.Blogs,
    filters: [new QueryFilter('status', '==', BlogStatus.PUBLISHED)],
  })

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div>Loading...</div>}>
        <Blogs blogs={blogsList || []} />
      </Suspense>
    </div>
  )
}
