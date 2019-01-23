import React from 'react'
import { css } from 'styled-components'
import Img from 'gatsby-image'

const ProductImage = (props) => {
  const { image, className } = props 
  return (
    <Img
      className={className}
      fluid={image.fluid}
      alt={image.title}
      css={css`
        max-width: 600px;
        max-height: 600px;
        margin-bottom: 1rem;
      `}
    />
  )
}

export default ProductImage