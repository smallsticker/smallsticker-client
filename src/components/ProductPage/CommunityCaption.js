import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { MdClose, MdKeyboardArrowUp } from 'react-icons/md';

import {
  breakpoints,
  dimensions,
  colors,
  radius,
  spacing
} from '../../utils/styles';

const CommunityCaptionRoot = styled(`div`)`
  bottom: ${spacing.xl}px;
  bottom: calc(
    ${dimensions.pictureBrowserAction.heightMobile} + ${spacing.md}px
  );
  color: ${colors.lightest};
  cursor: default;
  display: ${props => (props.superZoom ? 'none' : 'block')};
  left: ${spacing.md}px;
  position: fixed;
  right: ${spacing.md}px;

  @media (min-width: ${breakpoints.desktop}px) {
    bottom: ${spacing.lg}px;
    left: calc(50% + (${dimensions.pictureBrowserAction.widthDesktop} / 2));
    max-width: 500px;
    right: auto;
    transform: translateX(-50%);
  }
`;

const Toggle = styled(`button`)`
  align-items: center;
  background: transparent;
  border: 0;
  border-radius: ${radius.large}px ${radius.large}px 0 0;
  cursor: pointer;
  display: flex;
  height: 46px;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  width: 46px;

  svg {
    color: ${colors.lightest};
    height: 36px;
    width: 36px;
  }
`;

const Caption = styled(`div`)`
  background: rgba(0, 0, 0, 0.7);
  border-radius: ${radius.large}px ${radius.large}px 0 0;
  font-size: 1.1rem;
  padding: ${spacing.sm}px ${spacing.lg}px;
  padding-right: calc(${spacing.lg}px + 46px);
  width: 100%;

  p {
    margin: 0;
  }

  .minimized & {
    border-radius: ${radius.large}px 0 0 ${radius.large}px;
  }
`;

const UserPhotoHint = styled(`div`)`
  background: rgba(68, 34, 102, 0.9);
  border-radius: 0 0 ${radius.large}px ${radius.large}px;
  cursor: pointer;
  font-size: 0.9rem;
  padding: ${spacing.sm}px ${spacing.lg}px;
  position: relative;
  width: 100%;

  .minimized & {
    display: none;
  }

  span:last-child {
    display: none;
  }

  &.expanded {
    span:last-child {
      display: inline;
    }
    strong {
      display: none;
    }
  }

  a {
    color: inherit;
  }
`;

class CommunityCaption extends Component {
  state = {
    minimized: false,
    incentiveExpanded: false
  };

  toggle = e => {
    e.preventDefault();
    e.stopPropagation();

    this.setState(state => ({
      minimized: !state.minimized,
      hintExpanded: false
    }));
  };

  toggleIncentive = e => {
    if (!e.target.href) {
      e.preventDefault();
      e.stopPropagation();

      this.setState(state => ({ hintExpanded: !state.hintExpanded }));
    }
  };

  render() {
    const { caption, superZoom } = this.props;
    const { minimized, hintExpanded } = this.state;

    return (
      <CommunityCaptionRoot
        superZoom={superZoom}
        className={minimized ? 'minimized' : ''}
      >
        <Caption>
          {minimized ? (
            <p>查看提示</p>
          ) : (
            <p dangerouslySetInnerHTML={{ __html: caption }} />
          )}
        </Caption>
        <UserPhotoHint
          onClick={this.toggleIncentive}
          className={hintExpanded ? 'expanded' : ''}
        >
          <span>我们想要看到贴纸在您的装备上的效果</span>{' '}
          <strong>更多...</strong>
          <span>
            上传您的照片到{' '}
            <a href="https://github.com/smallsticker/smallsticker-client/issues/1">
              官方图片分享 issue
            </a>{' '}
            您的照片有机会放到小贴画网站上哦！
          </span>
        </UserPhotoHint>
        <Toggle onClick={this.toggle}>
          {minimized ? <MdKeyboardArrowUp /> : <MdClose />}
        </Toggle>
      </CommunityCaptionRoot>
    );
  }
}

CommunityCaption.propTypes = {
  caption: PropTypes.string.isRequired,
  superZoom: PropTypes.bool.isRequired
};

export default CommunityCaption;
