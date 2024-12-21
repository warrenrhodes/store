import { getUserByClerkId } from '@/lib/actions/actions'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@naturegift/models'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest, { params }: { params: { shipmentId: string } }) => {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const shipment = await prisma.shipment.findUnique({
      where: {
        id: params.shipmentId,
        creatorId: _currentUser.id,
      },
    })

    return NextResponse.json(shipment)
  } catch (error) {
    console.error('[SHIPMENT_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const PATCH = async (req: NextRequest, { params }: { params: { shipmentId: string } }) => {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const json = await req.json()
    const shipment = await prisma.shipment.update({
      where: {
        id: params.shipmentId,
        creatorId: _currentUser.id,
      },
      data: json,
    })

    return NextResponse.json(shipment)
  } catch (error) {
    console.error('[SHIPMENT_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const DELETE = async (req: NextRequest, { params }: { params: { shipmentId: string } }) => {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.shipment.delete({
      where: {
        id: params.shipmentId,
        creatorId: _currentUser.id,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[SHIPMENT_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
