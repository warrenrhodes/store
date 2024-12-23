import { fetchAllBlogs } from '@/lib/api/blogs'
import { getProducts } from '@/lib/api/products'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts()
  const blogs = await fetchAllBlogs()

  const postEntries: MetadataRoute.Sitemap =
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

  return [...postEntries, ...blogsEntries]
}
