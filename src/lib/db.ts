import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  // Support multiple Turso configuration methods
  let databaseUrl = process.env.DATABASE_URL || ''

  // Vercel Turso integration uses DATABASE_TURSO_DATABASE_URL and DATABASE_TURSO_AUTH_TOKEN
  if (process.env.DATABASE_TURSO_DATABASE_URL && process.env.DATABASE_TURSO_AUTH_TOKEN) {
    databaseUrl = `${process.env.DATABASE_TURSO_DATABASE_URL}?authToken=${process.env.DATABASE_TURSO_AUTH_TOKEN}`
  }
  // Also support TURSO_DATABASE_URL/TURSO_AUTH_TOKEN format
  else if (process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN) {
    databaseUrl = `${process.env.TURSO_DATABASE_URL}?authToken=${process.env.TURSO_AUTH_TOKEN}`
  }
  // Or use DIRECT_URL if DATABASE_URL doesn't have auth token
  else if (databaseUrl.startsWith('libsql://') && !databaseUrl.includes('authToken') && process.env.DIRECT_URL) {
    databaseUrl = process.env.DIRECT_URL
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
