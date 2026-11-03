import { CollectionsName } from '@/lib/firebase/collection-name'
import { backend } from '@/lib/firebase/firebase-server/firebase'
import { OrderStatus, ReviewStatus } from '@/lib/firebase/models'
import { getTrackedOrder } from '@/lib/orders/tracking'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const reviewSchema = z.object({
  orderId: z.string(),
  token: z.string(),
  productPath: z.string().startsWith(`${CollectionsName.Products}/`),
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().min(3).max(1000),
})

/**
 * Verified review: only from the tracking link of a delivered order, once per product.
 * Saved as PENDING; the shop approves it in the admin before it shows.
 */
export async function POST(req: NextRequest) {
  const parsed = reviewSchema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Invalid review' }, { status: 400 })
  const { orderId, token, productPath, rating, comment } = parsed.data

  const order = await getTrackedOrder(orderId, token)
  if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (order.status !== OrderStatus.COMPLETED) {
    return NextResponse.json({ error: 'Order not delivered' }, { status: 409 })
  }
  const item = order.items.find(i => i.product.path === productPath)
  if (!item) return NextResponse.json({ error: 'Not in order' }, { status: 400 })

  // One review per product and order: the id makes a second submission a no-op.
  const ref = backend.db
    .collection(CollectionsName.Reviews)
    .doc(`${orderId}_${productPath.split('/').pop()}`)
  const [firstName, lastName] = (order.userData?.fullName ?? '').trim().split(/\s+/)
  const now = new Date().toISOString()
  try {
    await ref.create({
      productPath,
      blogPath: null,
      userName:
        [firstName, lastName ? `${lastName[0]}.` : ''].filter(Boolean).join(' ') || 'Client',
      rating,
      comment,
      imageUrl: null,
      helpful: 0,
      notHelpful: 0,
      verify: true,
      status: ReviewStatus.PENDING,
      orderPath: order.path,
      storeId: order.storeId ?? item.product.storeId ?? null,
      createdAt: now,
      updatedAt: now,
    })
  } catch (error) {
    if ((error as { code?: number }).code === 6) return NextResponse.json({ ok: true }) // ALREADY_EXISTS
    console.error('[REVIEWS_POST]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
  return NextResponse.json({ ok: true }, { status: 201 })
}

export const dynamic = 'force-dynamic'
