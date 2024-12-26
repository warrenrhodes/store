import { PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

const MAX_RETRIES = 5
const RETRY_DELAY = 1000

// const prismaClientSingleton = () => {
//   // Add this check
//   if (typeof window !== 'undefined') {
//     console.trace('🚨 Attempting to use Prisma Client on the browser')
//     throw new Error('Prisma Client cannot be used on the browser')
//   }

//   const client = new PrismaClient({
//     log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
//     datasourceUrl: process.env.DATABASE_URL,
//   })

//   return client
// }

function createPrismaClient() {
  if (typeof window !== 'undefined') {
    console.trace('🚨 Attempting to use Prisma Client on the browser')
    throw new Error('Prisma Client cannot be used on the browser')
  }

  const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasourceUrl: process.env.DATABASE_URL,
  })

  prisma.$use(async (params, next) => {
    let attempts = 0
    while (attempts < MAX_RETRIES) {
      try {
        return await next(params)
      } catch (error) {
        attempts++
        if (
          error instanceof PrismaClientKnownRequestError &&
          (error.code === 'P1001' || error.code === 'P1002')
        ) {
          console.log(`Connection failed. Retrying (${attempts}/${MAX_RETRIES})...`)
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * Math.pow(2, attempts - 1)))
        } else {
          throw error
        }
      }
    }
    throw new Error('Max retry attempts reached')
  })

  return prisma
}

declare global {
  let prisma: ReturnType<typeof createPrismaClient> | undefined
}

const globalForPrisma = global as { prisma?: ReturnType<typeof createPrismaClient> }
export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
