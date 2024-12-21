import { BlogList } from '@/components/blogs/BlogList'
import { getBlogs } from '@/lib/actions/actions'

export default async function BlogPage() {
  const blogs = await getBlogs()
  return (
    <div className="py-10">
      <BlogList blogs={blogs} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
