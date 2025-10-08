import Head from 'next/head'
import { motion } from 'framer-motion'
import ListItem from '../../components/ListItem'
import { titleIfy, slugify } from '../../utils/helpers'
import inventoryForCategory from '../../utils/inventoryForCategory'

const Category = (props) => {
  const { inventory, title } = props
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
                inventory.map((item, index) => {
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="w-full md:w-1/2 lg:w-1/4 p-1 sm:p-3"
                    >
                      <ListItem
                        link={`/product/${slugify(item.name)}`}
                        title={item.name}
                        price={item.price}
                        imageSrc={item.image}
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

export async function getServerSideProps ({ params }) {
  const category = params.name.replace(/-/g," ")
  const inventory = await inventoryForCategory(category)

  // Return 404 if category doesn't exist or has no items
  if (!inventory || inventory.length === 0) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      inventory,
      title: category
    }
  }
}

export default Category