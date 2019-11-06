import React from 'react';
import QRCode from 'qrcode.react';
import styled from '@emotion/styled';
import { Boxer } from '@smooth-ui/core-em';

import {
  TextContainer,
  Text as BaseText
} from '../components/shared/Typography';

const Text = styled(BaseText)`
  text-align: center;
`;

export default ({ location }) => {
  if (location.state) {
    return (
      <Boxer width={{ xs: 1, sm: 0.8, md: 0.6, lg: 0.5 }} m="auto">
        <TextContainer>
          <Text>
            <QRCode value={location.state.qrcode} />
          </Text>
        </TextContainer>
      </Boxer>
    );
  }
  return null;
};
