import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { media } from '../utils/media'
import { Link } from 'gatsby';

import { Section } from '../components/StyledComponents'

const Content = styled.div `
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 18px;
  margin-top: 3rem;

  ${media.desktop`
    max-width: 450px;
    padding: 0;
    margin: auto;
  `}
`

const HeroTitle = styled.h1`
  font-size: 64px;
  font-family: bebas-neue, sans-serif;

  ${media.desktop`
    font-size: 128px;
    line-height: 0.8;
  `}
`

const HeroSubTitle = styled.p`
  ${media.desktop`
    font-family: 500;
    font-size: 24px;
  `}
`

const ShopButton = styled(Link)`
  background-color: ${props => props.theme.colors.primary};
  font-family: bebas-neue, sans-serif;
  color: ${props => props.theme.colors.secondary};
  height: 64px;
  width: 200px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ImgContainer = styled.div`
  height: 50%;
  
  ${media.desktop`
    height: inherit;
    padding: ${props => `${props.theme.sizes.headerHeight} 0 ${props.theme.sizes.headerHeight}`};
  `}
`
const Hero = props => {
  const { image } = props
  return (
    <Section
      fullPage
      css={css`
        background-color: ${props => props.theme.colors.black};
        color: ${props => props.theme.colors.white};
        padding: 64px 16px;
        display: flex;
        flex-direction: column-reverse;
        justify-content: center;
        ${media.desktop`
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          padding: 0;
          margin: auto;
        `}
      `}
    >
      <Content>
        <HeroTitle>Custom Handmade Swag</HeroTitle>
        <HeroSubTitle>For when your laptop can’t fit anymore stickers.</HeroSubTitle>
        <ShopButton to="/shop/">Keep talking, i'm listening</ShopButton>
      </Content>
      <ImgContainer>
        {image}
      </ImgContainer>
    </Section>
  )
}

export default Hero

Hero.propTypes = {
  image: PropTypes.object,
  content: PropTypes.node,
}

Hero.defaultProps = {
  image: null,
  content: null,
}