const path = require('path');

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const pages = await graphql(`
    {
      allStrapiProduct {
        edges {
          node {
            id
            handle
          }
        }
      }
    }
  `);

  pages.data.allStrapiProduct.edges.forEach(edge => {
    createPage({
      path: `/product/${edge.node.handle}`,
      component: path.resolve('./src/templates/ProductPageTemplate.js'),
      context: {
        id: edge.node.id,
        handle: edge.node.handle
      }
    });
  });
};
