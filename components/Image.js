import NextImage from 'next/image'
import PropTypes from 'prop-types'

/**
 * Modern image component using Next.js Image optimization
 * Falls back to regular img tag for external URLs or when optimization is disabled
 */
const ImageComponent = ({ src, alt = '', className, width, height, priority = false, ...props }) => {
  // For external images or when we don't have width/height, use regular img
  const isExternal = src?.startsWith('http')

  // If using local images from /public, they should be imported or have dimensions specified
  if (!isExternal && width && height) {
    return (
      <NextImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        {...props}
      />
    )
  }

  // Fallback to regular img for backward compatibility
  // This maintains compatibility with existing code that doesn't specify dimensions
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      {...props}
    />
  )
}

ImageComponent.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  priority: PropTypes.bool,
}

export default ImageComponent
