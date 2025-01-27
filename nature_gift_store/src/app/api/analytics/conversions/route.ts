import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const conversion = await request.json()

  try {
    const result = await prisma.conversion.create({
      data: conversion,
    })
    if (!result) {
      return NextResponse.json({ error: 'Failed to create the conversion' }, { status: 500 })
    }
    return NextResponse.json(result, { status: 200 })
  } catch (err) {
    console.log('[CONVERSATION_GET]', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
