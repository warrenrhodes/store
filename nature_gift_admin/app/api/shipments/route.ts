import { connectToDB } from '@/lib/mongoDB'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

import { shipmentSchema } from '@/lib/validations/shipment'
import { prisma } from '@naturegift/models'
import { getUserByClerkId } from '@/lib/actions/server'

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectToDB()
    const json = await req.json()
    const body = shipmentSchema.parse(json)

    const shipment = await prisma.shipment.create({
      data: {
        ...body,
        creatorId: _currentUser.id,
      },
    })

    return NextResponse.json(shipment, { status: 200 })
  } catch (err) {
    console.log('[shipment_POST]', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
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

    await connectToDB()

    const shipments = await prisma.shipment.findMany({
      where: {
        creatorId: _currentUser.id,
      },
    })

    return NextResponse.json(shipments, { status: 200 })
  } catch (err) {
    console.log('[shipment_GET]', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
