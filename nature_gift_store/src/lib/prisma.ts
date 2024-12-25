import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  // Add this check
  if (typeof window !== 'undefined') {
    console.trace('🚨 Attempting to use Prisma Client on the browser')
    throw new Error('Prisma Client cannot be used on the browser')
  }

  const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasourceUrl: process.env.DATABASE_URL,
  })

  return client
}

declare global {
  let prisma: ReturnType<typeof prismaClientSingleton> | undefined
}

const globalForPrisma = global as { prisma?: ReturnType<typeof prismaClientSingleton> }
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
