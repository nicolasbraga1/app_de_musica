import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../Pages/Loading';

class MusicCard extends Component {
  state = {
    checkbox: false,
    loading: false,
  };

  async componentDidMount() {
    const { trackId } = this.props;
    const favorites = await getFavoriteSongs();
    this.setState({
      checkbox: favorites.some((song) => song.trackId === trackId),
    });
  }

  handleChange = ({ target }) => {
    const value = target.checked;
    const { songData } = this.props;
    this.setState({
      checkbox: value,
      loading: true,
    }, async () => {
      await addSong(songData);
      this.setState({
        loading: false,
      });
      if (!value) {
        await removeSong(songData);
      }
    });
  };

  render() {
    const { previewURL, songName, trackId } = this.props;
    const { checkbox, loading } = this.state;
    return (
      <div>
        { loading ? <Loading />
          : (
            <>
              <p>{songName}</p>
              <audio data-testid="audio-component" src={ previewURL } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
                .
              </audio>
              <label htmlFor="favoriteSong">
                {' '}
                Favorita
                <input
                  type="checkbox"
                  id="favoriteSong"
                  onChange={ this.handleChange }
                  checked={ checkbox }
                  data-testid={ `checkbox-music-${trackId}` }
                />
              </label>
            </>
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
