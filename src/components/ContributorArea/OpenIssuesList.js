import React from 'react';
import CartThumbnail from '../Cart/CartThumbnail';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import PropTypes from 'prop-types';
import { Input } from '../shared/FormElements';
import { Button } from '../shared/Buttons';
import {
  breakpoints,
  colors,
  radius,
  spacing,
  dimensions
} from '../../utils/styles';
const OpenIssuesListRoot = styled('ul')`
  list-style: none;
  margin: 0;
  margin-top: ${spacing.lg}px;
  padding: 0;
`;

const Issue = styled('li')`
  margin: 0;
`;

const swing = keyframes`
  25% {
    transform: translateX(10%);
  }
  75% {
    transform: translateX(-10%);
  }
`;

const Content = styled(`div`)`
  bottom: 0;
  overflow-y: auto;
  padding: ${spacing.lg}px;
  position: absolute;
  top: ${dimensions.headerHeight};
  width: 100%;

  @media (min-width: ${breakpoints.desktop}px) {
    ::-webkit-scrollbar {
      height: 6px;
      width: 6px;
    }
    ::-webkit-scrollbar-thumb {
      background: ${colors.brandBright};
    }
    ::-webkit-scrollbar-thumb:hover {
      background: ${colors.lilac};
    }
    ::-webkit-scrollbar-track {
      background: ${colors.brandLight};
    }
  }
`;

const Costs = styled('div')`
  display: flex;
  flex-direction: column;
  margin-top: ${spacing.sm}px;
`;

const Cost = styled(`div`)`
  display: flex;
  padding: 0 ${spacing.xs}px ${spacing['2xs']}px;

  :last-child {
    padding-bottom: 0;
  }

  span {
    color: ${colors.textMild};
    flex-basis: 60%;
    font-size: 0.9rem;
    text-align: right;
  }

  strong {
    color: ${colors.lilac};
    flex-basis: 40%;
    text-align: right;
  }
`;

const Total = styled(Cost)`
  border-top: 1px solid ${colors.brandBright};
  color: ${colors.brandDark};
  margin-top: ${spacing.xs}px;
  padding-top: ${spacing.sm}px;

  span {
    font-weight: bold;
    text-transform: uppercase;
  }

  strong,
  span {
    color: inherit;
  }
`;

const CartListRoot = styled('ul')`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Headers = styled(`div`)`
  border-bottom: 1px solid ${colors.brandBright};
  display: flex;
  justify-content: space-between;

  span {
    color: ${colors.textLight};
    flex-basis: 60px;
    flex-grow: 0;
    font-size: 0.8rem;
    padding-bottom: ${spacing.xs}px;
    text-align: center;

    &:first-of-type {
      flex-grow: 1;
      text-align: left;
    }
  }
`;

const CartListItemRoot = styled('li')`
  align-items: center;
  border-bottom: 1px solid ${colors.brandLight};
  display: flex;
  justify-content: space-between;
  padding: ${spacing.md}px 0;
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

const Meta = styled('span')`
  color: ${colors.textLight};
  display: block;
  font-size: 0.95rem;
  font-style: normal;
`;

const Quantity = styled(Input)`
  flex-grow: 0;
  height: 44px;
  margin-right: ${spacing.xs}px;
  padding: 0 ${spacing.xs}px 0;
  text-align: center;
  width: 50px;

  @media (min-width: ${breakpoints.desktop}px) {
    width: 70px;
  }
`;

const Remove = styled(Button)`
  border: 1px dotted ${colors.textLighter};
  display: flex;
  height: 44px;
  justify-content: center;
  margin-right: ${spacing['2xs']}px;
  padding: 0;
  width: 44px;

  svg {
    height: 24px;
    margin: 0;
    width: 24px;
  }
`;

const Link = styled('a')`
  border-radius: ${radius.large}px;
  color: ${colors.lightest};
  display: block;
  margin: 0 -${spacing.sm}px ${spacing.xs}px;
  padding: ${spacing.xs}px ${spacing.sm}px;
  text-decoration: none;
  transition: 1s;

  span {
    color: ${colors.lemon};
  }

  svg {
    color: ${colors.lemon};
    margin-right: ${spacing['2xs']}px;
    vertical-align: middle;
  }

  @media (hover: hover) {
    :hover {
      background: ${colors.brandDarker};

      svg {
        animation: ${swing} 0.5s ease infinite;
      }
    }
  }
`;

const OpenIssuesList = ({ issues }) => (
  <OpenIssuesListRoot>
    {issues.map(issue => (
      <Issue key={issue.id}>
        <Content>
          <Headers>
            <span>Product</span>
            <span>Qty.</span>
            <span>Remove</span>
          </Headers>
          <CartListRoot>
            {issue.checkout.items.map(item => (
              <CartListItemRoot>
                <Thumbnail
                  id={item.variant.image.id}
                  fallback={item.variant.image.src}
                  alt={item.variant.image.altText}
                />
                <Info>
                  <Name>{item.title}</Name>
                  <Meta>
                    {item.variant.title}, ¥{item.variant.price}
                  </Meta>
                </Info>
                <Quantity
                  aria-label="Quantity"
                  id={`quantity_${item.id.substring(58, 64)}`}
                  type="number"
                  name="quantity"
                  min="1"
                  step="1"
                  value={item.quantity}
                />
              </CartListItemRoot>
            ))}
          </CartListRoot>

          <Costs>
            <Cost>
              <span>小计:</span>{' '}
              <strong>RMB ¥{issue.checkout.subtotalPrice}</strong>
            </Cost>
            <Cost>
              <span>运费:</span> <strong>RMB ¥{issue.checkout.shipping}</strong>
            </Cost>
            <Total>
              <span>总计:</span>
              <strong>RMB ¥{issue.checkout.totalPrice}</strong>
            </Total>
          </Costs>
        </Content>
      </Issue>
    ))}
  </OpenIssuesListRoot>
);

OpenIssuesList.propTypes = {
  issues: PropTypes.array.isRequired
};

export default OpenIssuesList;
