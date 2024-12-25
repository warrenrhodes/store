import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { clerkId, email, fullName, phone, avatar } = await request.json()

    const user = await prisma.user.upsert({
      where: { clerkId },
      update: {
        email,
        fullName,
        phone,
        isAnonymous: false,
        avatar,
      },
      create: {
        clerkId,
        email,
        fullName,
        phone,
        isAnonymous: false,
        avatar,
      },
      include: {
        productWishlist: true,
        orders: {
          include: {
            items: {
              include: {
                product: {
                  include: {
                    media: {
                      include: {
                        media: true,
                      },
                    },
                  },
                },
              },
            },
            user: true,
          },
        },
      },
    })
    return NextResponse.json(user)
  } catch (error) {
    console.error('Error syncing user:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
