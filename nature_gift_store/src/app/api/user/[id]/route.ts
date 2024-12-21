import { prisma } from '@naturegift/models'
import { NextResponse } from 'next/server'

export async function GET(request: Request, params: { params: Promise<{ id: string }> }) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: (await params.params).id },
      include: {
        productWishlist: true,
        order: {
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

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: Request, params: { params: Promise<{ id: string }> }) {
  try {
    const data = await request.json()
    const user = await prisma.user.update({
      where: { id: (await params.params).id },
      include: {
        productWishlist: true,
        order: {
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
      data,
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
