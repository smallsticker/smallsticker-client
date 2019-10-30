import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Button as BaseButton } from '../shared/Buttons';
import { Heading, Lede, Text } from './AreaTypography';
import { spacing, animations } from '../../utils/styles';

const ContentForNotContributorRoot = styled(`div`)`
  animation: ${animations.simpleEntry};
`;

const Button = styled(BaseButton)`
  margin: ${spacing.lg}px 0 ${spacing.xl}px 0;
`;

class ContentForNotContributor extends Component {
  render() {
    const {
      profile: { username }
    } = this.props;

    return (
      <ContentForNotContributorRoot>
        <Heading>Hi, @{username}!</Heading>
        <Text>亲爱的小贴画用户，您还没有购买记录！</Text>
        <Text>一旦您下单付款成功，您可以再来这里查询实时状态。</Text>
        <Text>
          有问题 (you can tag{' '}
          <a href="https://github.com/jlengstorf">@jlengstorf</a> if you’d like)
          or hit us up{' '}
          <a href="https://twitter.com/gatsbyjs">on Twitter at @gatsbyjs</a>.
        </Text>
      </ContentForNotContributorRoot>
    );
  }
}

ContentForNotContributor.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ContentForNotContributor;
