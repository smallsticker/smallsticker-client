import React from 'react';
import styled from '@emotion/styled';
import { Boxer } from '@smooth-ui/core-em';

import {
  TextContainer,
  Text as BaseText
} from '../components/shared/Typography';

const Text = styled(BaseText)`
  text-align: center;
`;

export default () => {
  return (
    <Boxer width={{ sm: 1, md: 0.8 }} m="auto">
      <TextContainer>
        <Text>
          支付成功，我们会第一时间安排发货，敬请耐心等待，您也可以登录查询实时订单状态，祝您生活愉快！
        </Text>
      </TextContainer>
    </Boxer>
  );
};
