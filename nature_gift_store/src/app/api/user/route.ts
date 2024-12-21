import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from '@naturegift/models'
import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'

export const GET = async () => {
  try {
    const { userId } = await auth()
    const clerkUser = await currentUser()

    if (!userId || !clerkUser) {
      return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 })
    }
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
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

    // When the user sign-in for the 1st, immediately we will create a new user for them
    if (!user) {
      const newUser = await prisma.user.upsert({
        where: {
          clerkId: userId,
        },
        update: {},
        create: {
          clerkId: userId,
          email: clerkUser.emailAddresses[0].emailAddress,
          fullName: clerkUser.fullName,
          phone: clerkUser.phoneNumbers[0].phoneNumber,
        },
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
      return NextResponse.json(newUser, { status: 200 })
    }

    return NextResponse.json(user, { status: 200 })
  } catch (err) {
    console.log('[users_GET]', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
