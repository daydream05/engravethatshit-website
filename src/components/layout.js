import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
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
          <div>
            <Header siteTitle={data.site.siteMetadata.title} />
            {children}
          </div>
        </ThemeProvider>
        {/* Footer placed in seperate ThemeProvider to avoid Rendering an extra DIV in HTML output  */}
        <ThemeProvider theme={theme}>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </ThemeProvider>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
