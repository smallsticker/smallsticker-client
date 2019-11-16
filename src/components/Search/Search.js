import React from 'react';
import ReactModal from 'react-modal';
import styled from '@emotion/styled';
import {
  breakpoints,
  colors,
  radius,
  fonts,
  dimensions,
  spacing
} from '../../utils/styles';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Hits,
  PoweredBy
} from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  'E2NW58E8YJ',
  'd31580cad0de9c8666aadb9d679ea321'
);

const Modal = styled(ReactModal)`
  &.Modal {
    background: ${colors.lightest};
    position: fixed;
    top: ${dimensions.headerHeight};
    left: 30%;
    right: 30%;
  }
  &.Overlay {
    background: ${colors.lightest};
  }
`;
const customStyles = {
  content: {
    top: `${dimensions.headerHeight}`,
    borderTop: 'none',
    borderRadius: 'none',
    margin: 'auto',
    width: '40%'
  }
};

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
  handleOpenModal() {
    this.setState({ showModal: true });
  }
  handleCloseModal() {
    this.setState({ showModal: false });
  }
  render() {
    return (
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
            placeholder: '产品搜索'
          }}
        />
        <ReactModal
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          contentLabel="搜索产品"
          style={customStyles}
        >
          <Hits />
          <PoweredBy />
        </ReactModal>
      </InstantSearch>
    );
  }
}

export default Search;
