import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')

    const products = await prisma.product.findMany({
      where: {
        ...(featured === 'true' && { featured: true }),
        ...(category && {
          categories: {
            some: {
              category: {
                slug: category,
              },
            },
          },
        }),
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Transform the data to include category names
    const transformedProducts = products.map((product: { categories: any[] }) => ({
      ...product,
      categories: product.categories.map((pc) => pc.category),
    }))

    return NextResponse.json(transformedProducts)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
