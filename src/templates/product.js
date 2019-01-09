import React from 'react'
import { graphql } from 'gatsby'

const ProductTemplate = ({ data }) => {
  const { name } = data.contentfulProduct
  return (
    <div>
      <h1>This is {name}</h1>
    </div>
  )
}

export default ProductTemplate

export const productTemplateQuery = graphql`
  query($slug: String!) {
    contentfulProduct(slug: { eq: $slug }) {
      name
    }
  }
`