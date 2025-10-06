import React from 'react';

export default function Button({ title, onClick, full = false, variant = 'primary' }) {
  let classNames = ""

  if (variant === 'primary') {
    classNames = "text-sm font-bold tracking-wide bg-gradient-to-r from-primary to-secondary text-white py-4 px-12 rounded-xl shadow-medium hover:shadow-glow transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5"
  } else if (variant === 'outline') {
    classNames = "text-sm font-bold tracking-wide bg-transparent hover:bg-primary text-primary hover:text-white py-4 px-12 border-2 border-primary rounded-xl transition-all duration-300 transform hover:scale-105"
  }

  if (full) {
    classNames = `${classNames} w-full`
  }

  return (
    <button onClick={onClick} className={classNames}>
      <div className="flex items-center justify-center">
        {title}
      </div>
    </button>
  )
}