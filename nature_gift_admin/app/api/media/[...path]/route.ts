import { auth } from '@clerk/nextjs/server'
import { createReadStream } from 'fs'
import { stat } from 'fs/promises'
import { lookup } from 'mime-types'
import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path'

export async function GET(request: NextRequest, props: { params: Promise<{ path: string[] }> }) {
  const params = await props.params
  try {
    // Construct the full path to the image
    const imagePath = join(process.cwd(), 'tmp', ...params.path)

    // Check if file exists and get its stats
    const stats = await stat(imagePath)
    if (!stats.isFile()) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const contentType = lookup(imagePath) || 'application/octet-stream'

    const stream = createReadStream(imagePath)

    // Create response headers
    const headers = new Headers({
      'Content-Type': contentType,
      'Content-Length': stats.size.toString(),
      'Cache-Control': 'public, max-age=31536000, immutable', // Optional: Add caching
    })

    // Create and return the streaming response
    return new NextResponse(
      // @ts-ignore - TypeScript doesn't recognize ReadableStream from node
      stream as unknown as ReadableStream,
      {
        headers,
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error serving image:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// You might also want to handle HEAD requests
export async function HEAD(request: NextRequest, props: { params: Promise<{ path: string[] }> }) {
  const params = await props.params
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const imagePath = join(process.cwd(), 'tmp', ...params.path)
    const stats = await stat(imagePath)

    if (!stats.isFile()) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const contentType = lookup(imagePath) || 'application/octet-stream'

    const headers = new Headers({
      'Content-Type': contentType,
      'Content-Length': stats.size.toString(),
      'Cache-Control': 'public, max-age=31536000, immutable',
    })

    return new NextResponse(null, {
      headers,
      status: 200,
    })
  } catch (error) {
    console.error('Error handling HEAD request:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
