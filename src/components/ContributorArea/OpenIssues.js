import React from 'react';
import styled from '@emotion/styled';

import OpenIssuesList from './OpenIssuesList';
import { spacing } from '../../utils/styles';

const OpenIssuesRoot = styled(`div`)`
  margin-top: ${spacing['2xl']}px;
`;

const OpenIssues = ({ issues }) => (
  <OpenIssuesRoot>
    <OpenIssuesList issues={issues} />
  </OpenIssuesRoot>
);

export default OpenIssues;
