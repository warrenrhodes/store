import { getAllCollectionCache, getSiteContext, getStoreCache } from '@/lib/api/utils'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { Blog, BlogStatus, Product, ProductStatus } from '@/lib/firebase/models'
import { absoluteUrl } from '@/lib/site'
import { QueryFilter } from '@spreeloop/database'

const escape = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * A store's sitemap lists its own pages only. The marketplace's lists its pages and the listed
 * products at their canonical address, in their store (/boutique/<slug>/shop/...).
 */
export async function GET(_req: Request, props: { params: Promise<{ site: string }> }) {
  const { site } = await props.params
  const ctx = await getSiteContext(site)
  if (!ctx) return new Response('Not found', { status: 404 })
  const storeId = ctx.store?.id ?? null
  const [products, blogs] = await Promise.all([
    getAllCollectionCache<Product>({
      collection: CollectionsName.Products,
      storeId,
      filters: [
        new QueryFilter('status', '==', ProductStatus.PUBLISHED),
        new QueryFilter('visibility', '==', true),
      ],
    }),
    getAllCollectionCache<Blog>({
      collection: CollectionsName.Blogs,
      storeId,
      filters: [new QueryFilter('status', '==', BlogStatus.PUBLISHED)],
    }),
  ])
  const slugOf = async (id?: string | null) =>
    id ? ((await getStoreCache(id))?.slug ?? site) : site
  const entries = [
    ...['/', '/shop', '/blogs'].map(path => ({ url: absoluteUrl(site, path), at: undefined })),
    ...(await Promise.all(
      products.map(async p => ({
        url: absoluteUrl(ctx.store ? site : await slugOf(p.storeId), `/shop/${p.slug}`),
        at: p.updatedAt,
      })),
    )),
    ...blogs.map(b => ({ url: absoluteUrl(site, `/blogs/${b.slug}`), at: b.updatedAt })),
  ]
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    entries
      .map(
        e =>
          `<url><loc>${escape(e.url)}</loc>${e.at ? `<lastmod>${new Date(e.at).toISOString()}</lastmod>` : ''}</url>`,
      )
      .join('\n') +
    '\n</urlset>\n'
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } })
}

export const dynamic = 'force-dynamic'
