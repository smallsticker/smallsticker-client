import React from 'react';
import { Link } from 'gatsby';
import { connectHits, PoweredBy } from 'react-instantsearch-dom';
import CartThumbnail from '../Cart/CartThumbnail';
import styled from '@emotion/styled';
import { breakpoints, colors, spacing } from '../../utils/styles';

const CartListRoot = styled('ul')`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ItemLink = styled(Link)`
  text-decoration: none;
`;
const CartListItemRoot = styled('li')`
  align-items: center;
  color: ${colors.textLight};
  border-bottom: 1px solid ${colors.brandLight};
  display: flex;
  justify-content: space-between;
  padding: ${spacing.sm}px 0;
`;

const Thumbnail = styled(CartThumbnail)`
  flex-grow: 0;
  margin-left: ${spacing['2xs']}px;
  margin-right: ${spacing.sm}px;
`;

const Info = styled('div')`
  flex-grow: 1;
`;

const Name = styled('span')`
  display: block;
  font-size: 1rem;
  line-height: 1.2;
`;

const Quantity = styled('span')`
  flex-grow: 0;
  height: 44px;
  margin-right: ${spacing.xs}px;
  padding: ${spacing.sm}px 0;
  text-align: center;
  width: 50px;

  @media (min-width: ${breakpoints.desktop}px) {
    width: 70px;
  }
`;
const Sponsor = styled(`div`)`
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 0.1em;
  text-align: right;
  padding: 0;

  svg {
    display: inline-block;
    width: 50px;
    text-align: right;
    vertical-align: middle;
    margin-right: ${spacing.xs}px;
  }
`;
const Hits = ({ hits }) => (
  <>
    <CartListRoot>
      {hits.map(hit => (
        <ItemLink key={hit.objectID} to={`/product/${hit.handle}`}>
          <CartListItemRoot>
            <Thumbnail
              id={hit.images[0].id}
              fallback={hit.images[0].src}
              alt={hit.images[0].altText}
            />
            <Info>
              <Name>{hit.title}</Name>
            </Info>
            <Quantity>{hit.variants[0].title}</Quantity>
            <Quantity>¥{hit.variants[0].price}</Quantity>
            <Quantity>
              {hit.variants[0].availableForSale ? '有货' : '无货'}
            </Quantity>
          </CartListItemRoot>
        </ItemLink>
      ))}
    </CartListRoot>
    <Sponsor>
      <PoweredBy />
    </Sponsor>
  </>
);

const CustomHits = connectHits(Hits);
export default CustomHits;
