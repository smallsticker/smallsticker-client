import React from 'react';
import styled from '@emotion/styled';
import { GoMarkGithub } from 'react-icons/go';

import { login } from '../../utils/auth';
import { Button as BaseButton } from '../shared/Buttons';
import { Heading, SectionHeading, Text } from './AreaTypography';
import { spacing, animations } from '../../utils/styles';

const ContentForGuestRoot = styled(`div`)`
  animation: ${animations.simpleEntry};
  position: relative;
`;

const FirstHeading = styled(Heading)`
  padding-right: ${spacing.lg}px;
`;

const Button = styled(BaseButton)`
  margin: ${spacing.lg}px 0 ${spacing.xl}px 0;
`;

const ContentForGuest = () => (
  <ContentForGuestRoot>
    <FirstHeading>登录查询订单状态</FirstHeading>

    <Text>登录与您订单信息里的邮箱地址关联的GitHub账号！</Text>
    <Button inverse onClick={e => login()}>
      GitHub登录 <GoMarkGithub />
    </Button>
    <SectionHeading>优惠信息</SectionHeading>
    <Heading>满50免运费啦！</Heading>
    <Text>单笔订单商品总额达到50元，免运费！</Text>
  </ContentForGuestRoot>
);

export default ContentForGuest;
