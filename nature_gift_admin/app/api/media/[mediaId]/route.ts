import { getUserByClerkId } from '@/lib/actions/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import fs from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

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

    // Delete media and update products in a transaction
    await prisma.$transaction(
      async (tx: {
        media: { delete: (arg0: { where: { id: string } }) => any }
        mediasOnProducts: { deleteMany: (arg0: { where: { mediaId: string } }) => any }
      }) => {
        // Delete the media
        await tx.media.delete({
          where: {
            id: params.mediaId,
          },
        })

        // Update products that reference this media
        await tx.mediasOnProducts.deleteMany({
          where: {
            mediaId: params.mediaId,
          },
        })
      },
    )

    const userDir = path.join(process.cwd(), 'tmp', userId)
    if (!fs.existsSync(userDir)) {
      return new NextResponse('Internal error', { status: 500 })
    }

    // Deletes the local file
    const filePath = path.join(process.cwd(), 'tmp', userId, media.fileName)
    fs.unlinkSync(filePath)

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
