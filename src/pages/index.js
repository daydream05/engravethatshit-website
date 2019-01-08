import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import Hero from '../components/Hero'
import SEO from '../components/SEO'

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Hero
      image={<Image />}
    />
  </Layout>
)

export const homePagQuery = graphql`
  query {
    contentfulProduct {
      name
      price
      image {
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
