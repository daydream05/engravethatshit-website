import { Link } from 'gatsby'
import styled from 'styled-components'

export const Section = styled.section`
  height: ${props => props.fullPage ? `100vh` : null};
`

export const UnstyledLink = styled(Link)`
  text-decoration: none;

  :active {
    text-decoration: none;
  }
`