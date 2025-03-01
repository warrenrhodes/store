import { getAllCollection } from '@/lib/api/utils'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { Blog, BlogStatus, Product, ProductStatus } from '@/lib/firebase/models'
import { QueryFilter } from '@spreeloop/database'
import { MetadataRoute } from 'next'
// Default static URLs that are always present
const staticUrls: MetadataRoute.Sitemap = [
  {
    url: `${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  },
  {
    url: `${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL}/shop`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  },
  {
    url: `${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL}/blogs`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Fetch dynamic data with timeout
    const [products, blogs] = await Promise.all([
      Promise.race([
        getAllCollection<Product>({
          collection: CollectionsName.Products,
          filters: [
            new QueryFilter('status', '==', ProductStatus.PUBLISHED),
            new QueryFilter('visibility', '==', true),
          ],
        }),
        new Promise<Product[]>((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000)),
      ]),
      Promise.race([
        getAllCollection<Blog>({
          collection: CollectionsName.Blogs,
          filters: [new QueryFilter('status', '==', BlogStatus.PUBLISHED)],
        }),
        new Promise<Blog[]>((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000)),
      ]),
    ]).catch(() => [[], []] as [Product[], Blog[]])

    const productEntries: MetadataRoute.Sitemap =
      products?.map(e => ({
        url: `${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL}/shop/${e.slug}`,
        lastModified: new Date(e.updatedAt || new Date()),
        changeFrequency: 'hourly',
        priority: 0.7,
      })) || []

    const blogsEntries: MetadataRoute.Sitemap =
      blogs?.map(e => ({
        url: `${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL}/blogs/${e.slug}`,
        lastModified: new Date(e.updatedAt || new Date()),
        changeFrequency: 'hourly',
        priority: 0.7,
      })) || []

    return [...staticUrls, ...productEntries, ...blogsEntries]
  } catch (error) {
    // If there's any error, return static URLs
    console.error('Error generating sitemap:', error)
    return staticUrls
  }
}
