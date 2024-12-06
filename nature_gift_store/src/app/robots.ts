import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin'],
    },
    sitemap: `${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL}/sitemap.xml`,
    host: process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL,
  }
}
