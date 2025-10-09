'use client'

import { useCartStore } from '@/store/cart-store'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCartStore()

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity)
    toast.success('Cart updated')
  }

  const handleRemove = (id: string, name: string) => {
    removeItem(id)
    toast.success(`${name} removed from cart`)
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ShoppingBag className="w-32 h-32 mx-auto text-gray-300 mb-6" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
          <p className="text-gray-600 mb-8 text-lg">Add some amazing products to get started</p>
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-2xl transition-shadow font-semibold"
            >
              Continue Shopping
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Shopping Cart
        </h1>
        <p className="text-gray-600">{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50, height: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                layout
                className="bg-white rounded-2xl p-5 flex gap-4 shadow-md hover:shadow-xl transition-shadow border border-gray-100"
              >
                <Link href={`/product/${item.slug}`} className="flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-28 h-28 relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </Link>

                <div className="flex-1 min-w-0">
                  <Link
                    href={`/product/${item.slug}`}
                    className="font-bold text-gray-900 hover:text-blue-600 transition-colors text-lg block mb-1"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                    ${item.price}
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                      <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: '#f3f4f6' }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-2.5 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </motion.button>
                      <span className="px-5 py-2 font-bold text-lg">{item.quantity}</span>
                      <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: '#f3f4f6' }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-2.5 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </motion.button>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRemove(item.id, item.name)}
                      className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                <div className="text-right">
                  <motion.p
                    key={item.quantity}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-2xl font-bold text-gray-900"
                  >
                    ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              clearCart()
              toast.success('Cart cleared')
            }}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors text-sm font-semibold"
          >
            Clear Cart
          </motion.button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg sticky top-20 border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Tag className="w-6 h-6 text-blue-600" />
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <motion.span
                  key={getTotal()}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="font-semibold text-gray-900"
                >
                  ${getTotal().toFixed(2)}
                </motion.span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (10%)</span>
                <motion.span
                  key={getTotal()}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="font-semibold text-gray-900"
                >
                  ${(getTotal() * 0.1).toFixed(2)}
                </motion.span>
              </div>
            </div>

            <div className="border-t-2 border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">Total</span>
                <motion.span
                  key={getTotal()}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  ${(getTotal() * 1.1).toFixed(2)}
                </motion.span>
              </div>
            </div>

            <Link href="/checkout">
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="block w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center rounded-xl hover:shadow-2xl transition-shadow font-bold text-lg mb-3"
              >
                Proceed to Checkout
              </motion.div>
            </Link>

            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block w-full py-4 border-2 border-gray-200 text-gray-700 text-center rounded-xl hover:border-blue-600 hover:text-blue-600 transition-colors font-semibold"
              >
                Continue Shopping
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
