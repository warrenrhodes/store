import { connectToDB } from '@/lib/mongoDB'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

import { shipmentSchema } from '@/lib/validations/shipment'
import { prisma } from '@/lib/prisma'
import { getUserByClerkId } from '@/lib/actions/server'
import z from 'zod'

export const POST = async (req: NextRequest) => {
  try {
    console.log('🟦 [shipment_POST] Step 1: Starting request')

    // Test database connection first
    try {
      await prisma.$connect()
      console.log('✅ [shipment_POST] Database connection successful')
    } catch (dbError) {
      console.error('❌ [shipment_POST] Database connection failed:', dbError)
      throw dbError
    }

    // Step 2: Authentication
    console.log('🟦 [shipment_POST] Step 2: Starting authentication')
    const { userId } = await auth()
    console.log('✅ [shipment_POST] Authentication completed:', { userId })

    if (!userId) {
      console.log('❌ [shipment_POST] No userId found')
      return new NextResponse('Unauthorized', { status: 403 })
    }

    // Step 3: Get user details
    console.log('🟦 [shipment_POST] Step 3: Fetching user details')
    const _currentUser = await getUserByClerkId(userId)
    console.log('✅ [shipment_POST] User details:', {
      found: !!_currentUser,
      userId: _currentUser?.id,
    })

    if (!_currentUser?.id) {
      console.log('❌ [shipment_POST] User not found in database')
      return NextResponse.json({ error: 'User not found in database' }, { status: 401 })
    }

    // Step 4: Parse request body
    console.log('🟦 [shipment_POST] Step 4: Parsing request body')
    const json = await req.json()
    console.log('✅ [shipment_POST] Request body received:', json)

    // Step 5: Validate data
    console.log('🟦 [shipment_POST] Step 5: Validating data')
    const body = shipmentSchema.parse(json)
    console.log('✅ [shipment_POST] Data validation successful')

    // Step 6: Create shipment
    console.log('🟦 [shipment_POST] Step 6: Creating shipment')
    const shipment = await prisma.shipment.create({
      data: {
        ...body,
        creatorId: _currentUser.id,
      },
    })
    console.log('✅ [shipment_POST] Shipment created:', shipment)

    return NextResponse.json(shipment, { status: 201 })
  } catch (err: any) {
    console.error('❌ [shipment_POST] Error details:', {
      name: err.name,
      message: err.message,
      code: err.code,
      stack: err.stack,
      // If it's a Prisma error, it might have additional details
      meta: err.meta,
      // If it's a Zod error, get the format
      issues: err instanceof z.ZodError ? err.issues : undefined,
    })

    if (err instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation Error',
          details: err.issues,
        },
        { status: 400 },
      )
    }

    // Return detailed error message for debugging
    // (you might want to remove sensitive details in production)
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: err instanceof Error ? err.message : 'Unknown error',
        type: err.name,
        code: err.code,
      },
      { status: 500 },
    )
  }
}

export const GET = async () => {
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
