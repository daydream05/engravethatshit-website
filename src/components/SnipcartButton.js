import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: ${props => props.theme.colors.primary};
  height: 64px;
  color: ${props => props.theme.colors.white};
  font-size: 18px;
  cursor: pointer;
  padding: 0 2rem;
  justify-self: flex-end;
`

// The purpose of this function is to make it easier to append the siteUrl
// w/o having to duplicate it every single time.
export default function SnipcartButton({ children, url, className, ...rest }) {
  return (
    <StaticQuery
      query={graphql`
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
        }
      `}
      render={data => {
        // I added data-item-custom1-name="Website/App URL" and
        // data-item-custom1-required="true" since they are custom values that i need
        // for my use case. You can read more about Snipcart's custom values here
        // https://docs.snipcart.com/configuration/custom-fields
        // You can remove them if you need to.
        return (
          <Button
            className={className}
            data-item-url={`${data.site.siteMetadata.siteUrl}/${url || ''}`}
            data-item-custom1-name="Website/App URL"
            data-item-custom1-required="true"
            {...rest}
          >{children}</Button>
        )
      }}
    />
  )
}

SnipcartButton.propTypes = {
  url: PropTypes.string,
}

SnipcartButton.defaultProps = {
  url: '',
}