'use client'

import { useProducts } from '@/hooks/use-products'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useCartStore } from '@/store/cart-store'
import { ShoppingCart, Star } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Home() {
  const { data: products, isLoading, error } = useProducts()
  const addItem = useCartStore((state) => state.addItem)

  const handleQuickAdd = (e: React.MouseEvent, product: any) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
    })
    toast.success(`${product.name} added to cart`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl text-gray-600">Loading products...</div>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">😕</div>
          <div className="text-xl text-red-600">Error loading products</div>
        </motion.div>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Discover Amazing Products
        </h2>
        <p className="text-lg text-gray-600">
          {products?.length} carefully curated products just for you
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {products?.map((product, index) => (
          <motion.div key={product.id} variants={itemVariants}>
            <Link href={`/product/${product.slug}`} className="block group">
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
              >
                {/* Featured badge */}
                {product.featured && (
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="absolute top-3 right-3 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg"
                  >
                    <Star className="w-3 h-3 fill-current" />
                    Featured
                  </motion.div>
                )}

                {/* Product Image */}
                <div className="aspect-square relative mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Quick add button */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleQuickAdd(e, product)}
                    className="absolute bottom-3 right-3 bg-blue-600 text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-700"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Product Info */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-blue-600 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center mb-3">
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                    >
                      ${product.price}
                    </motion.span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {product.stock} left
                    </span>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {product.categories.slice(0, 2).map((cat) => (
                      <span
                        key={cat.id}
                        className="text-xs px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full border border-blue-100"
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
