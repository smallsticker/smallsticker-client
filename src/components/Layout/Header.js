import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import Logo from './Logo';
import Search from '../Search';
import {
  breakpoints,
  colors,
  radius,
  fonts,
  dimensions,
  spacing
} from '../../utils/styles';

const HeaderRoot = styled('header')`
  align-items: center;
  background-color: ${colors.lightest};
  border-bottom: 1px solid ${colors.brandLight};
  box-sizing: border-box;
  display: ${props => (props.isCovered ? 'none' : 'flex')};
  height: ${dimensions.headerHeight};
  justify-content: space-between;
  left: 0;
  padding-left: ${spacing.md}px;
  padding-right: ${spacing['3xl']}px;
  position: sticky;
  right: 0;
  top: 0;
  z-index: 1000;

  @media (min-width: ${breakpoints.desktop}px) {
    &.covered {
      display: none;
    }
  }
`;

const HomeLink = styled(Link)`
  display: block;
  flex-shrink: 0;
  line-height: 1;
  margin-right: auto;
`;

const SearchBox = styled(`div`)`
  position: absolute;
  margin-left: 40%;
  width: 20%;
  form {
    display: flex;
  }
  input {
    background-color: ${colors.lightest};
    border: 1px solid ${colors.brandBright};
    border-radius: ${radius.default}px;
    color: ${colors.text};

    font-size: 1rem;
    padding: ${spacing.sm}px ${spacing.md}px;
    width: 100%;

    :focus {
      box-shadow: 0 0 0 3px ${colors.accent};
      outline: 0;
      transition: box-shadow 0.15s ease-in-out;
    }
  }
  button {
    margin-left: 4px;
    align-items: center;
    background: ${colors.lightest};
    border: 1px solid ${colors.white};
    border-radius: ${radius.default}px;
    color: ${colors.brandLight};
    cursor: pointer;

    font-family: ${fonts.heading};
    font-size: 1rem;
    justify-content: center;
    padding: 0.5em 0.75rem;
    transition: 0.5s;

    :focus {
      box-shadow: 0 0 0 3px ${colors.accent};
      outline: 0;
      transition: box-shadow 0.15s ease-in-out;
    }

    svg {
      height: 1em;

      width: 1em;
    }

    @media (hover: hover) {
      &:hover {
        box-shadow: 0 0 0 1px ${colors.accent};
      }
    }
  }
`;

class Header extends Component {
  state = {
    className: ''
  };

  componentDidUpdate(prevProps) {
    if (this.props.isDesktopViewport) {
      const imageBrowserStatusChanged =
        this.props.productImagesBrowserStatus !==
        prevProps.productImagesBrowserStatus;

      if (imageBrowserStatusChanged) {
        if (this.props.productImagesBrowserStatus === 'open') {
          setTimeout(() => {
            this.setState({
              className: 'covered'
            });
          }, 500);
        } else {
          this.setState({
            className: ''
          });
        }
      }
    }
  }

  render() {
    const { className } = this.state;

    return (
      <HeaderRoot className={className}>
        <HomeLink to="/" aria-label="Home page">
          <Logo />
        </HomeLink>
        <SearchBox>
          <Search />
        </SearchBox>
      </HeaderRoot>
    );
  }
}

Header.propTypes = {
  productImagesBrowserStatus: PropTypes.string.isRequired,
  isDesktopViewport: PropTypes.bool
};

export default Header;
