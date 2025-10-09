import Head from 'next/head'
import { motion } from 'framer-motion'
import { Center, Footer, Tag, Showcase, DisplaySmall, DisplayMedium } from '../components'
import { titleIfy, slugify } from '../utils/helpers'
import { fetchInventory } from '../utils/inventoryProvider'
import { logDataFetch, logError, debugLog } from '../utils/debug'

const Home = ({ inventoryData = [], categories: categoryData = [] }) => {
  const inventory = inventoryData.slice(0, 4)
  const categories = categoryData.slice(0, 2)

  // Defensive check for missing data
  if (!Array.isArray(inventoryData) || inventoryData.length < 4) {
    debugLog('Home page: Insufficient inventory data', {
      inventoryLength: inventoryData?.length || 0,
      isArray: Array.isArray(inventoryData)
    })
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Head>
          <title>Modern ECommerce Store</title>
          <meta name="description" content="A fully configurable modern ecommerce store built with Next.js, React, and Tailwind CSS." />
          <meta property="og:title" content="Modern ECommerce Store" key="title" />
        </Head>
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            No Products Available
          </h1>
          <p className="text-gray-600">Please check back later or contact support if this issue persists.</p>
        </div>
      </div>
    )
  }

  if (!Array.isArray(categoryData) || categoryData.length < 2) {
    debugLog('Home page: Insufficient category data', {
      categoryLength: categoryData?.length || 0,
      isArray: Array.isArray(categoryData)
    })
  }

  return (
    <>
      <div className="w-full">
        <Head>
          <title>Modern ECommerce Store</title>
          <meta name="description" content="A fully configurable modern ecommerce store built with Next.js, React, and Tailwind CSS." />
          <meta property="og:title" content="Modern ECommerce Store" key="title" />
        </Head>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-hero relative overflow-hidden
          p-6 pb-10 sm:pb-6 rounded-3xl mx-4 my-6 shadow-large
          flex lg:flex-row flex-col"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="pt-4 pl-2 sm:pt-12 sm:pl-12 flex flex-col relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Tag
                year="2025"
                category="FEATURED"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Center
                price="200"
                title={inventory[2]?.name || 'Featured Product'}
                link={inventory[2]?.name ? `/product/${slugify(inventory[2].name)}` : '#'}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Footer
                designer="Premium Collection"
              />
            </motion.div>
          </div>
          <div className="flex flex-1 justify-center items-center relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                className="relative z-10"
              >
                <Showcase
                  imageSrc={inventory[2]?.image || '/products/default.png'}
                />
              </motion.div>
              <div className="absolute
              w-48 h-48 sm:w-72 sm:h-72 xl:w-88 xl:h-88
              bg-white/20 backdrop-blur-sm z-0 rounded-full animate-bounce-soft" />
          </div>
        </motion.div>
      </div>
      {categories.length >= 2 && (
        <div className="
          lg:my-12 lg:grid-cols-2
          grid-cols-1
          grid gap-6 my-8 px-4
        ">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <DisplayMedium
              imageSrc={categories[0]?.image || '/products/default.png'}
              subtitle={`${categories[0]?.itemCount || 0} items`}
              title={titleIfy(categories[0]?.name || 'Category')}
              link={categories[0]?.name ? `/category/${slugify(categories[0].name)}` : '#'}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <DisplayMedium
              imageSrc={categories[1]?.image || '/products/default.png'}
              subtitle={`${categories[1]?.itemCount || 0} items`}
              title={titleIfy(categories[1]?.name || 'Category')}
              link={categories[1]?.name ? `/category/${slugify(categories[1].name)}` : '#'}
            />
          </motion.div>
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="pt-16 pb-8 flex flex-col items-center"
      >
        <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Trending Now</h2>
        <p className="text-gray-600 text-base max-w-2xl text-center px-4">Discover our curated collection of premium products, handpicked just for you.</p>
      </motion.div>
      <div className="my-8 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {inventory.filter(Boolean).map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
          >
            <DisplaySmall
              imageSrc={item?.image || '/products/default.png'}
              title={item?.name || 'Product'}
              subtitle={item?.categories?.[0] || 'Uncategorized'}
              link={item?.name ? `/product/${slugify(item.name)}` : '#'}
            />
          </motion.div>
        ))}
      </div>
    </>
  )
}

export async function getServerSideProps() {
  try {
    debugLog('Home page getServerSideProps called')

    const inventory = await fetchInventory()

    logDataFetch('Home Page', 'fetchInventory', inventory)

    if (!Array.isArray(inventory)) {
      logError('Home page getServerSideProps', new Error('Inventory is not an array'), {
        inventoryType: typeof inventory,
        inventory: inventory
      })
      return {
        props: {
          inventoryData: [],
          categories: []
        }
      }
    }

    if (inventory.length === 0) {
      logError('Home page getServerSideProps', new Error('Inventory is empty'), {
        message: 'fetchInventory returned empty array'
      })
      return {
        props: {
          inventoryData: [],
          categories: []
        }
      }
    }

    const inventoryCategorized = inventory.reduce((acc, next) => {
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

    debugLog('Home page data prepared', {
      inventoryCount: inventory.length,
      categoriesCount: inventoryCategorized.length
    })

    return {
      props: {
        inventoryData: inventory,
        categories: inventoryCategorized
      }
    }
  } catch (error) {
    logError('Home page getServerSideProps', error, {
      message: 'Failed to fetch data for home page'
    })

    // Return empty data instead of crashing the page
    return {
      props: {
        inventoryData: [],
        categories: []
      }
    }
  }
}

export default Home