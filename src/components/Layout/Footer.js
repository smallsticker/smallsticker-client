import React from 'react';
import styled from '@emotion/styled';

import { breakpoints, colors, spacing } from '../../utils/styles';

const FooterRoot = styled('footer')`
  align-items: center;
  color: ${colors.textMild};
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
  padding: ${spacing.md}px;
  padding-bottom: calc(${spacing.xl}px + 50px);

  a {
    color: ${colors.brand};
  }

  @media (min-width: ${breakpoints.desktop}px) {
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    min-height: 50px;
    padding: 0 ${spacing.xl}px 10px;
  }
`;

const Row = styled(`span`)`
  display: inline-block;
  flex-shrink: 0;
  line-height: 1.3;
  padding-bottom: ${spacing['2xs']}px;
  text-align: center;

  @media (min-width: ${breakpoints.desktop}px) {
    line-height: 1.4;
    padding-bottom: 0;
  }
`;

const Spacer = styled(`span`)`
  display: none;

  @media (min-width: ${breakpoints.desktop}px) {
    display: inline-block;
    padding: 0 ${spacing.sm}px;
  }
`;

const Footer = () => (
  <FooterRoot>
    <Row>
      <b>有问题？&nbsp;</b>
    </Row>
    <Row>
      在微博上 <a href="https://weibo.com/u/7356081466">@small-sticker</a>
    </Row>
    <Row>
      &nbsp;或者发邮件到{' '}
      <a href="mailto:team@smallsticker.com">team@smallsticker.com</a>
    </Row>
    <Spacer>•</Spacer>
    <Row>© 2020 北京小贴画科技有限公司</Row>
    <Spacer>•</Spacer>
    <Row>
      <a href="http://www.beian.miit.gov.cn/" target="_blank">
        京ICP备17007173号
      </a>
    </Row>
    <Spacer>•</Spacer>
    <Row>
      <a
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502032685"
        target="_blank"
      >
        京公网安备11010502032685号
      </a>
    </Row>
  </FooterRoot>
);

export default Footer;
