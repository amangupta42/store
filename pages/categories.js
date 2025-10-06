import Head from 'next/head'
import { motion } from 'framer-motion'
import { titleIfy , slugify } from '../utils/helpers'
import { DisplayMedium } from '../components'
import { fetchInventory } from '../utils/inventoryProvider'

function Categories ({ categories = [] }) {
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
            categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <DisplayMedium
                  imageSrc={category.image}
                  subtitle={`${category.itemCount} items`}
                  title={titleIfy(category.name)}
                  link={`/category/${slugify(category.name)}`}
                />
              </motion.div>
            ))
          }
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const inventory = await fetchInventory()
  const inventoryCategories = inventory.reduce((acc, next) => {
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
    return acc
  }, [])

  return {
    props: {
      categories: inventoryCategories
    }
  }
}

export default Categories