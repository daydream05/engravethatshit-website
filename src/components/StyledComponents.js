import { Link } from 'gatsby'
import styled from 'styled-components'

import { media } from '../utils/media'
export const Section = styled.section`
  ${media.desktop`
    height: ${props => props.fullPage ? `100vh` : null};
  `}
`

export const UnstyledLink = styled(Link)`
  text-decoration: none;

  :active {
    text-decoration: none;
  }
`