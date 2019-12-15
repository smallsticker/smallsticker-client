require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

const myQuery = `{
    allStrapiProduct(sort: { fields: [createdAt], order: ASC }) {
      edges {
        node {
          id
          handle
          title
          description
          productType
          variants {
            shopifyId: id
            title
            price
            availableForSale
          }
          images {
            id
            altText
          }
        }
      }
    }
}`;

const queries = [
  {
    query: myQuery,
    transformer: ({ data }) =>
      data.allStrapiProduct.edges.map(({ node }) => node), // optional
    indexName: 'Products', // overrides main index name, optional
    settings: {
      // optional, any index settings
    }
  }
];

module.exports = {
  siteMetadata: {
    siteUrl: 'https://test.smallsticker.com',
    title: '在这儿，找到您喜欢的贴纸！',
    description: '为了程序员方便买到喜欢的贴纸，我们建立这个贴纸商店！'
  },
  plugins: [
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout/`)
      }
    },
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: process.env.STRAPI_API,
        queryLimit: 1000,
        contentTypes: [`product`],
        loginData: {
          identifier: process.env.IDENTIFIER,
          password: process.env.PASSWORD
        }
      }
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME, // for all queries
        queries,
        chunkSize: 10000 // default: 1000
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: '小贴画',
        short_name: '小贴画',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'static/android-chrome-512x512.png'
      }
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-93349937-6',
        respectDNT: true
      }
    }
  ]
};
