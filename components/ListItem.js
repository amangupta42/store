import React from 'react'
import Link from 'next/link'
import DENOMINATION from '../utils/currencyProvider'
import Image from './Image'

const ListItem = ({ link, title, imageSrc, price }) =>  (
  <div className="group h-full">
    <Link href={`${link}`}>
      <a aria-label={title} className="block h-full">
        <div className="
          bg-white rounded-2xl overflow-hidden
          shadow-soft hover:shadow-large
          transition-all duration-400
          transform hover:-translate-y-2
          h-full flex flex-col
        ">
          <div className="h-72 flex justify-center items-center bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
            <div className="
              absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5
              opacity-0 group-hover:opacity-100
              transition-opacity duration-400
            "></div>
            <div className="flex flex-column justify-center items-center transform group-hover:scale-110 transition-transform duration-400 z-10">
              <Image alt={title} src={imageSrc} className="w-3/5" />
            </div>
          </div>
          <div className="p-4">
            <p className="text-center text-lg font-bold mb-2 text-gray-800 group-hover:text-primary transition-colors duration-300">{title}</p>
            <p className="text-center text-xl font-semibold text-primary">{`${DENOMINATION}${price}`}</p>
          </div>
        </div>
      </a>
    </Link>
  </div>
)

export default ListItem