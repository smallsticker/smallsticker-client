import React from 'react';
import gql from 'graphql-tag';
import styled from '@emotion/styled';
import { Query } from 'react-apollo';
import { GoMarkGithub } from 'react-icons/go';

import { Subheading, Text } from './AreaTypography';
import OpenIssuesList from './OpenIssuesList';
import { spacing } from '../../utils/styles';

const OpenIssuesRoot = styled(`div`)`
  margin-top: ${spacing['2xl']}px;
`;

const OpenIssues = ({ issues }) => (
  <OpenIssuesRoot>
    <Subheading>Issues We Could Use Your Help With</Subheading>
    <OpenIssuesList issues={issues} />
  </OpenIssuesRoot>
);

export default OpenIssues;
