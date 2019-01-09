import React from 'react'
import { graphql } from 'gatsby'
import styled, { css } from 'styled-components'

import { media } from '../utils/media'

import Layout from '../components/layout'
import SEO from '../components/SEO'

import { ProductCard } from '../components/Card'

import { Section } from '../components/StyledComponents'

const PageTitle = styled.h1`
`

const ProductList = styled.ul`
  list-style-type: none;
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100%;

  ${media.desktop`
    flex-direction: row;
    padding: 64px;
    max-width: 1200px;
    justify-content: space-around;
  `}
`

const ListItem = styled.li`
  margin-bottom: 4rem;

  ${media.desktop`
    margin-bottom: none;
  `}
`

const Shop = ({ data }) => {

  const products = data.allContentfulProduct.edges

  return (
    <Layout>
      <SEO title="Page two" />
      <Section
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 64px 16px;
        `}
      >
        <PageTitle>Shop</PageTitle>
        <ProductList>
          {products.map(({ node }) => {
            return (
              <ListItem key={node.id}>
                <ProductCard product={node} />
              </ListItem>
            )
          })}
        </ProductList>
      </Section>
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
            fluid(maxHeight: 600 maxWidth: 600) {
              ...GatsbyContentfulFluid_withWebp
            }
            fixed(width: 400 height: 400) {
              ...GatsbyContentfulFixed_withWebp
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
          price
        }
      }
    }
  }
`
