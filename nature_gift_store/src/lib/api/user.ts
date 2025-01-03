import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export type IUser = Prisma.UserGetPayload<{
  include: {
    productWishlist: true
    orders: {
      include: {
        items: {
          include: {
            product: {
              include: {
                media: {
                  include: {
                    media: true
                  }
                }
              }
            }
          }
        }
        user: true
      }
    }
  }
}>

export async function getUserByClerkId({ clerkId: clerkId }: { clerkId: string }) {
  try {
    const user = prisma.user.findUnique({
      where: {
        clerkId: clerkId,
      },
      include: {
        productWishlist: true,
        orders: {
          include: {
            items: {
              include: {
                product: {
                  include: {
                    media: true,
                  },
                },
              },
            },
            user: true,
          },
        },
      },
    })
    return user
  } catch (error) {
    console.error('Failed to fetch shipments:', error)
    return []
  }
}

export async function geCurrentUser(): Promise<IUser | null> {
  try {
    const result = await fetch('/api/users').then(res => res.json())
    if (!result.ok) {
      return null
    }
    return await result.json()
  } catch (error) {
    console.error('Failed to fetch current user:', error)
    return null
  }
}
