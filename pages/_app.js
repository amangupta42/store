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
          <AnimatePresence initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
            <motion.div
              key={router.asPath}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
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