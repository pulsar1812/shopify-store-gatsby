import React, { useState, useEffect } from 'react'
import Image from 'gatsby-image'

import ImageThumbnail from './ImageThumbnail'
import { ImageGalleryWrapper } from './styles'

export const ImageGallery = ({ images, selectedVariantImageId }) => {
  const [activeImageThumbnail, setActiveImageThumbnail] = useState(
    images.find(({ id }) => id === selectedVariantImageId) || images[0]
  )

  useEffect(() => {
    setActiveImageThumbnail(
      images.find(({ id }) => id === selectedVariantImageId) || images[0]
    )
  }, [selectedVariantImageId, setActiveImageThumbnail, images])

  const handleClick = image => {
    setActiveImageThumbnail(image)
  }

  return (
    <ImageGalleryWrapper>
      <div>
        <Image fluid={activeImageThumbnail.localFile.childImageSharp.fluid} />
      </div>
      <div>
        {images.map(image => {
          return (
            <ImageThumbnail
              key={image.id}
              isActive={activeImageThumbnail.id === image.id}
              onClick={handleClick}
              image={image}
            />
          )
        })}
      </div>
    </ImageGalleryWrapper>
  )
}
