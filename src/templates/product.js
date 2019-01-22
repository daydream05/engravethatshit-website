import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled, { css } from 'styled-components'

import { media } from '../utils/media'

import { Section } from '../components/StyledComponents'
import Layout from '../components/Layout'
import QuantitySelector from '../components/QuantitySelector'
import SnipcartButton from '../components/SnipcartButton'

import SEO from '../components/SEO'
import { ProductCard } from '../components/Card';

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
  color: ${props => props.theme.colors.lightGray};
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

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;

  > :first-child {
    margin-bottom: 0.5rem;
  }
`

const RelatedProductsList = styled.ol`
  display: grid;
  grid-template-columns: repeat(6, 200px);
  grid-gap: 2rem;
  list-style: none;
  border-top-width: 2px;
`

const ProductTemplate = ({ data }) => {
  const {
    name,
    image,
    id,
    price,
    fields,
    description,
    relatedProducts,
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
        <Section>
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
              <Description dangerouslySetInnerHTML={{ __html: description.childMarkdownRemark.html }} />
            </div>
          </div>
        </Section>
        {relatedProducts &&
        <Section
          css={css`padding: 2rem 0;`}
        >
          <hr />
          <h2 css={css`
            font-size: 1rem;
            font-weight: 600;
          `}>AI recommended™ products just for you</h2>
          <RelatedProductsList>
            {relatedProducts.map(product => {
              return (
                <li key={product.id}>
                  <ProductCard
                    product={product}
                  />
                </li>
              )
            })}
          </RelatedProductsList>
          <hr />
        </Section>}
        <Section
          css={css`
            padding: 5rem 0;
          `}
        >
          <h2 css={css`
            text-align: center;
          `}>How it works</h2>
          <ol>
            <li>Send us a link to your file</li>
            <li>We'll create a sample</li>
            <li>We'll deliver it to your doorstep</li>
          </ol>
        </Section>
        <Section
          css={css`
            padding: 5rem 0;
          `}
        >
          <h2 css={css`
            text-align: center;
          `}>Frequently Asked Questions</h2>
          <ol>
            <li>Send us a link to your file</li>
            <li>We'll create a sample</li>
            <li>We'll deliver it to your doorstep</li>
          </ol>
        </Section>
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
      relatedProducts {
        ...ProductCardFragment
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`