import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../Components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
    };
    this.controlBtn = this.controlBtn.bind(this);
  }

  controlBtn({ target: { name, value } }) {
    const min = 2;
    this.setState({
      [name]: value,
    });
    if (name === 'inputName') {
      const textSize = value.length;
      if (textSize >= min) {
        this.setState({
          buttonDisabled: false,
        });
      }
    }
  }

  render() {
    const { buttonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            name="inputName"
            type="text"
            data-testid="search-artist-input"
            placeholder="Artista"
            onChange={ this.controlBtn }
          />
          <button
            name="button"
            data-testid="search-artist-button"
            type="submit"
            disabled={ buttonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Search;
