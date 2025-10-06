import Link from 'next/link'
import { motion } from 'framer-motion'
import Head from 'next/head'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | Modern ECommerce Store</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full px-4 text-center"
        >
          <motion.h1
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-9xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4"
          >
            404
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Page Not Found
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-gray-600 mb-8 text-lg"
          >
            The page you're looking for doesn't exist or has been moved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex gap-4 justify-center"
          >
            <Link href="/">
              <a className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-xl font-semibold hover:shadow-glow transition-all duration-300 transform hover:scale-105">
                Go Home
              </a>
            </Link>

            <Link href="/categories">
              <a className="bg-white text-primary px-8 py-3 rounded-xl font-semibold border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105">
                Browse Categories
              </a>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}
