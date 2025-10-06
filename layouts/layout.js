import Link from 'next/link'
import { slugify } from '../utils/helpers'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { navItemLength } from '../ecommerce.config'
import CartLink from '../components/CartLink'

export default function Layout({ children, categories }) {
  if (categories.length > navItemLength) {
    categories = categories.slice(0, navItemLength)
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative">
      <CartLink />
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-white/70 shadow-soft border-b border-white/20">
        <div className="flex justify-center">
          <div className="
            mobile:px-12 sm:flex-row sm:py-4 desktop:px-0
            px-4 py-4 flex flex-col w-fw items-center
          ">
            <div className="mb-4 sm:mb-0 sm:mr-16 max-w-48 sm:max-w-none">
              <Link href="/">
                <a aria-label="Home" className="group">
                  <img src="/logo.png" alt="logo" width="90" height="28" className="transition-transform duration-300 group-hover:scale-110" />
                </a>
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start">
              <Link href="/">
                <a aria-label="Home" className="group">
                  <p className="
                    sm:mr-6 sm:mb-0
                    mb-2 text-sm font-medium mr-4 px-3 py-2 rounded-lg
                    text-gray-700 hover:text-primary
                    hover:bg-white/50
                    transition-all duration-300
                    relative
                    after:absolute after:bottom-0 after:left-3 after:h-0.5
                    after:w-0 after:bg-primary after:transition-all after:duration-300
                    hover:after:w-[calc(100%-1.5rem)]
                  ">
                  Home
                  </p>
                </a>
              </Link>
              {
                categories.map((category, index) => (
                  <Link
                    href={`/category/${slugify(category)}`}
                    key={index}
                  >
                    <a aria-label={category} className="group">
                      <p className="
                          sm:mr-6 sm:mb-0
                          mb-2 text-sm font-medium mr-4 px-3 py-2 rounded-lg
                          text-gray-700 hover:text-primary
                          hover:bg-white/50
                          transition-all duration-300
                          relative
                          after:absolute after:bottom-0 after:left-3 after:h-0.5
                          after:w-0 after:bg-primary after:transition-all after:duration-300
                          hover:after:w-[calc(100%-1.5rem)]
                        ">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </p>
                    </a>
                  </Link>
                ))
              }
              <Link href="/categories">
                <a aria-label="All categories" className="group">
                  <p className="
                    sm:mr-6 sm:mb-0
                    mb-2 text-sm font-medium mr-4 px-3 py-2 rounded-lg
                    text-gray-700 hover:text-primary
                    hover:bg-white/50
                    transition-all duration-300
                    relative
                    after:absolute after:bottom-0 after:left-3 after:h-0.5
                    after:w-0 after:bg-primary after:transition-all after:duration-300
                    hover:after:w-[calc(100%-1.5rem)]
                  ">
                  All Categories
                  </p>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="mobile:px-10 px-4 pb-10 flex justify-center">
        <main className="w-fw">{children}</main>
      </div>
      <footer className="flex justify-center bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white mt-20">
        <div className="
        sm:flex-row sm:items-center
        flex-col
        flex w-fw px-12 py-8
        desktop:px-0
        ">
          <span className="block text-gray-300 text-sm">Copyright © 2025 Modern ECommerce Store. All rights reserved.</span>
          <div className="
            sm:justify-end sm:m-0
            flex flex-1 mt-4 sm:mt-0
          ">
            <Link href="/admin">
              <a aria-label="Admin panel" className="group">
              <p className="text-sm font-semibold text-white hover:text-primary-100 transition-colors duration-300">Admin Panel</p>
              </a>
            </Link>
          </div>
        </div>
      </footer>
      <ToastContainer autoClose={3000} />
    </div>
  )
}