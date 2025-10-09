import Head from 'next/head'
import { motion } from 'framer-motion'
import { titleIfy , slugify } from '../utils/helpers'
import { DisplayMedium } from '../components'
import { fetchInventory } from '../utils/inventoryProvider'
import { logDataFetch, logError, debugLog } from '../utils/debug'

function Categories ({ categories = [] }) {
  // Defensive check for missing data
  if (!Array.isArray(categories) || categories.length === 0) {
    debugLog('Categories page: No category data', {
      categoriesLength: categories?.length || 0,
      isArray: Array.isArray(categories)
    })
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Head>
          <title>All Categories</title>
          <meta name="description" content="Browse all product categories" />
          <meta property="og:title" content="All Categories" key="title" />
        </Head>
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            No Categories Available
          </h1>
          <p className="text-gray-600">Please check back later or contact support if this issue persists.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="w-full">
        <Head>
          <title>All Categories</title>
          <meta name="description" content="Browse all product categories" />
          <meta property="og:title" content="All Categories" key="title" />
        </Head>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-4 sm:pt-10 pb-8"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">All Categories</h1>
          <p className="text-gray-600 mt-4">Browse our complete collection of product categories</p>
        </motion.div>
        <div className="flex flex-col items-center">
          <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full px-4">
          {
            categories.filter(Boolean).map((category, index) => {
              if (!category || !category.name) {
                debugLog('Categories page: Skipping invalid category', { category, index })
                return null
              }
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <DisplayMedium
                    imageSrc={category.image || '/products/default.png'}
                    subtitle={`${category.itemCount || 0} items`}
                    title={titleIfy(category.name)}
                    link={`/category/${slugify(category.name)}`}
                  />
                </motion.div>
              )
            })
          }
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  try {
    debugLog('Categories page getServerSideProps called')

    const inventory = await fetchInventory()

    logDataFetch('Categories Page', 'fetchInventory', inventory)

    if (!Array.isArray(inventory)) {
      logError('Categories page getServerSideProps', new Error('Inventory is not an array'), {
        inventoryType: typeof inventory,
        inventory: inventory
      })
      return {
        props: {
          categories: []
        }
      }
    }

    if (inventory.length === 0) {
      logError('Categories page getServerSideProps', new Error('Inventory is empty'), {
        message: 'fetchInventory returned empty array'
      })
      return {
        props: {
          categories: []
        }
      }
    }

    const inventoryCategories = inventory.reduce((acc, next) => {
      try {
        if (!next || !next.categories || !Array.isArray(next.categories)) {
          debugLog('Skipping item with invalid categories', { item: next })
          return acc
        }

        const categories = next.categories
        categories.forEach(c => {
          const index = acc.findIndex(item => item.name === c)
          if (index !== -1) {
            const item = acc[index]
            item.itemCount = item.itemCount + 1
            acc[index] = item
          } else {
            const item = {
              name: c,
              image: next.image,
              itemCount: 1
            }
            acc.push(item)
          }
        })
      } catch (err) {
        logError('Processing category for item', err, { item: next })
      }
      return acc
    }, [])

    debugLog('Categories page data prepared', {
      categoriesCount: inventoryCategories.length
    })

    return {
      props: {
        categories: inventoryCategories
      }
    }
  } catch (error) {
    logError('Categories page getServerSideProps', error, {
      message: 'Failed to fetch data for categories page'
    })

    // Return empty data instead of crashing the page
    return {
      props: {
        categories: []
      }
    }
  }
}

export default Categories