import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'
import { FaShoppingCart } from 'react-icons/fa'

import { media } from '../utils/media'

const Nav = styled.nav`
  height: ${props => props.theme.headerHeight};
  position: absolute;
  width: 100%;
  border-bottom: 1px solid #f5f3f7;
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
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 14px;

  ${media.desktop`
    max-width: ${props => props.theme.sizes.maxWidth};
    margin: auto;
  `}
`

const Cart = styled.button`
  border: none;
`
const Header = ({ siteTitle }) => (
  <Nav>
    <Container>
      <span>
        <NavLink
          to="/"
        >
          {siteTitle}
        </NavLink>
      </span>
      <Cart
        className="snipcart-checkout"
      >
        <FaShoppingCart />
      </Cart>
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
