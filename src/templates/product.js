import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled, { css } from 'styled-components'

import { media } from '../utils/media'

import Layout from '../components/Layout'
import QuantitySelector from '../components/QuantitySelector'
import SnipcartButton from '../components/SnipcartButton'

import SEO from '../components/SEO'

const ProductTitle = styled.h1`
  margin-bottom: 0.5rem;
  font-weight: 600;
`

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding-top: 55px;
`

const Price = styled.span`
  font-weight: 600;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.primary};
  opacity: 0.7;
  margin-bottom: 2rem;
  display: block;
`

const Description = styled.div`
  font-family: 600;
  font-size: 18px;
  color: #4A4A4A;
  letter-spacing: 0;
`

const QuantityGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`

const QuantityTitle = styled.div`
  font-size: 24px;
`

const AddToCartButton = styled(SnipcartButton)``

const BuyItNowButton = styled(AddToCartButton)`
  background-color: ${props => props.theme.colors.black};

  :hover {
    background-color: rgba(0,0,0,.9);
    transition-duration: 200ms;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;

  > :first-child {
    margin-bottom: 0.5rem;
  }
`

const ProductImg = styled(Img)`
  
`

const ProductTemplate = ({ data }) => {
  const {
    name,
    image,
    id,
    price,
    fields,
    description,
  } = data.contentfulProduct

  const [quantity, setQuantity] = useState(1)

  return (
    <Layout>
      <SEO title={name} />
      <main
        css={css`
          padding: 88px 16px;
        `}
      >
        <Container>
          <div
            css={css`
            padding: 16px;
            ${media.desktop`
              display: grid;
              grid-template-columns: 1fr 1fr;
              grid-gap: 80px;
              padding: 0;
            `}
          `}>
            <ProductImg fluid={image.fluid} alt={image.title} />
            <div>
              <ProductTitle>{name}</ProductTitle>
              <Price>${price}</Price>
              <QuantityGroup>
                <QuantityTitle>Quantity</QuantityTitle>
                <QuantitySelector onQuantityChange={setQuantity} />
              </QuantityGroup>
              <ButtonGroup>
                <SnipcartButton
                  className="snipcart-add-item"
                  data-item-id={id}
                  data-item-name={name}
                  data-item-price={price}
                  data-item-quantity={`${quantity}`}
                  css={css`
                  background-color: ${props => props.theme.colors.white};
                  color: ${props => props.theme.colors.primary};
                  border: 2px solid ${props => props.theme.colors.primary};

                  :hover {
                    background-color: unset;
                    color: ${props => props.theme.colors.primary};
                  }
                `}
                >Add to cart</SnipcartButton>
                <SnipcartButton
                  className="snipcart-add-item"
                  data-item-id={id}
                  data-item-name={name}
                  data-item-price={price}
                  data-item-quantity="1"
                  url={fields.path}
                >Buy it now</SnipcartButton>
              </ButtonGroup>
              <Description dangerouslySetInnerHTML={{ __html: description.childMarkdownRemark.html }}/>
              <span css={css`
                font-style: italic;
                margin-bottom: 2rem;
                opacity: 0.8;
                font-size: 16px;
              `}>Looking to buy in bulk? Shoot me a DM on
                <a href="https://twitter.com/vince_parulan" target="_blank" rel="noopener noreferrer"> Twitter</a>
              </span>
            </div>
          </div>
        </Container>
      </main>
    </Layout>
  )
}

export default ProductTemplate

export const productTemplateQuery = graphql`
  query($slug: String!) {
    contentfulProduct(slug: { eq: $slug }) {
      name
      id
      price
      fields {
        path
      }
      description {
        childMarkdownRemark {
          html
        }
      }
      image {
        title
        fluid(maxHeight: 600 maxWidth: 600, quality: 100) {
          ...GatsbyContentfulFluid_withWebp
        }
        fixed(height: 600 width: 600, quality: 100) {
          ...GatsbyContentfulFixed_withWebp
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`