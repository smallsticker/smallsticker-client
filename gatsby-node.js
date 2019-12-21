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
    fromPath: 'https://frosty-bhaskara-cc64f4.netlify.com/*',
    toPath: 'https://test.smallsticker.com/:splat',
    isPermanent: true
  });

  createRedirect({
    fromPath: '/贴纸/index.html',
    toPath: '/product/vue/index.html',
    statusCode: 200
  });
};
