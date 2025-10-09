import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Define a simple interface for category
interface CategoryData {
  id: string;
  name: string;
  slug: string;
  image: string | null;
}

// Define the ProductCategory interface
interface ProductCategory {
  category: CategoryData;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = await prisma.product.findUnique({
      where: {
        slug,
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Transform the data to include category names
    const transformedProduct = {
      ...product,
      categories: product.categories.map((pc: ProductCategory) => pc.category),
    }

    return NextResponse.json(transformedProduct)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}
