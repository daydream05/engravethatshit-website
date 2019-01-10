import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled, { css } from 'styled-components'

import { media } from '../utils/media'

import Layout from '../components/Layout'
import QuantitySelector from '../components/QuantitySelector'
import SnipcartButton from '../components/SnipcartButton'

import { Section } from '../components/StyledComponents'
import SEO from '../components/SEO'

const ProductTitle = styled.h1`
  text-align: center;
  ${media.desktop`
    margin-bottom: 4rem;
  `}
`

const Container = styled.div`
  max-width: 900px;
  margin: auto;
`

const Price = styled.span`
  font-weight: bold;
  font-size: 24px;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 2rem;
  margin-top: 1rem;
  display: block;

  ${media.desktop`
    font-size: 48px;
    margin-top: 0;
  `}
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

  > :first-child {
    margin-bottom: 0.5rem;
  }
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
      <Section
        css={css`
          padding: 88px 16px;
        `}
      >
      <Container>
        <ProductTitle>{name}</ProductTitle>
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
          <Img fluid={image.fluid} alt={image.title} />
          <div css={css`
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          `}>
            <Price>${price}</Price>
            <Description dangerouslySetInnerHTML={{ __html: description.childMarkdownRemark.html }}/>
            <QuantityGroup>
              <QuantityTitle>Quantity</QuantityTitle>
              <QuantitySelector onQuantityChange={setQuantity}/>
            </QuantityGroup>
            <span css={css`
              font-style: italic;
              margin-bottom: 2rem;
              opacity: 0.8;
              font-size: 16px;
            `}>Looking to buy in bulk? Shoot me a DM on
              <a href="https://twitter.com/vince_parulan" target="_blank" rel="noopener noreferrer"> Twitter</a>
            </span>
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
          </div>
        </div>
      </Container>
      </Section>
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
        fluid(maxHeight: 400 maxWidth: 400) {
          ...GatsbyContentfulFluid_withWebp
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