import { normalizeFileName } from '@/lib/utils/normalize_file_name'
import { auth, reverificationErrorResponse } from '@clerk/nextjs/server'
import { prisma } from '@naturegift/models'
import { MediaType } from '@naturegift/models/generated/client'
import fs from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export const config = {
  api: {
    bodyParser: false,
  },
}

export const POST = async (req: Request) => {
  try {
    const { userId, has } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!has({ reverification: 'strict' })) {
      return reverificationErrorResponse('strict')
    }

    const formData = await req.formData()
    const file = formData.get('file')

    if (!file) {
      return new NextResponse(`Invalid file`, { status: 500 })
    }
    const convertFile = file as File
    const userDir = path.join(process.cwd(), 'tmp', userId)
    const fileName = normalizeFileName(convertFile.name)

    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true })
    }
    const data = await convertFile.arrayBuffer()

    fs.writeFileSync(`${userDir}/${fileName}`, Buffer.from(data))

    // Create or update media record in database using Prisma upsert
    const media = await prisma.media.upsert({
      where: {
        fileName: fileName,
      },
      update: {},
      create: {
        type: convertFile.type.startsWith('image/') ? MediaType.IMAGE : MediaType.VIDEO,
        fileName: fileName,
        url: `${process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL}/tmp/${userId}/${fileName}`,
      },
    })

    return NextResponse.json({ url: media.id }, { status: 200 })
  } catch (err) {
    console.log('[media_POST]', err)
    return new NextResponse(`Internal Error, ${err}`, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export const GET = async (req: NextRequest) => {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const media = await prisma.media.findMany({
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
