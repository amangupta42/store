import '../styles/globals.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import Layout from '../layouts/layout'
import ErrorBoundary from '../components/ErrorBoundary'
import { ContextProviderComponent } from '../context/mainContext'

function Ecommerce({ Component, pageProps }) {
  const router = useRouter()

  return (
    <ContextProviderComponent>
      <ErrorBoundary>
        <Layout>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={router.asPath}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </Layout>
      </ErrorBoundary>
    </ContextProviderComponent>
  )
}

export default Ecommerce