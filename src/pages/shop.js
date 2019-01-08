import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import SEO from '../components/SEO'

const PageTitle = styled.h1`
  color: ${props => props.theme.colors.primary};
`
const Shop = () => (
  <Layout>
    <SEO title="Page two" />
    <PageTitle>Shop</PageTitle>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default Shop
