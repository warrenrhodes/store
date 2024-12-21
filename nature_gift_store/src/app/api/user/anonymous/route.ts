import { prisma } from '@naturegift/models'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const anonymousUser = await prisma.user.create({
      data: {
        isAnonymous: true,
      },
    })

    return NextResponse.json(anonymousUser)
  } catch (error) {
    console.error('Error creating anonymous user:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
