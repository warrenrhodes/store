import { CollectionsName } from '@/lib/firebase/collection-name'
import { backend } from '@/lib/firebase/firebase-server/firebase'
import { Product } from '@/lib/firebase/models'
import { getDocumentByPathCache } from '@/lib/api/utils'
import { checkoutDocId, resolveCartGroups } from '@/lib/api/cart-store'
import { getStorePixels, requestSignals, sendMetaEvent } from '@/lib/analytics/meta-capi'
import { getRegularPrice } from '@/lib/utils/utils'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const checkoutSchema = z.object({
  site: z.string().max(60).optional(),
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
  const { id, fullName, phone, location, source, items, site } = parsed.data

  const products = await Promise.all(
    items.map(i => getDocumentByPathCache<Product>({ path: i.path })),
  )
  if (products.some(p => !p?.title))
    return NextResponse.json({ error: 'Invalid items' }, { status: 400 })
  // One document per store of the cart (a mixed marketplace cart: one per store), each in
  // its store's abandoned checkouts.
  const resolved = await resolveCartGroups(site, products as Product[])
  if ('error' in resolved) return NextResponse.json({ error: 'Invalid items' }, { status: 400 })

  const now = new Date().toISOString()
  try {
    for (const { store, indexes } of resolved.groups) {
      const lines = indexes.map(index => ({
        productPath: items[index].path,
        title: products[index]!.title,
        quantity: items[index].quantity,
        price: getRegularPrice(products[index]!),
      }))
      const ref = backend.db
        .collection(CollectionsName.Checkouts)
        .doc(checkoutDocId(id, store.id, resolved.groups.length))
      const existing = await ref.get()
      // A converted checkout stays as it is.
      if (existing.get('orderPath')) continue
      // The first time the customer is known (name and phone typed): the store's InitiateCheckout,
      // with their data, deduplicated with the browser's event by the checkout session id.
      if (!existing.exists) {
        await sendMetaEvent(await getStorePixels(store), {
          name: 'InitiateCheckout',
          eventId: id,
          value: lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
          contents: lines.map(l => ({
            id: l.productPath.split('/').pop()!,
            quantity: l.quantity,
            item_price: l.price,
          })),
          phone,
          fullName,
          ...requestSignals(req),
        })
      }
      await ref.set(
        {
          fullName,
          phone,
          location: location ?? null,
          source: source ?? null,
          items: lines,
          total: lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
          storeId: store.id,
          updatedAt: now,
          ...(existing.exists ? {} : { createdAt: now, orderPath: null, contactedAt: null }),
        },
        { merge: true },
      )
    }
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[CHECKOUTS_POST]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
