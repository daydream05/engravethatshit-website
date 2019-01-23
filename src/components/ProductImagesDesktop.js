import React from 'react'
import styled from 'styled-components'

import ProductThumbnails from '../components/ProductThumbnails'
import ProductImage from '../components/ProductImage'

const ProductImagesDesktopRoot = styled.div`
`

const ProductImagesDesktop = (props) => {
  const { images, className } = props
  const image = images[0]

  return(
    <ProductImagesDesktopRoot className={className}>
      <ProductImage image={image} />
      <ProductThumbnails images={images} />
    </ProductImagesDesktopRoot>
  )
}

export default ProductImagesDesktop