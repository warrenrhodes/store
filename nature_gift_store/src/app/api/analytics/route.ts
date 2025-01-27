import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { id, ...visit } = await request.json()
  console.log(visit)
  try {
    const result = await prisma.pageView.create({
      data: visit,
    })
    if (!result) {
      return NextResponse.json({ error: 'Failed to create visit' }, { status: 500 })
    }
    return NextResponse.json(result, { status: 200 })
  } catch (err) {
    console.log('[ANALYTICS_GET]', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
