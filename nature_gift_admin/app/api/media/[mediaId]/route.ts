import { getUserByClerkId } from '@/lib/actions/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import cloudinary from '@/lib/cloudinary'

export const DELETE = async (req: NextRequest, props: { params: Promise<{ mediaId: string }> }) => {
  const params = await props.params
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const media = await prisma.media.findUnique({
      where: {
        id: params.mediaId,
        creatorId: _currentUser.id,
      },
    })

    if (!media) {
      return new NextResponse(JSON.stringify({ message: 'Media not found' }), {
        status: 404,
      })
    }

    // Delete from Cloudinary if public_id exists
    if (media.cloudinaryPublicId) {
      await cloudinary.uploader.destroy(media.cloudinaryPublicId)
    }

    // Delete media and update products in a transaction
    await prisma.$transaction(
      async (tx: {
        media: { delete: (arg0: { where: { id: string } }) => any }
        mediasOnProducts: { deleteMany: (arg0: { where: { mediaId: string } }) => any }
      }) => {
        await tx.media.delete({
          where: {
            id: params.mediaId,
          },
        })

        await tx.mediasOnProducts.deleteMany({
          where: {
            mediaId: params.mediaId,
          },
        })
      },
    )

    return new NextResponse('Media is deleted', { status: 200 })
  } catch (err) {
    console.log('[mediaId_DELETE]', err)
    return new NextResponse('Internal error', { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export const GET = async (req: NextRequest, props: { params: Promise<{ mediaId: string }> }) => {
  const params = await props.params
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const media = await prisma.media.findUnique({
      where: {
        id: params.mediaId,
        creatorId: _currentUser.id,
      },
    })

    return NextResponse.json({ mediaUrl: media?.url }, { status: 200 })
  } catch (err) {
    console.log('[mediaId_GET]', err)
    return new NextResponse('Internal error', { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
