import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled, { css } from 'styled-components'

import { media } from '../utils/media'

import Layout from '../components/Layout'
import Hero from '../components/Hero'
import SEO from '../components/SEO'

import { Section } from '../components/StyledComponents'

const FeaturesContainer = styled.div`
  max-width: 500px;
  margin: auto;
  background-color: ${props => props.theme.colors.primary};
  padding: 32px 16px;
`

const FeatureTitle = styled.h3`
  font-weight: 600;
  font-size: 1.5rem;
  color: #FFFFFF;
`
const FeatureDescription = styled.p`
  font-size: 18px;
  color: #d2d2d2;
  margin-bottom: 3rem;
`

const ShopButton = styled(Link)`
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.primary};
  height: 64px;
  border-radius: 4px;
  width: 200px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  transition-duration: 200ms;
`

const IndexPage = ({ data }) => {

  const { ledProduct, woodProduct } = data
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <Hero
        image={
          <Img
            fluid={woodProduct.image.fluid}
            alt={woodProduct.title}
            css={css`
              height: 100%;
              width: 100%;
            `}
          />}
      />
    </Layout>
  )
}

export const homePagQuery = graphql`
  query {
    woodProduct: contentfulProduct(slug: { eq: "app-screenshot-iphone-holder"}) {
      name
      price
      image {
        title
        fluid {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      description {
        childMarkdownRemark {
          html
        }
      }
    }
    ledProduct: contentfulProduct(slug: { eq: "3d-led-mobile-apps"}) {
      name
      image {
        title
        fluid {
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
  }
`

export default IndexPage
