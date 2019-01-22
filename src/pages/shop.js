import React from 'react'
import { graphql } from 'gatsby'
import styled, { css } from 'styled-components'

import { media } from '../utils/media'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

import { ProductCard } from '../components/Card'

const PageTitle = styled.h1`
  margin-bottom: 3rem;

  ${media.desktop`
    margin: 4rem 0;
  `}
`

const ProductList = styled.ul`
  list-style-type: none;
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100%;

  ${media.desktop`
    max-width: ${props => props.theme.sizes.maxWidth};
    margin: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
  `}

  ${media.hd`
    grid-template-columns: repeat(4, 1fr);
  `}
`

const ListItem = styled.li`
  margin-bottom: 3rem;
  ${media.desktop`
    margin-bottom: 0;
  `}
`

const Shop = ({ data }) => {

  const products = data.allContentfulProduct.edges

  return (
    <Layout>
      <SEO title="Shop" />
      <main
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 88px 16px;
        `}
      >
        <PageTitle>Products</PageTitle>
        <ProductList>
          {products.map(({ node }) => {
            return (
              <ListItem key={node.id}>
                <ProductCard product={node} />
              </ListItem>
            )
          })}
        </ProductList>
      </main>
    </Layout>
  )
}
export default Shop

export const shopPageQuery = graphql`
  query {
    allContentfulProduct {
      edges {
        node {
          name
          id
          image {
            fluid(maxHeight: 400 maxWidth: 400, quality: 100) {
              ...GatsbyContentfulFluid_withWebp
            }
            fixed(width: 300 height: 300) {
              ...GatsbyContentfulFixed_withWebp
            }
          }
          description {
            childMarkdownRemark {
              html
              excerpt
            }
          }
          price
          fields {
            path
          }
        }
      }
    }
  }
`
