import { CollectionsName } from '@/lib/firebase/collection-name'
import { backend } from '@/lib/firebase/firebase-server/firebase'
import { Product } from '@/lib/firebase/models'
import { getDocumentByPathCache } from '@/lib/api/utils'
import { getRegularPrice } from '@/lib/utils/utils'
import { getDatabasePath } from '@spreeloop/database'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const checkoutSchema = z.object({
  id: z.string().regex(/^[\w-]{10,64}$/),
  fullName: z.string().trim().min(2).max(80),
  phone: z
    .string()
    .transform(v => v.replace(/\s+/g, ''))
    .pipe(z.string().regex(/^(?:\+237|237)?6\d{8}$/)),
  location: z.string().max(120).nullish(),
  source: z.string().max(300).nullish(),
  items: z
    .array(
      z.object({
        path: z.string().startsWith(`${CollectionsName.Products}/`),
        quantity: z.number().int().min(1).max(99),
      }),
    )
    .min(1)
    .max(30),
})

/**
 * Abandoned checkout capture (Shopify-style): saved once the customer typed a valid name and
 * phone, so the shop can call back if no order follows. The order API marks it converted.
 * Prices come from the catalogue, not the client. One document per checkout session.
 */
export async function POST(req: NextRequest) {
  const parsed = checkoutSchema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Invalid checkout' }, { status: 400 })
  const { id, fullName, phone, location, source, items } = parsed.data

  const products = await Promise.all(
    items.map(i => getDocumentByPathCache<Product>({ path: i.path })),
  )
  if (products.some(p => !p?.title))
    return NextResponse.json({ error: 'Invalid items' }, { status: 400 })

  const lines = items.map((item, index) => {
    const product = products[index]!
    return {
      productPath: item.path,
      title: product.title,
      quantity: item.quantity,
      price: getRegularPrice(product),
    }
  })
  const ref = backend.db.collection(CollectionsName.Checkouts).doc(id)
  const now = new Date().toISOString()
  try {
    const existing = await ref.get()
    // A converted checkout stays as it is.
    if (existing.get('orderPath')) return NextResponse.json({ ok: true })
    await ref.set(
      {
        fullName,
        phone,
        location: location ?? null,
        source: source ?? null,
        items: lines,
        total: lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
        storeId: products[0]!.storeId ?? null,
        partnersPaths: [
          ...new Set(products.map(p => getDatabasePath(CollectionsName.Users, p!.creatorId))),
        ],
        updatedAt: now,
        ...(existing.exists ? {} : { createdAt: now, orderPath: null, contactedAt: null }),
      },
      { merge: true },
    )
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[CHECKOUTS_POST]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
