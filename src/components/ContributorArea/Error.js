import React from 'react';
import { Heading, Text } from './AreaTypography';
import styled from '@emotion/styled';

import { MdSentimentDissatisfied } from 'react-icons/md';

import { animations, colors, spacing } from '../../utils/styles';

const ErrorRoot = styled('div')`
  animation: ${animations.simpleEntry};

  ${Heading} {
    svg {
      color: red;
      height: 30px;
      margin-right: ${spacing.xs}px;
      vertical-align: top;
      width: 30px;
    }
  }
`;

const ErrorText = styled('pre')`
  background: ${colors.lightest};
  border-radius: 3px;
  padding: ${spacing.sm}px ${spacing.md}px;

  pre {
    color: ${colors.text};
    font-size: 0.9rem;
    margin: 0;
    padding: 0;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
`;

const Error = ({ error }) => (
  <ErrorRoot>
    <Heading>
      <MdSentimentDissatisfied />
      载入您的订单信息时候出错
    </Heading>
    <Text>以下是来自服务器的错误信息：</Text>
    <ErrorText>
      <pre>{error}</pre>
    </ErrorText>
    <Text>
      请重新载入页面，试一下. 如果仍有问题，可以{' '}
      <a href="https://github.com/gatsbyjs/store.gatsbyjs.org/issues">
        打开一个issue
      </a>{' '}
      我们将找出问题出在哪儿。
    </Text>
  </ErrorRoot>
);

export default Error;
