import Head from 'next/head'
import { motion } from 'framer-motion'
import ListItem from '../../components/ListItem'
import { titleIfy, slugify } from '../../utils/helpers'
import inventoryForCategory from '../../utils/inventoryForCategory'
import { logDataFetch, logError, debugLog } from '../../utils/debug'

const Category = (props) => {
  const { inventory = [], title = 'Category' } = props

  // Defensive check for missing data
  if (!Array.isArray(inventory) || inventory.length === 0) {
    debugLog('Category page: No inventory data', {
      inventoryLength: inventory?.length || 0,
      isArray: Array.isArray(inventory),
      title
    })
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Head>
          <title>{titleIfy(title)}</title>
          <meta name="description" content={`Browse ${title} products`} />
          <meta property="og:title" content={titleIfy(title)} key="title" />
        </Head>
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            No Products Found
          </h1>
          <p className="text-gray-600">This category is currently empty. Please check back later.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{titleIfy(title)}</title>
        <meta name="description" content={`Browse ${title} products`} />
        <meta property="og:title" content={titleIfy(title)} key="title" />
      </Head>
      <div className="flex flex-col items-center">
        <div className="max-w-fw flex flex-col w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-4 sm:pt-10 pb-8"
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{titleIfy(title)}</h1>
            <p className="text-gray-600 mt-4">{inventory.length} products in this category</p>
          </motion.div>

          <div>
            <div className="flex flex-1 flex-wrap flex-row">
              {
                inventory.filter(Boolean).map((item, index) => {
                  if (!item || !item.name) {
                    debugLog('Category page: Skipping invalid item', { item, index })
                    return null
                  }
                  return (
                    <motion.div
                      key={item.id || index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="w-full md:w-1/2 lg:w-1/4 p-1 sm:p-3"
                    >
                      <ListItem
                        link={`/product/${slugify(item.name)}`}
                        title={item.name}
                        price={item.price || 0}
                        imageSrc={item.image || '/products/default.png'}
                      />
                    </motion.div>
                  )
                })
              }
            </div>
          </div>
          </div>
      </div>
    </>
  )
}

export async function getServerSideProps ({ params, res }) {
  // Set cache control headers to prevent caching
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')

  try {
    debugLog('Category page getServerSideProps called', { params })

    if (!params || !params.name) {
      logError('Category page getServerSideProps', new Error('Missing params or category name'), {
        params
      })
      return {
        notFound: true
      }
    }

    const category = params.name.replace(/-/g," ")
    debugLog('Fetching inventory for category', { category })

    const inventory = await inventoryForCategory(category)

    logDataFetch('Category Page', `inventoryForCategory(${category})`, inventory)

    // Return 404 if category doesn't exist or has no items
    if (!inventory || !Array.isArray(inventory) || inventory.length === 0) {
      debugLog('Category not found or empty', {
        category,
        inventoryExists: !!inventory,
        isArray: Array.isArray(inventory),
        length: inventory?.length || 0
      })
      return {
        notFound: true
      }
    }

    debugLog('Category page data prepared', {
      category,
      itemCount: inventory.length
    })

    return {
      props: {
        inventory,
        title: category
      }
    }
  } catch (error) {
    logError('Category page getServerSideProps', error, {
      params,
      message: 'Failed to fetch category data'
    })

    // Return 404 instead of crashing
    return {
      notFound: true
    }
  }
}

export default Category