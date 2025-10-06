import Link from 'next/link'
import { motion } from 'framer-motion'
import Head from 'next/head'
import PropTypes from 'prop-types'

function Error({ statusCode }) {
  const errorMessages = {
    400: 'Bad Request',
    404: 'Page Not Found',
    500: 'Internal Server Error',
    503: 'Service Unavailable',
  }

  const errorDescriptions = {
    400: 'The request could not be understood by the server.',
    404: "The page you're looking for doesn't exist.",
    500: 'Something went wrong on our end. Please try again later.',
    503: 'The service is temporarily unavailable. Please try again later.',
  }

  const title = errorMessages[statusCode] || 'An error occurred'
  const description = errorDescriptions[statusCode] || 'An unexpected error occurred.'

  return (
    <>
      <Head>
        <title>{statusCode} - {title} | Modern ECommerce Store</title>
        <meta name="description" content={description} />
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
            {statusCode}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-gray-600 mb-8 text-lg"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Link href="/">
              <a className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-xl font-semibold hover:shadow-glow transition-all duration-300 transform hover:scale-105 inline-block">
                Go Home
              </a>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

Error.propTypes = {
  statusCode: PropTypes.number.isRequired,
}

export default Error
