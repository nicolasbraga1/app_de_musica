import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../Pages/Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      favorite: false,
      loading: false,
    };
    this.checkFavorite = this.checkFavorite.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
  }

  checkFavorite({ target: { checked } }) {
    if (checked) { this.setState({ favorite: checked }); }
  }

  addFavorite(music) {
    this.setState({ loading: true }, async () => {
      await addSong(music);
      this.setState({ loading: false });
    });
  }

  render() {
    const { music } = this.props;
    const { favorite, loading } = this.state;
    return (
      <div>
        {loading
          ? (<Loading />)
          : (
            <ul>
              <li>{music.trackName}</li>
              <audio data-testid="audio-component" src={ music.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
              <label htmlFor="favorite">
                <input
                  type="checkbox"
                  name="favorite"
                  data-testid={ `checkbox-music-${music.trackId}` }
                  checked={ favorite }
                  onChange={ this.checkFavorite }
                  onClick={ () => this.addFavorite(music) }
                />
                Favorita
              </label>
            </ul>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.shape({
    length: PropTypes.number,
  }),
}.isRequired;

export default MusicCard;
