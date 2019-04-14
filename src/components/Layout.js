import React from 'react'
import PropTypes from 'prop-types'
import { css, ThemeProvider } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'

import theme from '../styles/theme'

import Header from './Header'
import './layout.css'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <ThemeProvider theme={theme}>
          <div css={css`
            background-color: ${props => props.theme.colors.black};
            color: ${props => props.theme.colors.white};
          `}>
            <Header siteTitle={data.site.siteMetadata.title} />
            {children}
          </div>
        </ThemeProvider>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
