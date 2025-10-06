import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaTimes, FaLongArrowAltRight } from 'react-icons/fa'
import { SiteContext, ContextProviderComponent } from '../context/mainContext'
import DENOMINATION from '../utils/currencyProvider'
import { slugify } from '../utils/helpers'
import QuantityPicker from '../components/QuantityPicker'
import Image from '../components/Image'
import Head from 'next/head'

const Cart = ({ context }) => {
  const [renderClientSideComponent, setRenderClientSideComponent] = useState(false)
  useEffect(() => {
    setRenderClientSideComponent(true)
  }, [])
  const {
    numberOfItemsInCart, cart, removeFromCart, total, setItemQuantity
  } = context
  const cartEmpty = numberOfItemsInCart === Number(0)

  function increment(item) {
    item.quantity = item.quantity + 1
    setItemQuantity(item)
  }

  function decrement(item) {
    if (item.quantity === 1) return
    item.quantity = item.quantity - 1
    setItemQuantity(item)
  }

  if (!renderClientSideComponent) return null

  return (
    <>
      <div className="flex flex-col items-center pb-10" style={{ minHeight: 'calc(100vh - 200px)' }}>
        <Head>
          <title>Shopping Cart</title>
          <meta name="description" content="Your shopping cart" />
          <meta property="og:title" content="Shopping Cart" key="title" />
        </Head>
        <div className="
          flex flex-col w-full
          c_large:w-c_large
        ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-10 pb-8"
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Your Cart</h1>
            <p className="text-gray-600 mt-2">{numberOfItemsInCart} {numberOfItemsInCart === 1 ? 'item' : 'items'} in your cart</p>
          </motion.div>

          {
            cartEmpty ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-gray-500 text-center py-12">No items in cart.</h3>
              </motion.div>
            ) : (
              <div className="flex flex-col">
                <div>
                  {
                    cart.map((item, index) => {
                      return (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="border-b py-10 bg-white rounded-xl shadow-soft mb-4 px-6"
                          key={item.id}
                        >
                          <div className="flex items-center hidden md:flex">
                            <Link href={`/product/${slugify(item.name)}`}>
                              <a aria-label={item.name}>
                                <Image className="w-32 m-0" src={item.image} alt={item.name} />
                              </a>
                            </Link>
                            <Link href={`/product/${slugify(item.name)}`}>
                              <a aria-label={item.name}>
                                <p className="
                                m-0 pl-10 text-gray-600 w-60
                                ">
                                  {item.name}
                                </p>
                              </a>
                            </Link>
                            <div className="ml-4">
                              <QuantityPicker
                                numberOfitems={item.quantity}
                                increment={() => increment(item)}
                                decrement={() => decrement(item)}
                              />
                            </div>
                            <div className="flex flex-1 justify-end">
                              <p className="m-0 pl-10 text-gray-900 tracking-wider">
                                {DENOMINATION + item.price}
                              </p>
                            </div>
                            <div role="button" onClick={() => removeFromCart(item)} className="
                            m-0 ml-10 text-gray-900 text-s cursor-pointer
                            ">
                              <FaTimes />
                            </div>
                          </div>

                          <div className="flex items-center flex md:hidden">
                            <Link href={`/product/${slugify(item.name)}`}>
                              <a>
                                <Image className="w-32 m-0" src={item.image} alt={item.name} />
                              </a>
                            </Link>
                            <div>
                              <Link href={`/product/${slugify(item.name)}`}>
                                <a aria-label={item.name}>
                                  <p className="
                                  m-0 pl-6 text-gray-600 text-base
                                  ">
                                    {item.name}
                                  </p>
                                </a>
                              </Link>
                              <div className="ml-6 mt-4 mb-2">
                                <QuantityPicker
                                  hideQuantityLabel
                                  numberOfitems={item.quantity}
                                  increment={() => increment(item)}
                                  decrement={() => decrement(item)}
                                />
                              </div>
                              <div className="flex flex-1">
                                <p className="text-lg m-0 pl-6 pt-4 text-gray-900 tracking-wider">
                                  {DENOMINATION + item.price}
                                </p>
                              </div>
                            </div>
                            <div role="button" onClick={() => removeFromCart(item)} className="
                            m-0 ml-10 text-gray-900 text-s cursor-pointer mr-2
                            ">
                              <FaTimes />
                            </div>
                          </div>
                        </motion.div>
                      )
                    })
                  }
                </div>
            </div>
            )
          }
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-1 justify-end py-8 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl px-6 py-4 mt-6"
          >
            <p className="text-lg font-medium pr-10">Total</p>
            <p className="text-2xl font-bold text-primary">{DENOMINATION + total}</p>
          </motion.div>
          {!cartEmpty && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/checkout" className="flex flex-1 justify-end">
                <a aria-label="Check out">
                  <div className="cursor-pointer flex items-center justify-end mt-4 group">
                    <p className="text-primary text-lg font-semibold mr-2 group-hover:mr-4 transition-all duration-300">Proceed to checkout</p>
                    <FaLongArrowAltRight className="text-primary group-hover:translate-x-2 transition-transform duration-300" size={20} />
                  </div>
                </a>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}

function CartWithContext(props) {
  return (
    <ContextProviderComponent>
      <SiteContext.Consumer>
        {
          context => <Cart {...props} context={context} />
        }
      </SiteContext.Consumer>
    </ContextProviderComponent>
  )
}


export default CartWithContext