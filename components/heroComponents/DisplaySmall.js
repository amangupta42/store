import Link from 'next/link'
import { getTrimmedString } from '../../utils/helpers'
import Image from '../Image'

const DisplaySmall = ({ link, title, subtitle, imageSrc }) =>  (
  <div className="group bg-white rounded-2xl shadow-soft hover:shadow-large
  overflow-hidden
  transition-all duration-400
  transform hover:-translate-y-2
  lg:mb-0 mb-4">
    <Link href={link}>
      <a aria-label={title}>
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 px-6 pt-10 pb-4 flex flex-column justify-center items-center h-40 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
          <div className="transform group-hover:scale-110 transition-transform duration-400 relative z-10">
            <Image alt={title} src={imageSrc} className="w-3/5" />
          </div>
        </div>
        <div className="p-4">
          <p className="text-lg font-bold mb-1 group-hover:text-primary transition-colors duration-300">{title}</p>
          <p className="text-xs text-gray-600 mb-2">{getTrimmedString(subtitle, 150)}</p>
        </div>
      </a>
    </Link>
  </div>
)

export default DisplaySmall