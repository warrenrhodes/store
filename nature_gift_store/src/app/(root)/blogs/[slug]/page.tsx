import BlogDetail from '@/components/Blogs/BlockDetail/BlockDetail'
import { fetchBlogBySlug, fetchRelatedBlogs } from '@/lib/api/blogs'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ slug: string }>
}
export async function generateMetadata({ params }: Props) {
  const blog = await fetchBlogBySlug((await params).slug)
  return {
    title: blog?.title,
    description: blog?.content.type === 'TEXT' && blog?.content.content,
    keywords: blog?.tags,
    openGraph: {
      images: [
        {
          url: blog?.metadata.coverImageURL,
        },
      ],
    },
  }
}

export default async function BlogDetailPage(props: Props) {
  const params = await props.params
  const blog = await fetchBlogBySlug(params.slug)
  const relatedBlogs = await fetchRelatedBlogs(params.slug)

  if (!blog) {
    notFound()
  }
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BlogDetail blog={blog} relatedBlogs={relatedBlogs || []} />
      </div>
    </div>
  )
}
