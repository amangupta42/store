import '../styles/globals.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import Layout from '../layouts/layout'
import fetchCategories from '../utils/categoryProvider'
import ErrorBoundary from '../components/ErrorBoundary'
import { ContextProviderComponent } from '../context/mainContext'

function Ecommerce({ Component, pageProps, categories }) {
  const router = useRouter()

  return (
    <ContextProviderComponent>
      <ErrorBoundary>
        <Layout categories={categories}>
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

Ecommerce.getInitialProps = async () => {
  const categories = await fetchCategories()
  return {
    categories
  }
}

export default Ecommerce