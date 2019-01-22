import React from 'react'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import styled, { css } from 'styled-components'

import { media } from '../../utils/media'

import SnipcartButton from '../../components/SnipcartButton'

import { UnstyledLink } from '../StyledComponents'

// TODO: refactor add to cart button to take in button url

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin: auto;
`
const ProductName = styled.h3`
  font-size: 24px;
  font-weight: 400;
  margin: 0;
  color: ${props => props.theme.colors.base};
`

const ProductPrice = styled.span`
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  font-size: 24px;
  margin-left: 3rem;
`

const ProductDescription = styled.div`
  font-size: 16px;
  color: ${props => props.theme.colors.darkGray};
  &&& {
    margin-bottom: 2rem;
  }
`

const ProductCard = ({ product }) => {
  return (
    <CardContainer>
      <UnstyledLink to={product.fields.path} css={css`flex: 1;`}>
          <Img fluid={product.image.fluid} />
          <div css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 1rem;
            margin-bottom: 1rem;
          `}>
            <ProductName>{product.name}</ProductName>
            <ProductPrice>${product.price}</ProductPrice>
          </div>
        <ProductDescription>{product.description.childMarkdownRemark.excerpt}</ProductDescription>
      </UnstyledLink>
          <SnipcartButton
            className="snipcart-add-item"
            url={product.fields.path}
            data-item-id={product.id}
            data-item-name={product.name}
            data-item-price={product.price}
          >Add to cart</SnipcartButton>
    </CardContainer>
  )
}

export default ProductCard