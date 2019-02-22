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
      <Section
        fullPage
        css={css`
          background-color: rgb(111, 47, 160);
          ${media.desktop`
            display: grid;
            grid-template-columns: 1fr 1fr;
            background-color: ${props => props.theme.colors.primary};
            color: ${props => props.theme.colors.white};
        `}
        `}
      >
        <div css={css`
          padding: 16px;
          background-color: ${props => props.theme.colors.primary};
          ${media.desktop`
            padding: 0;
            height: inherit;
          `}
        `}>
          <Img
            fluid={ledProduct.image.fluid}
            css={css`
              height: 400px;
              ${media.desktop`
                height: 100%;
                padding-bottom: 0;
              `}
            `}
          />
        </div>
        <FeaturesContainer>
          <h2 css={css`
            font-weight: 500;
            font-size: 18px;
            color: #FFFFFF;
            text-transform: uppercase;
            margin-bottom: 4rem;
          `}>Features</h2>
          <div>
            <div>
              <FeatureTitle>Works with AA batteries</FeatureTitle>
              <FeatureDescription>Say goodbye to 10% battery life left icon while admiring your beautiful creation.</FeatureDescription>
            </div>
            <div>
              <FeatureTitle>Offline mode</FeatureTitle>
              <FeatureDescription>Has a built-in offline mode right out of the box. No need to install a service worker. And no need to spend your hard-earned VC money on those pesky AWS fees every month. </FeatureDescription>
            </div>
            <div>
              <FeatureTitle>Multi-color LED</FeatureTitle>
              <FeatureDescription>In case your team realizes “Facebook  Blue” is out and “Spotify Green” is in.<br/><br/>(Sorry we don't do gradients)</FeatureDescription>
            </div>
            <ShopButton to="/shop/" css={css`margin: auto;`}>Shop now</ShopButton>
          </div>
        </FeaturesContainer>
      </Section>
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
