'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Package, Mail, MapPin, Calendar } from 'lucide-react'
import { useCartStore } from '@/store/cart-store'
import { TAX_RATE } from '@/lib/constants'

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface ShippingAddress {
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zipCode: string
}

interface OrderDetails {
  items: OrderItem[]
  subtotal: number
  tax: number
  total: number
  email: string
  shippingAddress: ShippingAddress
  orderDate: string
}

export default function CheckoutSuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart)
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [orderNumber, setOrderNumber] = useState<string>('')

  useEffect(() => {
    // Clear cart on success page load
    clearCart()

    // Get order details from sessionStorage
    const storedOrder = sessionStorage.getItem('lastOrder')
    if (storedOrder) {
      const order = JSON.parse(storedOrder)
      setOrderDetails(order)

      // Generate a random order number for display
      const randomOrderNum = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      setOrderNumber(randomOrderNum)

      // Clear the stored order after loading (prevents showing old orders on refresh)
      // sessionStorage.removeItem('lastOrder')
    }
  }, [clearCart])

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">🛍️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Order Found</h1>
          <p className="text-gray-600 mb-6">
            It looks like you haven't placed an order yet.
          </p>
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-2xl transition-shadow font-semibold"
            >
              Start Shopping
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center"
            >
              <CheckCircle className="w-14 h-14 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Order Confirmed!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 mb-6"
            >
              Thank you for your purchase. Your order has been successfully placed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-block bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl px-6 py-3 border-2 border-blue-200"
            >
              <p className="text-sm text-gray-600 mb-1">Order Number</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {orderNumber}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Package className="w-6 h-6 text-blue-600" />
            Order Details
          </h2>

          {/* Order Items */}
          <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
            {orderDetails.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex gap-4"
              >
                <div className="w-20 h-20 relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex-shrink-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">
                ${orderDetails.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="font-semibold text-green-600">Free</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
              <span className="font-semibold text-gray-900">
                ${orderDetails.tax.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center text-xl font-bold">
            <span>Total Paid</span>
            <span className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ${orderDetails.total.toFixed(2)}
            </span>
          </div>
        </motion.div>

        {/* Delivery Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Information</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-900">{orderDetails.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600">Shipping Address</p>
                <p className="font-semibold text-gray-900">
                  {orderDetails.shippingAddress.firstName} {orderDetails.shippingAddress.lastName}
                </p>
                <p className="text-gray-700">{orderDetails.shippingAddress.address}</p>
                <p className="text-gray-700">
                  {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}{' '}
                  {orderDetails.shippingAddress.zipCode}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600">Order Date</p>
                <p className="font-semibold text-gray-900">{formatDate(orderDetails.orderDate)}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* What's Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100 mb-8"
        >
          <div className="flex items-center justify-center gap-3 text-blue-700 mb-3">
            <Package className="w-6 h-6" />
            <h2 className="text-lg font-semibold">What's Next?</h2>
          </div>
          <p className="text-gray-700 text-center">
            You'll receive an order confirmation email at <strong>{orderDetails.email}</strong> shortly.
            We'll send you another email when your order ships with tracking information.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-2xl transition-shadow font-semibold"
            >
              Continue Shopping
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
