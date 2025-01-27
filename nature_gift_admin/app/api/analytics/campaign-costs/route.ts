import { getUserByClerkId } from '@/lib/actions/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const campagneCost = await prisma.campaignCost.findMany()

    if (!campagneCost) {
      return NextResponse.json({ error: 'No campagne cost found' }, { status: 404 })
    }

    return NextResponse.json(campagneCost)
  } catch (error) {
    console.error('[CAMPAGNE_COST_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
