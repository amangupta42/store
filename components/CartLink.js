import { useState, useEffect } from 'react'
import { ContextProviderComponent, SiteContext } from '../context/mainContext'
import { FaShoppingCart, FaCircle } from 'react-icons/fa';
import Link from "next/link"
import { colors } from '../theme'
const { primary } = colors

function CartLink(props) {
  const [renderClientSideComponent, setRenderClientSideComponent] = useState(false)
  useEffect(() => {
    setRenderClientSideComponent(true)
  }, [])
  let { context: { numberOfItemsInCart = 0 }} = props
  return (
    <Link href="/cart">
      <a
        aria-label="Cart"
        className="fixed sm:top-24 right-8 desktop:right-24 top-20 flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-large hover:shadow-glow text-primary hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110"
        style={{ zIndex: 9999 }}
      >
        <FaShoppingCart size={20} />
        {
          renderClientSideComponent && numberOfItemsInCart > Number(0) && (
            <div className="absolute -top-1 -right-1 bg-primary rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
              <span className="text-white text-xs font-bold" suppressHydrationWarning>{numberOfItemsInCart}</span>
            </div>
          )
        }
      </a>
    </Link>
  )
}

function CartLinkWithContext(props) {
  return (
    <ContextProviderComponent>
      <SiteContext.Consumer>
        {
          context => <CartLink {...props} context={context} />
        }
      </SiteContext.Consumer>
    </ContextProviderComponent>
  )
}

export default CartLinkWithContext