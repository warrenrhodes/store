import { prisma } from '@naturegift/models'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { userId, changes, currentItems } = await request.json()

    // Update wishlist in database
    await prisma.user.update({
      where: { id: userId },
      data: {
        productWishlist: {
          deleteMany: {},
          create: currentItems.map((productId: string) => ({
            productId,
          })),
        },
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error syncing wishlist:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
