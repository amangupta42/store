import Head from 'next/head'
import { motion } from 'framer-motion'
import { Center, Footer, Tag, Showcase, DisplaySmall, DisplayMedium } from '../components'
import { titleIfy, slugify } from '../utils/helpers'
import { fetchInventory } from '../utils/inventoryProvider'

const Home = ({ inventoryData = [], categories: categoryData = [] }) => {
  const inventory = inventoryData.slice(0, 4)
  const categories = categoryData.slice(0, 2)

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
                title={inventory[2].name}
                link={`/product/${slugify(inventory[2].name)}`}
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
                  imageSrc={inventory[2].image}
                />
              </motion.div>
              <div className="absolute
              w-48 h-48 sm:w-72 sm:h-72 xl:w-88 xl:h-88
              bg-white/20 backdrop-blur-sm z-0 rounded-full animate-bounce-soft" />
          </div>
        </motion.div>
      </div>
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
            imageSrc={categories[0].image}
            subtitle={`${categories[0].itemCount} items`}
            title={titleIfy(categories[0].name)}
            link={`/category/${slugify(categories[0].name)}`}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <DisplayMedium
            imageSrc={categories[1].image}
            subtitle={`${categories[1].itemCount} items`}
            title={titleIfy(categories[1].name)}
            link={`/category/${slugify(categories[1].name)}`}
          />
        </motion.div>
      </div>
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
        {[inventory[0], inventory[1], inventory[2], inventory[3]].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
          >
            <DisplaySmall
              imageSrc={item.image}
              title={item.name}
              subtitle={item.categories[0]}
              link={`/product/${slugify(item.name)}`}
            />
          </motion.div>
        ))}
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const inventory = await fetchInventory()

  const inventoryCategorized = inventory.reduce((acc, next) => {
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
      inventoryData: inventory,
      categories: inventoryCategorized
    }
  }
}

export default Home