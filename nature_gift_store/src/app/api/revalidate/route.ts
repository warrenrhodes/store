import { timingSafeEqual } from 'node:crypto'
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

const TAG = /^(store:[\w-]{1,200}|market|stores)$/

/**
 * Called by the admin after each write (docs/MULTI_TENANT_PLAN.md, 3.3): drops the cached
 * storefront reads with these tags at once, instead of after the 5-minute TTL.
 * Body { tags: string[] }, header Authorization: Bearer <REVALIDATE_SECRET>.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET
  const given = req.headers.get('authorization')?.replace(/^Bearer /, '') ?? ''
  if (
    !secret ||
    given.length !== secret.length ||
    !timingSafeEqual(Buffer.from(given), Buffer.from(secret))
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { tags } = await req.json().catch(() => ({}))
  if (
    !Array.isArray(tags) ||
    tags.length === 0 ||
    tags.length > 20 ||
    !tags.every(t => TAG.test(t))
  ) {
    return NextResponse.json({ error: 'Invalid tags' }, { status: 400 })
  }
  for (const tag of tags) revalidateTag(tag, { expire: 0 })
  return NextResponse.json({ revalidated: tags })
}

export const dynamic = 'force-dynamic'
