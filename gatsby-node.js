const path = require('path');

exports.createPages = async ({
  graphql,
  actions: { createPage, createRedirect }
}) => {
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

  createRedirect({
    fromPath: '%2f%e8%b4%b4%e7%ba%b8%2findex.html',
    toPath: '/product/vue',
    isPermanent: true
  });
};
