import { absoluteUrl } from '@/lib/site'

/** Crawlers read /robots.txt (the marketplace's) only; a store's is ready for its own host (phase 6). */
export async function GET(_req: Request, props: { params: Promise<{ site: string }> }) {
  const { site } = await props.params
  return new Response(
    `User-agent: *\nAllow: /\nDisallow: /api\nDisallow: /admin\n\nSitemap: ${absoluteUrl(site, '/sitemap.xml')}\n`,
    { headers: { 'Content-Type': 'text/plain' } },
  )
}
