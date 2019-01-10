import React from 'react'
import Img from 'gatsby-image'
import { StaticQuery, graphql } from 'gatsby'
import styled, { css } from 'styled-components'

import { media } from '../../utils/media'

import { UnstyledLink } from '../StyledComponents'

// TODO: refactor add to cart button to take in button url

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  height: 100%;
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
`

const ProductDescription = styled.div`
  font-size: 16px;
  color: ${props => props.theme.colors.darkGray};
  &&& {
    margin-bottom: 2rem;
  }
`

const AddToCartButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: ${props => props.theme.colors.primary};;
  height: 64px;
  color: ${props => props.theme.colors.white};
  font-size: 18px;
  cursor: pointer;
  padding: 0 2rem;
  justify-self: flex-end;
  transition-duration: 200ms;

  :hover {
    background-color: #440B6F;
    transition-duration: 200ms;
  }
`

const ImgContainer = styled.div`
  ${media.desktop`
    width: 400px;
    height: 400px;
  `}
`
const ProductCard = ({ product }) => {
  return (
    <CardContainer>
      <UnstyledLink to={product.fields.path} css={css`flex: 1;`}>
        <ImgContainer>
          <Img fluid={product.image.fluid} />
        </ImgContainer>
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
      <StaticQuery
        query={siteQuery}
        render={data => {
          const { siteUrl } = data.site.siteMetadata
          return (
            <AddToCartButton
              className="snipcart-add-item"
              data-item-id={product.id}
              data-item-name={product.name}
              data-item-price={product.price}
              data-item-url={`${siteUrl}/shop/`}
              data-item-custom1-name="Website/App URL"
              data-item-custom1-required="true"
            >Add to cart</AddToCartButton>
          )
        }}
      />

    </CardContainer>
  )
}

const siteQuery = graphql`
  query {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`

export default ProductCard