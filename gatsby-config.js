let activeEnv = process.env.ACTIVE_ENV || process.env.NODE_ENV || "development"

console.log(`Using environment config: '${activeEnv}'`)

require("dotenv").config({path: `.env.${activeEnv}`})

const siteUrl = activeEnv === 'development' ? 'http://localhost:8000' : 'https://anotherswag.com/' 

console.log('storage bucket:', process.env.GATSBY_STORAGE_BUCKET)
module.exports = {
  siteMetadata: {
    title: `AnotherSwag`,
    description: `Custom handmade swag made for forward-thinking companies.`,
    author: `@vince_parulan`,
    titleTemplate: ``,
    url: `https://anotherswag.com/`,
    siteUrl,
    twitterUsername: `@anotherswag`,
    image: `/images/gatsby-astronaut.png`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        typekit: {
          id : `xks8taf`
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-snipcart`,
      options: {
        apiKey: process.env.SNIPCART_API_KEY,
        autopop: true,
      }
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
