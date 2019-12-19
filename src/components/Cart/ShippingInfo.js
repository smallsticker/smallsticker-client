import React, { Component } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

import { MdKeyboardArrowDown, MdInfo } from 'react-icons/md';

import { colors, radius, spacing, defaultFontStack } from '../../utils/styles';

const ShippingInfoRoot = styled(`div`)`
  background: #f5f5f5;
  border-radius: ${radius.default}px;
  margin: ${spacing.sm}px 0;
  padding: ${spacing.sm}px ${spacing.md}px;
`;

const Intro = styled(`p`)`
  color: ${colors.text};
  cursor: pointer;
  display: block;
  font-family: ${defaultFontStack};
  font-size: 0.95rem;
  margin: 0;
  position: relative;
  text-align: left;
`;

const on = keyframes`
  to {
    opacity: 1;
  }
`;

const Details = styled(Intro)`
  animation: ${on} 1s ease forwards;
  cursor: default;
  display: none;
  margin-top: ${spacing.xs}px;
  opacity: 0;
  transition: 0.5s;

  .expanded & {
    display: block;
  }
`;

const ArrowIcon = styled(MdKeyboardArrowDown)`
  color: ${colors.lilac};
  height: 26px;
  position: relative;
  stroke-width: 1px;
  transform: translateY(-10%) rotate(0);
  transition: 0.5s;
  vertical-align: top;
  width: 26px;

  .expanded & {
    transform: translateY(-10%) rotate(180deg);
  }

  ${Intro}:hover & {
    color: ${colors.accent};
  }
`;

const InfoIcon = styled(MdInfo)`
  color: ${colors.lilac};
  margin-right: ${spacing['2xs']}px;
  vertical-align: middle;
`;

class ShippingInfo extends Component {
  state = {
    detailsVisible: false
  };

  toggle = () => {
    this.setState({ detailsVisible: !this.state.detailsVisible });
  };

  render() {
    const { detailsVisible } = this.state;

    return (
      <ShippingInfoRoot className={detailsVisible ? 'expanded' : ''}>
        <Intro role="button" onClick={this.toggle}>
          <InfoIcon />
          每天<strong>17:30</strong>之前的订单，当天发货，之后的订单第二天发货。
          <ArrowIcon />
        </Intro>
        <Details>
          国内快递一般3日内收到货，您可以登录查询快递实时状态跟踪，如果您认为快递有问题，可以在微博上{' '}
          <a href="https://weibo.com/u/7356081466">@small-sticker</a>
          ,也可以发邮件到{' '}
          <a href="mailto:team@smallsticker.com">team@smallsticker.com</a>
          跟我们取得联系。
        </Details>
      </ShippingInfoRoot>
    );
  }
}

export default ShippingInfo;
