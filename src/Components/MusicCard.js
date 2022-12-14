import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { musics } = this.props;
    return (
      <div>
        {musics.map((song, index) => (
          <ul key={ index }>
            <li>{song.trackName}</li>
            <audio data-testid="audio-component" src="{previewUrl}" controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
          </ul>
        ))}
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
