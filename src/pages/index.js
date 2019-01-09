import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { css } from 'styled-components'

import Layout from '../components/Layout'
import Hero from '../components/Hero'
import SEO from '../components/SEO'

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Hero
      image={
        <Img
          fluid={data.contentfulProduct.image.fluid}
          alt={data.contentfulProduct.title}
          css={css`
            height: 100%;
            width: 100%;
          `}
        />}
    />
  </Layout>
)

export const homePagQuery = graphql`
  query {
    contentfulProduct {
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
  }
`

export default IndexPage
