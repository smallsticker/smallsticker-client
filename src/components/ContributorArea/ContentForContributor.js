import React from 'react';
import styled from '@emotion/styled';
import OpenIssues from './OpenIssues';

import UserContext from '../../context/UserContext';
import { Heading, Text } from './AreaTypography';

import { animations } from '../../utils/styles';

const ContentForContributorRoot = styled(`div`)`
  animation: ${animations.simpleEntry};
`;

const ContentForContributor = () => (
  <UserContext.Consumer>
    {({ contributor }) => {
      return (
        <ContentForContributorRoot>
          <Heading>谢谢您的支持！</Heading>
          <Text>
            因为有您，开源社区更美好，您有 <strong>{contributor.length}</strong>{' '}
            个订单
          </Text>
          <OpenIssues issues={contributor} />
        </ContentForContributorRoot>
      );
    }}
  </UserContext.Consumer>
);

export default ContentForContributor;
