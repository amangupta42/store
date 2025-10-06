import Image from '../Image'
import Link from 'next/link'

const DisplayMedium = ({ imageSrc, title, subtitle, link }) => {
  return (
    <div className="
    group mb-4 lg:mb-0
    bg-white rounded-2xl shadow-soft hover:shadow-large
    overflow-hidden
    transition-all duration-400
    transform hover:-translate-y-2
    ">
      <Link href={`${link}`}>
        <a aria-label={title}>
          <div className="bg-gradient-to-br from-slate-50 to-purple-50 p-8 pb-0 flex flex-column justify-center items-center h-64 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
            <div className="transform group-hover:scale-110 transition-transform duration-400 relative z-10">
              <Image src={imageSrc} alt={title} className="w-3/5" />
            </div>
          </div>
          <div className="p-6">
            <p className="text-3xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">{title}</p>
            <p className="text-sm text-gray-600 font-medium">{subtitle}</p>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default DisplayMedium;