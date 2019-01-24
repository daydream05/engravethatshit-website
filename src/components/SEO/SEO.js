import React from "react"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

const SEO = ({ title, description, image, pathname, article, product}) => (
  <StaticQuery
    query={query}
    render={({
      site: {
        siteMetadata: {
          defaultTitle,
          titleTemplate,
          defaultDescription,
          siteUrl,
          defaultImage,
          twitterUsername,
        },
      },
    }) => {
      const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        image: `${siteUrl}${image || defaultImage}`,
        url: `${siteUrl}${pathname || "/"}`,
      }

      // We add a data type to this array whenever we provide
      // it as a product, article, etc.
      const schemaOrgJSONLD = []

      // This is based on the structured data provided by google
      // https://developers.google.com/search/docs/data-types/product
      // I've only included parts of it and made some default
      // out of laziness, but feel free to add more
      if (product) {
        const {
          name,
          image,
          description,
          mpn,
          inStock = true,
          price,
          priceValidUntil,
          url
        } = product

        schemaOrgJSONLD.push({
          "@context": "https://schema.org/",
          "@type": "Product",
          name,
          image,
          description,
          mpn,
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            price,
            url,
            priceValidUntil,
            // default is true
            availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          }
        })
      }

      return (
        <>
          <Helmet title={seo.title} titleTemplate={titleTemplate}>
            <meta name="description" content={seo.description} />
            <meta name="image" content={seo.image} />
            {seo.url && <meta property="og:url" content={seo.url} />}
            {(article ? true : null) && (
              <meta property="og:type" content="article" />
            )}
            {seo.title && <meta property="og:title" content={seo.title} />}
            {seo.description && (
              <meta property="og:description" content={seo.description} />
            )}
            {seo.image && <meta property="og:image" content={seo.image} />}
            <meta name="twitter:card" content="summary_large_image" />
            {twitterUsername && (
              <meta name="twitter:creator" content={twitterUsername} />
            )}
            {seo.title && <meta name="twitter:title" content={seo.title} />}
            {seo.description && (
              <meta name="twitter:description" content={seo.description} />
            )}
            {seo.image && <meta name="twitter:image" content={seo.image} />}
            {product && (
              <script type="application/ld+json">{JSON.stringify(schemaOrgJSONLD)}</script>
            )}
          </Helmet>
        </>
      )
    }}
  />
)

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool,
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.array,
    price: PropTypes.number.isRequired,
    inStock: PropTypes.bool,
    url: PropTypes.string.isRequired,
    priceValidUntil: PropTypes.string,
  })
}

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  pathname: null,
  article: false,
  product: null,
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl: url
        defaultImage: image
        twitterUsername
      }
    }
  }
`