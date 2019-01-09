/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)

exports.onCreateNode = ({ node, actions }) => {

  if(node.internal.type === `ContentfulProduct`) {
    const { createNodeField } = actions

    // We append the generated slug from Contentful to the shop path
    const pagePath = `shop/${node.slug}/`
    
    // We create the node and we can query it later through
    // fields.path

    createNodeField({
      node,
      name: `path`,
      value: pagePath,
    })
  }


}
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const loadProducts = new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulProduct {
          edges {
            node {
              slug
              fields {
                path
              }
            }
          }
        }
      }
    `).then(result => {
      const products = result.data.allContentfulProduct.edges

      products.map(({ node }) => {
        createPage({
          path: node.fields.path,
          component: path.resolve(`./src/templates/product.js`),
          context: {
            slug: node.slug,
          }
        })
      })
      resolve()
    })
  })

  return Promise.all([loadProducts])
}