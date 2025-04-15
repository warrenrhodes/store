import AdsBlogDetail from '@/components/Blogs/AdsBlockDetail/AdsBlockDetail'
import {
  getAllCollectionCache,
  getDocumentByPathCache,
  getDocumentBySlugCache,
} from '@/lib/api/utils'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { Blog, BlogMetadata, Product, Shipment } from '@/lib/firebase/models'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props) {
  const blog = await getDocumentBySlugCache<Blog>({
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
          url: metadata.coverImage?.url,
        },
      ],
      publishedTime: blog?.publishedAt,
      type: 'article',
    },
  }
}

export default async function BlogAdsDetailPage(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams
  const blog = await getDocumentBySlugCache<Blog>({
    collection: CollectionsName.Blogs,
    slug: params.slug,
  })
  if (!blog) {
    notFound()
  }

  let associateProduct: Product | undefined
  if (blog.associateProductPath) {
    associateProduct = await getDocumentByPathCache<Product>({
      path: blog.associateProductPath ?? '',
    })
  }
  if (searchParams?.product) {
    associateProduct = await getDocumentBySlugCache<Product>({
      slug: searchParams?.product as string,
      collection: CollectionsName.Products,
    })
  }

  const shipments = await getAllCollectionCache<Shipment>({ collection: CollectionsName.Shipments })

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AdsBlogDetail blog={blog} shipments={shipments} associateProduct={associateProduct} />
      </div>
    </div>
  )
}
