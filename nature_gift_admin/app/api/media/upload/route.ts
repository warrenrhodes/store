import { getUserByClerkId } from '@/lib/actions/server'
import { normalizeFileName } from '@/lib/utils/normalize_file_name'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@naturegift/models'
import { MediaType } from '@naturegift/models/generated/client'
import fs from 'fs'
import { writeFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import path from 'path'

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const files = formData.getAll('files')
    if (!files)
      NextResponse.json({ error: 'Internal error. Files image are empty' }, { status: 500 })
    const responses = await Promise.all(
      files.map(async (file: any) => {
        const buffer = Buffer.from(await file.arrayBuffer())
        const userDir = path.join(process.cwd(), 'tmp', userId)

        if (!fs.existsSync(userDir)) {
          fs.mkdirSync(userDir, { recursive: true })
        }
        const fileName = normalizeFileName(file.name)
        const fileDirectory = `${userDir}/${fileName}`

        // Save to your public directory
        await writeFile(fileDirectory, buffer)
        const mediaUrl = `${process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL}/tmp/${userId}/${fileName}`

        const { getPlaiceholder } = await import('plaiceholder')
        const { base64 } = !file.type.startsWith('image/')
          ? { base64: null }
          : await getPlaiceholder(buffer)

        // Save to your media collection in the database using Prisma
        const media = await prisma.media.upsert({
          where: {
            fileName: fileName,
          },
          update: {},
          create: {
            type: file.type.startsWith('image/') ? MediaType.IMAGE : MediaType.VIDEO,
            fileName: fileName,
            url: mediaUrl,
            blurDataUrl: base64,
            creatorId: _currentUser.id,
          },
        })

        return media
      }),
    )

    return NextResponse.json(
      {
        success: true,
        data: {
          files: responses,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('[upload_POST]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
