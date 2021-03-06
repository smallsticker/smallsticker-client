import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import Image from 'gatsby-image';

import { colors, radius } from '../../utils/styles';

const CartThumbnailRoot = styled(Image)`
  border: 1px solid ${colors.brandLight};
  border-radius: ${radius.default}px;
  height: 36px;
  width: 36px;
`;

const CartThumbnail = ({
  shopifyImages,
  id: imageId,
  fallback,
  ...imageProps
}) => {
  const image = shopifyImages.find(({ id }) => id === imageId);

  if (image) {
    imageProps.fluid = image.image.childImageSharp.fluid;
  } else {
    imageProps.src = fallback;
  }

  return <CartThumbnailRoot {...imageProps} />;
};

export default props => (
  <StaticQuery
    query={graphql`
      {
        allStrapiProduct {
          edges {
            node {
              images {
                id
                altText
                image {
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={({ allStrapiProduct: { edges } }) => {
      const images = edges
        .map(({ node }) => node.images)
        .reduce((acc, val) => acc.concat(val), []);

      return <CartThumbnail shopifyImages={images} {...props} />;
    }}
  />
);
