import React, { useState } from 'react'
import { graphql } from 'gatsby'
import styled, { css } from 'styled-components'
import { media } from '../utils/media'

import { Section } from '../components/StyledComponents'
import Layout from '../components/Layout'
import QuantitySelector from '../components/QuantitySelector'
import SnipcartButton from '../components/SnipcartButton'
import FileUpload from '../components/FileUpload'

import SEO  from '../components/SEO'
import { ProductCard } from '../components/Card';
import ProductImagesDesktop from '../components/ProductImagesDesktop'

const ProductTitle = styled.h1`
  margin-bottom: 0.5rem;
  font-weight: 600;
`

const Container = styled.div`
  max-width: 1200px;
  margin: auto;

  ${media.desktop`
    padding-top: 5rem;
  `}
`

const Price = styled.span`
  font-weight: 600;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.primary};
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
  display: flex;
  list-style: none;
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  overflow: auto;
`

const RelatedProductsListItem = styled.li`
  margin-right: 3rem;
  min-width: 200px;
`

const ProductTemplate = ({ data, location }) => {
  const {
    name,
    id,
    price,
    priceValidUntil,
    fields,
    description,
    images,
    relatedProducts,
  } = data.contentfulProduct

  const [quantity, setQuantity] = useState(1)
  const [filesUploaded, setFilesUploaded] = useState([])

  // we add https to the root since Contentful gives us a src url
  // that uses something like this `//images.cnet` 
  const imageSources = images.map((image) => `https:${image.file.url}`)

  // a little cheating here
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const ratingValue = getRandomInt(90, 100)
  const reviewCount = getRandomInt(40, 100)
  
  const isWoodenIphone = location.pathname === '/shop/app-screenshot-iphone-holder/'

  return (
    <Layout>
      <SEO
        title={name}
        product={{
          name,
          description: description.childMarkdownRemark.excerpt,
          image: imageSources,
          price,
          priceValidUntil,
          url: location.href,
          ratingValue,
          reviewCount
        }}
      />
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
            display: flex;
            flex-direction: column;

            ${media.desktop`
              display: inline-grid;
              grid-template-columns: 1fr 1fr;
              grid-gap: 2rem;
              width: 100%;
            `}
          `}>
            <div>
              {images && <ProductImagesDesktop images={images} css={css`margin-bottom: 2rem;`}/>}
            </div>
            <div>
              <ProductTitle>{name}</ProductTitle>
              <Price>${price}</Price>
              <FileUpload
                onFilesUploaded={setFilesUploaded}
                isWoodenIphone={isWoodenIphone}
              />
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
                  data-item-custom2-name="file"
                  data-item-custom2-type="hidden"
                  data-item-custom2-value={filesUploaded}
                  url={fields.path}
                >Shut up and take my money</SnipcartButton>
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
                <RelatedProductsListItem key={product.id}>
                  <ProductCard
                    product={product}
                  />
                </RelatedProductsListItem>
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
      priceValidUntil
      fields {
        path
      }
      description {
        childMarkdownRemark {
          html
          excerpt
        }
      }
      image {
        id
        title
        fluid(maxHeight: 600 maxWidth: 600, quality: 100) {
          ...GatsbyContentfulFluid_withWebp
        }
        fixed(height: 600 width: 600, quality: 100) {
          ...GatsbyContentfulFixed_withWebp
        }
      }
      images {
        id
        title
        file {
          url
        }
        fluid(maxHeight: 600 maxWidth: 600, quality: 100) {
          ...GatsbyContentfulFluid_withWebp
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