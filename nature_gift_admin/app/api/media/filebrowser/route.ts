import { auth } from '@clerk/nextjs/server'
import { prisma } from '@naturegift/models'
import fs from 'fs/promises'
import { NextResponse } from 'next/server'
import path from 'path'

export async function GET(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const url = new URL(request.url)
    const queryParams = new URLSearchParams(url.search)

    const { action, name, path: filePath } = Object.fromEntries(queryParams)

    const uploadsDir = path.join(process.cwd(), 'tmp', userId)
    const files = await fs.readdir(uploadsDir)

    if (action === 'fileRemove') {
      await prisma.media.deleteMany({
        where: {
          fileName: name,
        },
      })
      await fs.unlink(path.join(uploadsDir, name))
    }

    const items = await Promise.all(
      files.map(async file => {
        const stats = await fs.stat(path.join(uploadsDir, file))
        return {
          file: file,
          changed: stats.mtime,
          size: stats.size,
          isImage: /\.(jpg|jpeg|png|gif|webp)$/i.test(file),
          source: process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL ?? '-',
          permissions: { read: true },
          name: file,
          type: /\.(jpg|jpeg|png|gif|webp)$/i.test(file) ? 'image' : 'video',
        }
      }),
    )
    return NextResponse.json({
      success: true,
      data: {
        sources: [
          {
            path: `/tmp/${userId}/`,
            baseurl: process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL,
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
