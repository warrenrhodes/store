import { BlogList } from '@/components/blogs/BlogList'
import { getBlogsCache } from '@/lib/actions/server'

export default async function BlogPage() {
  const blogs = await getBlogsCache()
  return (
    <div className="mx-auto w-full max-w-6xl">
      <BlogList blogs={blogs} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
