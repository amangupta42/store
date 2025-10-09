import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  // Support both DATABASE_URL and TURSO_DATABASE_URL/TURSO_AUTH_TOKEN
  let databaseUrl = process.env.DATABASE_URL || ''

  // If using Vercel Turso integration, construct URL from separate env vars
  if (!databaseUrl && process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN) {
    databaseUrl = `${process.env.TURSO_DATABASE_URL}?authToken=${process.env.TURSO_AUTH_TOKEN}`
  }

  if (databaseUrl.startsWith('libsql://')) {
    // Turso/libSQL configuration
    const adapter = new PrismaLibSQL({ url: databaseUrl })

    return new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })
  } else {
    // Local SQLite configuration
    return new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
