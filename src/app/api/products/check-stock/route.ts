import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const checkStockSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      quantity: z.number().positive(),
    })
  ),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate request body
    const validationResult = checkStockSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.errors },
        { status: 400 }
      )
    }

    const { items } = validationResult.data

    // Check stock for each item
    const stockIssues: Array<{
      productId: string
      requested: number
      available: number
      name: string
    }> = []

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.id },
        select: { id: true, name: true, stock: true },
      })

      if (!product) {
        return NextResponse.json(
          { error: `Product not found: ${item.id}` },
          { status: 404 }
        )
      }

      if (product.stock < item.quantity) {
        stockIssues.push({
          productId: product.id,
          requested: item.quantity,
          available: product.stock,
          name: product.name,
        })
      }
    }

    if (stockIssues.length > 0) {
      return NextResponse.json(
        {
          available: false,
          issues: stockIssues,
        },
        { status: 200 }
      )
    }

    return NextResponse.json({
      available: true,
      message: 'All items are in stock',
    })
  } catch (error) {
    console.error('Error checking stock:', error)
    return NextResponse.json(
      { error: 'Failed to check stock availability' },
      { status: 500 }
    )
  }
}
