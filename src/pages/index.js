import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/SEO'

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
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
