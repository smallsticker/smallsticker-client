import React, { useState, useEffect } from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from '@emotion/styled';

import ProductListingHeader from './ProductListingHeader';
import ProductListingItem from './ProductListingItem';

import { breakpoints, spacing } from '../../utils/styles';

const ProductListingContainer = styled(`div`)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${spacing.lg}px;

  @media (min-width: ${breakpoints.desktop}px) {
    flex-direction: row;
    flex-wrap: wrap;
    padding: ${spacing['2xl']}px;
  }
`;

function Businesses(pageContext) {
  const { businessList } = pageContext;
  const [hasMore, setMore] = useState(businessList.length > 12);
  const [businesses, addBusinesses] = useState([...businessList.slice(0, 12)]);

  const loadBusinesses = () => {
    const currentLength = businesses.length;
    const more = currentLength < businessList.length;
    const nextBusinesses = more
      ? businessList.slice(currentLength, currentLength + 18)
      : [];
    setMore(more);
    addBusinesses([...businesses, ...nextBusinesses]);
  };

  const handleScroll = () => {
    if (!hasMore) return;
    if (
      window &&
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight
    ) {
      loadBusinesses();
    }
  };

  const handleTouchEnd = e => {
    if (e.target.localName !== 'a') {
      e.preventDefault();
      handleScroll();
    } else {
      console.log('click');
    }
  };

  useEffect(() => {
    window && window.addEventListener('touchend', handleTouchEnd);
    window && window.addEventListener('scroll', handleScroll);
    window && window.addEventListener('resize', handleScroll);
    return () => {
      window && window.removeEventListener('touchend', handleTouchEnd);
      window && window.removeEventListener('scroll', handleScroll);
      window && window.removeEventListener('resize', handleScroll);
    };
  }, [businesses, hasMore]);

  return (
    <ProductListingContainer>
      {businesses.map(({ node: product }) => (
        <ProductListingItem key={product.id} product={product} />
      ))}
      {hasMore && <div>向下滚动以加载更多内容...</div>}
    </ProductListingContainer>
  );
}

const ProductListing = () => (
  <StaticQuery
    query={graphql`
      query ProductListingQuery {
        products: allStrapiProduct(sort: { fields: [createdAt], order: ASC }) {
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
                image {
                  childImageSharp {
                    fluid(maxWidth: 910, maxHeight: 910) {
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
    render={({ products }) => (
      <>
        <ProductListingHeader />
        {Businesses({ businessList: products.edges })}
      </>
    )}
  />
);

export default ProductListing;
