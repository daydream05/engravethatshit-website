import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled, { css } from 'styled-components'

// TODO: refactor add to cart button to take in button url

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin: auto;
`
const ProductName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: ${props => props.theme.colors.base};
`

const ProductPrice = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.lightGray};
  font-size: 1rem;
`

const ProductCard = ({ product }) => {
  const { fields, image, name, price } = product
  return (
    <CardContainer>
      <Link to={fields.path} css={css`
        flex: 1;
        text-decoration: none;
        transition-duration: 200ms;

        :hover {
          transition-property: text-decoration;
          text-decoration: underline;
          color: inherit;
        }
      `}>
          <Img fluid={image.fluid} />
          <div css={css`
            margin-top: 1rem;
            margin-bottom: 1rem;
          `}>
            <ProductName>{name}</ProductName>
            <ProductPrice>${price}</ProductPrice>
          </div>
      </Link>
    </CardContainer>
  )
}

export default ProductCard

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    fields: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }),
    image: PropTypes.shape({
      fluid: PropTypes.object,
    }),
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })
}

// Fragment that the global graphql can use
export const productCardFragment = graphql`
  fragment ProductCardFragment on ContentfulProduct {
    id
    fields {
      path
    }
    image { 
      fluid(maxHeight: 400 maxWidth: 400, quality: 100) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    name
    price
  }
`
