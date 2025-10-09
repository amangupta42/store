import { useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import Button from '../../components/Button'
import Image from '../../components/Image'
import QuantityPicker from '../../components/QuantityPicker'
import { fetchInventory } from '../../utils/inventoryProvider'
import { slugify } from '../../utils/helpers'
import { useCart } from '../../context/mainContext'
import { logDataFetch, logError, debugLog } from '../../utils/debug'

const ItemView = (props) => {
  const [numberOfitems, updateNumberOfItems] = useState(1)
  const { product } = props
  const { addToCart } = useCart()

  // Defensive check for missing product data
  if (!product) {
    debugLog('Product page: No product data', { props })
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Head>
          <title>Product Not Found</title>
          <meta name="description" content="Product not found" />
        </Head>
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Product Not Found
          </h1>
          <p className="text-gray-600">This product does not exist or has been removed.</p>
        </div>
      </div>
    )
  }

  const { price, image, name, description } = product

  function addItemToCart (product) {
    product["quantity"] = numberOfitems
    addToCart(product)
  }

  function increment() {
    updateNumberOfItems(numberOfitems + 1)
  }

  function decrement() {
    if (numberOfitems === 1) return
    updateNumberOfItems(numberOfitems - 1)
  }

  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={name} key="title" />
      </Head>
      <div className="
        sm:py-12
        md:flex-row
        py-4 w-full flex flex-1 flex-col my-0 mx-auto
      ">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 h-120 flex flex-1 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-soft overflow-hidden"
        >
          <div className="py-16 p10 flex flex-1 justify-center items-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image src={image} alt="Inventory item" className="max-h-full" />
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-2 px-0 md:px-10 pb-8 w-full md:w-1/2"
        >
          <h1 className="
           sm:mt-0 mt-2 text-5xl font-bold leading-large bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent
          ">{name}</h1>
          <h2 className="text-3xl font-bold text-primary tracking-wide sm:py-8 py-6">${price}</h2>
          <p className="text-gray-600 leading-7 text-base">{description}</p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="my-6"
          >
            <QuantityPicker
              increment={increment}
              decrement={decrement}
              numberOfitems={numberOfitems}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button
              full
              title="Add to Cart"
              onClick={() => addItemToCart(product)}
            />
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

export async function getServerSideProps ({ params }) {
  try {
    debugLog('Product page getServerSideProps called', { params })

    if (!params || !params.name) {
      logError('Product page getServerSideProps', new Error('Missing params or product name'), {
        params
      })
      return {
        notFound: true
      }
    }

    const name = params.name.replace(/-/g," ")
    debugLog('Fetching product', { name, slug: params.name })

    const inventory = await fetchInventory()

    logDataFetch('Product Page', 'fetchInventory', inventory)

    if (!Array.isArray(inventory) || inventory.length === 0) {
      logError('Product page getServerSideProps', new Error('Invalid or empty inventory'), {
        inventoryType: typeof inventory,
        isArray: Array.isArray(inventory),
        length: inventory?.length || 0
      })
      return {
        notFound: true
      }
    }

    const product = inventory.find(item => slugify(item.name) === slugify(name))

    // Return 404 if product not found
    if (!product) {
      debugLog('Product not found', {
        name,
        slug: params.name,
        inventoryCount: inventory.length
      })
      return {
        notFound: true
      }
    }

    debugLog('Product page data prepared', {
      productName: product.name,
      productId: product.id
    })

    return {
      props: {
        product,
      }
    }
  } catch (error) {
    logError('Product page getServerSideProps', error, {
      params,
      message: 'Failed to fetch product data'
    })

    // Return 404 instead of crashing
    return {
      notFound: true
    }
  }
}

export default ItemView