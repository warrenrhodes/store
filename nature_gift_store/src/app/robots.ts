import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/shop', '/blogs'],
      disallow: ['/admin', '/api'],
    },
    sitemap: `${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL}/sitemap.xml`,
    host: new URL(`${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL}`).host,
  }
}
