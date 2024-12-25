import { fetchAllBlogs, IBlog } from '@/lib/api/blogs'
import { getProducts, IProduct } from '@/lib/api/products'
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
  if (process.env.NEXT_BUILD_TIME === 'true') {
    return staticUrls
  }
  try {
    // Fetch dynamic data with timeout
    const [products, blogs] = await Promise.all([
      Promise.race([
        getProducts(),
        new Promise<IProduct[]>((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), 5000),
        ),
      ]),
      Promise.race([
        fetchAllBlogs(),
        new Promise<IBlog[]>((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000)),
      ]),
    ]).catch(() => [[], []] as [IProduct[], IBlog[]])

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
