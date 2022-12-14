import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  state = {
    albums: [],
    search: '',
    artistName: '',
    buttonDisabled: true,
    loadingPage: false,
    result: false,
    notFound: false,
  };

  controlBtn = ({ target: { name, value } }) => {
    const min = 2;
    this.setState({
      [name]: value,
    });
    if (name === 'search') {
      const textSize = value.length;
      if (textSize >= min) {
        this.setState({
          buttonDisabled: false,
        });
      }
    }
  };

  getAlbum = (artist) => {
    this.setState({
      search: '',
      loadingPage: true,
      result: true,
      artistName: artist,
    }, async () => {
      const albums = await searchAlbumsAPI(artist);
      this.setState({ albums, loadingPage: false });
      if (albums.length === 0) {
        this.setState({ notFound: true });
      }
    });
  };

  render() {
    const { buttonDisabled, albums, search,
      loadingPage, notFound, artistName, result } = this.state;
    if (notFound) { return <h2>Nenhum álbum foi encontrado</h2>; }
    if (loadingPage) { return <Loading />; }
    return (
      <div data-testid="page-search">
        <Header />
        <input
          name="search"
          type="text"
          data-testid="search-artist-input"
          placeholder="Artista"
          onChange={ this.controlBtn }
          value={ search }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ buttonDisabled }
          onClick={ () => this.getAlbum(search) }
        >
          Pesquisar
        </button>
        {result ? (
          <h3>
            {`Resultado de álbuns de: ${artistName}`}
          </h3>) : null}

        {albums.map((element, index) => (
          <div key={ index }>
            <img src={ element.artworkUrl100 } alt="album-cover" />
            <Link
              to={ `/album/${element.collectionId}` }
              data-testid={ `link-to-album-${element.collectionId}` }
            >
              {element.collectionName}
              {' '}
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default Search;
