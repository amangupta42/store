import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'

// Create Prisma client with Turso support
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
    })
  } else {
    // Local SQLite configuration
    return new PrismaClient()
  }
}

const prisma = createPrismaClient()

const categories = [
  { name: 'Sofas', slug: 'sofas', image: '/categories/sofas.jpg' },
  { name: 'Chairs', slug: 'chairs', image: '/categories/chairs.jpg' },
  { name: 'Living Room', slug: 'living-room', image: '/categories/living-room.jpg' },
  { name: 'New Arrivals', slug: 'new-arrivals', image: '/categories/new-arrivals.jpg' },
  { name: 'On Sale', slug: 'on-sale', image: '/categories/on-sale.jpg' },
]

const products = [
  {
    name: 'Timber Gray Sofa',
    slug: 'timber-gray-sofa',
    description: 'Stay a while. The Timber charme chocolat sofa is set atop an oak trim and flaunts fluffy leather back and seat cushions.',
    price: 1000.00,
    image: '/products/couch1.png',
    stock: 10,
    featured: true,
    categories: ['sofas', 'new-arrivals'],
  },
  {
    name: 'Galaxy Blue Sofa',
    slug: 'galaxy-blue-sofa',
    description: 'Easy to love. The Sven in birch ivory looks cozy and refined, like a sweater that a fancy lady wears on a coastal vacation.',
    price: 800.00,
    image: '/products/couch2.png',
    stock: 43,
    featured: true,
    categories: ['sofas'],
  },
  {
    name: 'Markus Green Love Seat',
    slug: 'markus-green-love-seat',
    description: "You know your dad's incredible vintage bomber jacket? The Nirvana dakota tan leather sofa is that jacket, but in couch form.",
    price: 900.00,
    image: '/products/couch3.png',
    stock: 2,
    featured: false,
    categories: ['sofas', 'new-arrivals'],
  },
  {
    name: 'Dabit Matte Black',
    slug: 'dabit-matte-black',
    description: "You don't have to go outside to be rugged. Features a sturdy corner-blocked wooden frame and raw seams.",
    price: 1200.00,
    image: '/products/couch4.png',
    stock: 14,
    featured: false,
    categories: ['sofas', 'on-sale'],
  },
  {
    name: 'Carmel Brown Sofa',
    slug: 'carmel-brown-sofa',
    description: 'Full-aniline upholstery will develop a worn-in vintage look. Natural color variations and wrinkles are part of the unique characteristics.',
    price: 1000.00,
    image: '/products/couch5.png',
    stock: 2,
    featured: true,
    categories: ['sofas', 'living-room'],
  },
  {
    name: 'Mod Leather Sofa',
    slug: 'mod-leather-sofa',
    description: 'Tufted bench seat, loose back pillows and bolsters, solid walnut legs, ready to make your apartment the adult oasis you dream of.',
    price: 800.00,
    image: '/products/couch6.png',
    stock: 8,
    featured: false,
    categories: ['sofas', 'new-arrivals'],
  },
  {
    name: 'Thetis Gray Love Seat',
    slug: 'thetis-gray-love-seat',
    description: 'Super-plush down-filled cushions, a corner-blocked wooden frame, and a leather patina that only gets better with age.',
    price: 900.00,
    image: '/products/couch7.png',
    stock: 10,
    featured: false,
    categories: ['sofas', 'new-arrivals'],
  },
  {
    name: 'Sven Tan Matte',
    slug: 'sven-tan-matte',
    description: 'Sturdy corner-blocked wooden frame and raw seams for that vintage look. Becomes more beautiful with use.',
    price: 1200.00,
    image: '/products/couch8.png',
    stock: 7,
    featured: false,
    categories: ['sofas', 'on-sale'],
  },
  {
    name: 'Otis Malt Sofa',
    slug: 'otis-malt-sofa',
    description: 'Cozy in a cottage, cabin, or a condo. The leather becomes more beautiful with use showing character markings.',
    price: 500.00,
    image: '/products/couch9.png',
    stock: 13,
    featured: false,
    categories: ['sofas', 'on-sale'],
  },
  {
    name: 'Ceni Brown 3 Seater',
    slug: 'ceni-brown-3-seater',
    description: 'Features a sturdy corner-blocked wooden frame. Subtle character markings such as insect bites and grain variation.',
    price: 650.00,
    image: '/products/couch10.png',
    stock: 9,
    featured: false,
    categories: ['sofas', 'on-sale'],
  },
  {
    name: 'Jameson Jack Lounger',
    slug: 'jameson-jack-lounger',
    description: 'Perfect for lounging with a book or taking afternoon naps. Premium leather construction with exceptional comfort.',
    price: 1230.00,
    image: '/products/couch11.png',
    stock: 24,
    featured: true,
    categories: ['sofas', 'living-room'],
  },
  {
    name: 'Timber Charcoal Chair',
    slug: 'timber-charcoal-chair',
    description: 'Modern accent chair with clean lines and comfortable cushioning. Perfect for any room.',
    price: 350.00,
    image: '/products/chair1.png',
    stock: 15,
    featured: false,
    categories: ['chairs', 'living-room'],
  },
  {
    name: 'Elegance Wing Chair',
    slug: 'elegance-wing-chair',
    description: 'Classic wingback design with contemporary flair. Ideal for reading nooks.',
    price: 450.00,
    image: '/products/chair2.png',
    stock: 8,
    featured: false,
    categories: ['chairs', 'new-arrivals'],
  },
  {
    name: 'Modern Velvet Chair',
    slug: 'modern-velvet-chair',
    description: 'Luxurious velvet upholstery on a sleek metal frame. Statement piece for modern interiors.',
    price: 520.00,
    image: '/products/chair3.png',
    stock: 12,
    featured: true,
    categories: ['chairs', 'new-arrivals'],
  },
]

async function main() {
  console.log('🌱 Seeding database...')

  // Clean up existing data
  await prisma.productCategory.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.order.deleteMany()

  console.log('✅ Cleaned existing data')

  // Create categories
  const createdCategories = await Promise.all(
    categories.map((category) =>
      prisma.category.create({
        data: category,
      })
    )
  )

  console.log(`✅ Created ${createdCategories.length} categories`)

  // Create products with category relations
  for (const product of products) {
    const { categories: productCategories, ...productData } = product

    const createdProduct = await prisma.product.create({
      data: productData,
    })

    // Link product to categories
    for (const categorySlug of productCategories) {
      const category = createdCategories.find((c) => c.slug === categorySlug)
      if (category) {
        await prisma.productCategory.create({
          data: {
            productId: createdProduct.id,
            categoryId: category.id,
          },
        })
      }
    }
  }

  console.log(`✅ Created ${products.length} products`)

  console.log('🎉 Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
