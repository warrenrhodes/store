import { getUserByClerkId } from '@/lib/actions/server'
import { normalizeFileName } from '@/lib/utils/normalize_file_name'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import cloudinary from '@/lib/cloudinary'
import { MediaType } from '@prisma/client'
import { prisma } from '@/lib/prisma'

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
        const fileName = normalizeFileName(file.name)

        const existentMedia = await prisma.media.findFirst({
          where: {
            fileName: fileName,
            creatorId: _currentUser.id,
          },
        })

        if (existentMedia) {
          return existentMedia
        }

        // Upload to Cloudinary
        const uploadResponse = await new Promise(async (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: `users/${userId}`,
                public_id: fileName.split('.')[0], // Remove extension from public_id
                resource_type: 'auto',
              },
              (error, result) => {
                if (error) {
                  console.error('Cloudinary upload error:', error)
                  reject(error)
                } else {
                  resolve(result)
                }
              },
            )
            .end(buffer)
        })

        const cloudinaryResponse = uploadResponse as any
        const mediaUrl = cloudinaryResponse.secure_url

        // Generate blur data URL for images
        const { getPlaiceholder } = await import('plaiceholder')
        const { base64 } = !file.type.startsWith('image/')
          ? { base64: null }
          : await getPlaiceholder(buffer)

        // Save to database
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
            cloudinaryPublicId: cloudinaryResponse.public_id,
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
