import React from 'react';
import ReactModal from 'react-modal';
import styled from '@emotion/styled';

import {
  dimensions,
  colors,
  breakpoints,
  radius,
  spacing,
  fonts
} from '../../utils/styles';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox } from 'react-instantsearch-dom';
import Hits from './hits';

const searchClient = algoliasearch(
  'E2NW58E8YJ',
  'd31580cad0de9c8666aadb9d679ea321'
);

const Box = styled(`div`)`
  position: absolute;
  margin-left: 30%;
  width: 60%;
  form {
    display: flex;
  }
  @media (min-width: ${breakpoints.desktop}px) {
    margin-left: 30%;
    width: 40%;
  }
  input {
    background-color: ${colors.lightest};
    border: 1px solid ${colors.brandBright};
    border-radius: ${radius.default}px;
    color: ${colors.text};
    -webkit-appearance: none;

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

const Modal = styled(ReactModal)`
  &.content {
    position: fixed;
    top: ${dimensions.headerHeight};
    width: 100%;
    bottom: 0px;
    background: ${colors.lightest};
    overflow: auto;
    webkitoverflowscrolling: touch;
    outline: none;
    padding: 20px;
    @media (min-width: ${breakpoints.desktop}px) {
      border: 1px solid ${colors.brandBright};
      border-top: 0;
      margin-left: 30%;
      width: 40%;
    }
  }
  &.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
  }
`;

ReactModal.setAppElement('#___gatsby');
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  componentDidMount() {
    document.addEventListener('click', this.handleCloseModal);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleCloseModal);
  }
  handleOpenModal() {
    this.setState({ showModal: true });
  }
  handleCloseModal() {
    this.setState({ showModal: false });
  }
  render() {
    return (
      <Box>
        <InstantSearch indexName="Products" searchClient={searchClient}>
          <SearchBox
            autoFocus={true}
            focusShortcuts={['s']}
            searchAsYouType={true}
            onSubmit={event => {
              event.preventDefault();
              this.handleOpenModal();
            }}
            onReset={event => {
              this.handleCloseModal();
            }}
            translations={{
              placeholder: '搜索产品...'
            }}
          />
          <Modal
            isOpen={this.state.showModal}
            onRequestClose={this.handleCloseModal}
            contentLabel="搜索产品"
            className="content"
            portalClassName="overlay"
            // style={customStyles}
            contentRef={node => (this.contentRef = node)}
          >
            <Hits />
          </Modal>
        </InstantSearch>
      </Box>
    );
  }
}

export default Search;
