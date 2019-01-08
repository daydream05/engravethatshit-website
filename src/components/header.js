import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'

import { media } from '../utils/media'

const Nav = styled.nav`
  height: ${props => props.theme.headerHeight};
  position: absolute;
  width: 100%;
`
const NavLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.colors.primary};

  :visited {
    color: ${props => props.theme.colors.primary};
  }
`

const Container = styled.div`
  padding: 16px;
  ${media.desktop`
    max-width: ${props => props.theme.sizes.maxWidth};
    margin: auto;
  `}
`
const Header = ({ siteTitle }) => (
  <Nav>
    <Container>
      <span
        css={css`
          font-weight: 700;
          font-size: 14px;
        `}
      >
        <NavLink
          to="/"
        >
          {siteTitle}
        </NavLink>
      </span>
    </Container>
  </Nav>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
