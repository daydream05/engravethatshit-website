import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Img from 'gatsby-image'

import { media } from '../utils/media'

const THUMBNAIL_SIZE = '54px';

const ProductThumbnailsRoot = styled.div`
  height: ${THUMBNAIL_SIZE};
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  overflow-y: hidden;
  width: 100%;

  ${media.desktop`
    height: auto;
    overflow-x: hidden;
  `}
`

const ProductThumbnailsContent = styled.div`
  display: inline-flex;
  height: 100%;

  ${media.desktop`
    justify-content: center;
    min-width: 100%;
  `}
`

const Thumbnail = styled.a`
  border-radius: 8px;
  height: ${THUMBNAIL_SIZE};
  width: ${THUMBNAIL_SIZE};
  margin-right: 1rem;

  ${media.desktop`
    cursor: pointer;
    margin-right: 1rem;
  `}
`

const ProductThumbnails = props => {
  const handleClick = (image) => (event) => {
    event.preventDefault()

    console.log(image)
  }

  const { images, className } = props
  return (
    <ProductThumbnailsRoot className={className}>
      <ProductThumbnailsContent>
        {images.map(image => {
          return (
            <Thumbnail
              key={image.id}
              onClick={handleClick(image)}
              href={image.fluid.src}
            >
              <Img fluid={image.fluid} />
            </Thumbnail>
          )
        })}
      </ProductThumbnailsContent>
    </ProductThumbnailsRoot>
  )
}

export default ProductThumbnails

ProductThumbnails.propTypes = {
  images: PropTypes.array.isRequired,
  className: PropTypes.string
}