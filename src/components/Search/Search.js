import React from 'react';
import ReactModal from 'react-modal';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  'E2NW58E8YJ',
  'd31580cad0de9c8666aadb9d679ea321'
);

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
        >
          <Hits />
        </ReactModal>
      </InstantSearch>
    );
  }
}

export default Search;
