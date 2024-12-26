import { getUserByClerkId } from '@/lib/actions/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
export const config = {
  api: {
    bodyParser: false,
  },
}

export const GET = async (req: NextRequest) => {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const media = await prisma.media.findMany({
      where: {
        creatorId: _currentUser.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(media, { status: 200 })
  } catch (err) {
    console.log('[media_GET]', err)
    return new NextResponse(`Internal Error ${err}`, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
