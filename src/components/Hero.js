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

  ${media.desktop`
    max-width: 450px;
    padding: 0;
    margin: auto;
  `}
`

const HeroTitle = styled.h1`
  font-size: 24px;

  ${media.desktop`
    font-size: 48px;
  `}
`

const HeroSubTitle = styled.p`
  ${media.desktop`
    font-family: 500;
    font-size: 18px;
    color: ${props => props.theme.colors.darkGray};
  `}
`

const ShopButton = styled(Link)`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  height: 48px;
  border-radius: 4px;
  width: 200px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`
const ImgContainer = styled.div`
`
const Hero = props => {
  const { image } = props
  return (
    <Section
      fullPage
      css={css`
        padding: 16px;
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
        <HeroTitle>Your website or app engraved.</HeroTitle>
        <HeroSubTitle>Because having it on your phone isn't enough.</HeroSubTitle>
        <ShopButton to="/shop/">Shop now</ShopButton>
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