import React from 'react';
import CartThumbnail from '../Cart/CartThumbnail';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import PropTypes from 'prop-types';
import { Button } from '../shared/Buttons';
import { breakpoints, colors, radius, spacing } from '../../utils/styles';

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

const Costs = styled('div')`
  display: flex;
  color: ${colors.textLight};
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
    flex-basis: 60%;
    font-size: 0.9rem;
    text-align: right;
  }

  strong {
    flex-basis: 40%;
    text-align: right;
  }
`;

const Total = styled(Cost)`
  border-top: 1px solid ${colors.textLight};
  border-bottom: 1px solid ${colors.textLight};
  margin-top: ${spacing.xs}px;
  padding-top: ${spacing.sm}px;

  span {
    font-weight: bold;
    text-transform: uppercase;
  }

  strong,
  span {
    color: inherit;
    padding-bottom: ${spacing.sm}px;
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
  padding: ${spacing.md}px 0;

  span {
    flex-basis: 80px;
    flex-grow: 0;
    font-size: 1rem;
    padding-bottom: ${spacing.xs}px;
    text-align: center;
  }
`;

const CartListItemRoot = styled('li')`
  align-items: center;
  color: ${colors.textLight};
  border-bottom: 1px solid ${colors.textLight};
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

const Quantity = styled('span')`
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
  color: ${props =>
    props.disable === true ? colors.textLight : colors.lightest};
  display: block;
  text-decoration: none;
  transition: 1s;
  border: 1px solid
    ${props => (props.disable === true ? colors.textLight : colors.lightest)};
  border-radius: ${radius.default}px;
  pointer-events: ${props => (props.disable === true ? 'none' : '')};
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
      box-shadow: 0 0 0 1px ${colors.accent};

      svg {
        animation: ${swing} 0.5s ease infinite;
      }
    }
  }
  @media (hover: focus) {
    box-shadow: 0 0 0 3px ${colors.accent};
    outline: 0;
    transition: box-shadow 0.15s ease-in-out;
  }
`;

const OpenIssuesList = ({ issues }) => (
  <OpenIssuesListRoot>
    {issues.map(issue => (
      <Issue key={issue.id}>
        <Headers>
          <span>{issue.createdAt}</span>
          <span>{issue.status}</span>
          <span>
            <Link
              href={`https://www.kuaidi100.com/chaxun?com=zhongtong&nu=${issue.expressNo}`}
              disable={issue.status === '已支付' ? true : false}
              target="_blank"
            >
              快递跟踪
            </Link>
          </span>
        </Headers>
        <CartListRoot>
          {issue.checkout.items.map(item => (
            <CartListItemRoot key={item.id}>
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

              <Quantity>{item.quantity}</Quantity>
            </CartListItemRoot>
          ))}
        </CartListRoot>

        <Costs>
          <Cost>
            <span>小计:</span>{' '}
            <strong>RMB ¥{issue.checkout.subtotalPrice}</strong>
          </Cost>
          <Cost>
            <span>运费:</span>
            <strong>RMB ¥{issue.checkout.shipping}</strong>
          </Cost>
          <Total>
            <span>总计:</span>
            <strong>RMB ¥{issue.checkout.totalPrice}</strong>
          </Total>
        </Costs>
      </Issue>
    ))}
  </OpenIssuesListRoot>
);

OpenIssuesList.propTypes = {
  issues: PropTypes.array.isRequired
};

export default OpenIssuesList;
