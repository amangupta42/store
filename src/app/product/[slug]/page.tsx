'use client'

import { useProduct } from '@/hooks/use-products'
import { useCartStore } from '@/store/cart-store'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ShoppingCart, ArrowLeft, Package, Star, Heart, Share2, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string

  const { data: product, isLoading, error } = useProduct(slug)
  const addItem = useCartStore((state) => state.addItem)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          slug: product.slug,
        })
      }
      toast.success(`${quantity} x ${product.name} added to cart`)
    }
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
          <div className="text-xl text-gray-600">Loading product...</div>
        </motion.div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
          <p className="text-gray-600 mb-8">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow"
          >
            View All Products
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="aspect-square relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsWishlisted(!isWishlisted)
                toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist")
              }}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-colors ${isWishlisted
                  ? 'bg-red-50 border-red-300 text-red-600'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-600'
                }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              Wishlist
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toast.success('Share link copied!')}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 rounded-xl transition-colors"
            >
              <Share2 className="w-5 h-5" />
              Share
            </motion.button>
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex gap-2 flex-wrap mb-4">
            {product.categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="text-sm px-4 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full hover:shadow-md transition-shadow border border-blue-100"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            {product.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ${product.price}
            </span>
            {product.stock > 0 ? (
              <span className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full border border-green-200">
                <Check className="w-5 h-5" />
                {product.stock} in stock
              </span>
            ) : (
              <span className="text-red-600 font-medium bg-red-50 px-4 py-2 rounded-full border border-red-200">
                Out of stock
              </span>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-700 text-lg leading-relaxed mb-8 bg-gray-50 p-6 rounded-xl"
          >
            {product.description}
          </motion.p>

          {product.featured && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-yellow-50 to-orange-50 text-yellow-800 rounded-xl mb-6 border border-yellow-200"
            >
              <Star className="w-5 h-5 fill-current" />
              <span className="font-semibold">Featured Product</span>
            </motion.div>
          )}

          {/* Quantity Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-6"
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 flex items-center justify-center bg-white border-2 border-gray-200 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-colors font-bold text-xl"
              >
                -
              </button>
              <span className="w-16 text-center text-2xl font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-12 h-12 flex items-center justify-center bg-white border-2 border-gray-200 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-colors font-bold text-xl"
              >
                +
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-2xl transition-all font-semibold text-lg disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-6 h-6" />
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </motion.button>

            <Link href="/cart">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block w-full text-center px-8 py-5 border-2 border-gray-200 text-gray-700 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all font-semibold text-lg"
              >
                View Cart
              </motion.div>
            </Link>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 border-t pt-8"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Package className="w-6 h-6 text-blue-600" />
              Product Details
            </h3>
            <dl className="space-y-4 bg-gray-50 p-6 rounded-xl">
              <div className="flex justify-between items-center">
                <dt className="text-gray-600 font-medium">Product ID</dt>
                <dd className="text-gray-900 font-semibold bg-white px-3 py-1 rounded-lg border border-gray-200">
                  {product.id.slice(0, 8)}
                </dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-gray-600 font-medium">Availability</dt>
                <dd className={`font-semibold px-3 py-1 rounded-lg ${product.stock > 0
                    ? 'text-green-700 bg-green-50 border border-green-200'
                    : 'text-red-700 bg-red-50 border border-red-200'
                  }`}>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-gray-600 font-medium">Categories</dt>
                <dd className="text-gray-900 font-semibold">
                  {product.categories.map(cat => cat.name).join(', ')}
                </dd>
              </div>
            </dl>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
