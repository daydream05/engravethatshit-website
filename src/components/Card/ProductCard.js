import React from 'react'
import Img from 'gatsby-image'
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
  return (
    <CardContainer>
      <UnstyledLink to={product.fields.path} css={css`flex: 1;`}>
          <Img fluid={product.image.fluid} />
          <div css={css`
            margin-top: 1rem;
            margin-bottom: 1rem;
          `}>
            <ProductName>{product.name}</ProductName>
            <ProductPrice>${product.price}</ProductPrice>
          </div>
      </UnstyledLink>
    </CardContainer>
  )
}

export default ProductCard