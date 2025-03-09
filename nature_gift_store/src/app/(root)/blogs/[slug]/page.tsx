import BlogDetail from '@/components/Blogs/BlockDetail/BlockDetail'
import { getAllRelatedCollection, getDocumentBySlug } from '@/lib/api/utils'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { Blog, BlogMetadata, BlogStatus } from '@/lib/firebase/models'
import { QueryFilter } from '@spreeloop/database'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ slug: string }>
}

// export async function generateStaticParams() {
//   const blogs = await getAllCollection<Blog>({
//     collection: CollectionsName.Blogs,
//     filters: [new QueryFilter('status', '==', BlogStatus.PUBLISHED)],
//   })

//   return blogs.map(post => ({
//     slug: post.slug,
//   }))
// }
export async function generateMetadata({ params }: Props) {
  const blog = await getDocumentBySlug<Blog>({
    collection: CollectionsName.Blogs,
    slug: (await params).slug,
  })
  const metadata = blog?.metadata as undefined | BlogMetadata
  return {
    applicationName: 'Nature Gift',
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    authors: [{ name: metadata.author.name, url: metadata.author.avatar }],
    creator: metadata.author.name,
    publisher: metadata.author.name,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL,
      siteName: 'Nature Gift',
      images: [
        {
          url: metadata.coverImage.url,
        },
      ],
      publishedTime: blog?.publishedAt,
      type: 'article',
    },
  }
}

export default async function BlogDetailPage(props: Props) {
  const params = await props.params
  const blog = await getDocumentBySlug<Blog>({
    collection: CollectionsName.Blogs,
    slug: params.slug,
  })
  if (!blog) {
    notFound()
  }

  const allBlog = await getAllRelatedCollection<Blog>({
    collection: CollectionsName.Blogs,
    slug: params.slug,
    filters: [new QueryFilter('status', '==', BlogStatus.PUBLISHED)],
  })
  const relatedBlogs = allBlog.filter(e =>
    e.categories.some(category => blog.categories.includes(category)),
  )
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BlogDetail blog={blog} relatedBlogs={relatedBlogs || []} />
      </div>
    </div>
  )
}
