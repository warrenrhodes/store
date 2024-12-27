import { getUserByClerkId } from '@/lib/actions/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import cloudinary from '@/lib/cloudinary'

export async function GET(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const url = new URL(request.url)
    const queryParams = new URLSearchParams(url.search)
    const { action, name } = Object.fromEntries(queryParams)

    if (action === 'fileRemove') {
      const media = await prisma.media.findFirst({
        where: {
          fileName: name,
          creatorId: _currentUser.id,
        },
      })

      if (media?.cloudinaryPublicId) {
        await cloudinary.uploader.destroy(media.cloudinaryPublicId)
      }

      await prisma.media.deleteMany({
        where: {
          fileName: name,
          creatorId: _currentUser.id,
        },
      })
    }

    // Fetch user's media from database
    const mediaItems = await prisma.media.findMany({
      where: {
        creatorId: _currentUser.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    const items = mediaItems.map(media => {
      return {
        file: new URL(media.url).pathname,
        changed: media.updatedAt,
        size: 0,
        isImage: media.type === 'IMAGE',
        source: media.url,
        permissions: { read: true },
        name: media.fileName,
        type: media.type.toLowerCase(),
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        sources: [
          {
            path: '',
            baseurl: 'https://res.cloudinary.com',
            files: items,
            name: 'default',
            folders: [],
          },
        ],
        code: 220,
      },
    })
  } catch (error) {
    console.error('File browser error:', error)
    return NextResponse.json({ success: false, message: 'Failed to list files' }, { status: 500 })
  }
}
