import '../styles/globals.css'
import { useRouter } from 'next/router'
import Layout from '../layouts/layout'
import ErrorBoundary from '../components/ErrorBoundary'
import { ContextProviderComponent } from '../context/mainContext'
import { useEffect } from 'react'

function Ecommerce({ Component, pageProps }) {
  const router = useRouter()

  // Scroll to top on route change
  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <ContextProviderComponent>
      <ErrorBoundary>
        <Layout>
          <Component {...pageProps} key={router.asPath} />
        </Layout>
      </ErrorBoundary>
    </ContextProviderComponent>
  )
}

export default Ecommerce