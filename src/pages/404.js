import React from 'react';
import { Heading, Text, TextContainer } from '../components/shared/Typography';

const NotFoundPage = () => (
  <TextContainer>
    <Heading>没事，找不到您打开的页面 (404)</Heading>
    <Text>
      您请求的页面不存在，或者被移除。 如果您认为这是一个错误， 请{' '}
      <a href="https://github.com/smallsticker/smallsticker-client/issues/new">
        打开一个 issue
      </a>{' '}
      让我们知道，谢谢！
    </Text>
  </TextContainer>
);

export default NotFoundPage;
