import { normalizeFileName } from '@/lib/utils/normalize_file_name'
import { NextResponse } from 'next/server'
import cloudinary from '@/lib/cloudinary'
import { v4 as uuidv4 } from 'uuid'
import { randomBytes } from 'node:crypto'
import { requireStore } from '@/lib/tenant'
import { Media, MediaType } from '@/lib/firebase/models'

const MB = 1024 * 1024
/** Images and videos only, each under its size limit. */
const LIMITS = { image: 10 * MB, video: 100 * MB }
const MAX_FILES = 10

const kindOf = (file: File) =>
  file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : null

/**
 * Uploads to the platform's Cloudinary, for members of a store only, into the store's folder
 * (stores/<storeId>). Each file gets its own id (name + random suffix): never overwrites another.
 */
export async function POST(request: Request) {
  const ctx = await requireStore().catch(() => null)
  if (!ctx) return new NextResponse('Unauthorized', { status: 403 })

  const files = (await request.formData()).getAll('files')
  if (files.length === 0 || files.length > MAX_FILES || !files.every(f => f instanceof File)) {
    return NextResponse.json({ error: `Send 1 to ${MAX_FILES} files.` }, { status: 400 })
  }
  for (const file of files as File[]) {
    const kind = kindOf(file)
    if (!kind) {
      return NextResponse.json({ error: `${file.name}: images and videos only.` }, { status: 400 })
    }
    if (file.size > LIMITS[kind]) {
      return NextResponse.json(
        { error: `${file.name}: over ${LIMITS[kind] / MB} MB.` },
        { status: 400 },
      )
    }
  }

  try {
    const responses = await Promise.all(
      (files as File[]).map(async file => {
        const buffer = Buffer.from(await file.arrayBuffer())
        const fileName = normalizeFileName(file.name)
        const base = fileName.replace(/\.[^.]*$/, '').slice(0, 80) || 'media'
        const kind = kindOf(file)!

        const uploadResponse = await new Promise<{ secure_url: string }>((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: `stores/${ctx.storeId}`,
                public_id: `${base}-${randomBytes(4).toString('hex')}`,
                overwrite: false,
                resource_type: kind,
              },
              (error, result) => {
                if (error || !result) {
                  console.error('Cloudinary upload error:', error)
                  reject(error)
                } else {
                  resolve(result)
                }
              },
            )
            .end(buffer)
        })
        const mediaUrl = uploadResponse.secure_url

        // Generate blur data URL for images
        const { getPlaiceholder } = await import('plaiceholder')
        const { base64 } = kind === 'image' ? await getPlaiceholder(buffer) : { base64: null }

        const media: Media = {
          type: kind === 'image' ? MediaType.IMAGE : MediaType.VIDEO,
          fileName: fileName,
          url: mediaUrl,
          blurDataUrl: base64,
        }
        return media
      }),
    )

    const uploadSource = request.headers.get('X-Upload-Source')
    if (uploadSource === 'froala-editor') {
      return NextResponse.json({
        link: responses[0].url,
      })
    }
    if (uploadSource === 'jodit-editor') {
      return NextResponse.json(
        {
          success: true,
          files: responses.map(file => {
            return {
              file: {
                name: file.fileName,
                url: file.url,
                id: uuidv4(),
              },
            }
          }),
        },
        { status: 200 },
      )
    }
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
  }
}
