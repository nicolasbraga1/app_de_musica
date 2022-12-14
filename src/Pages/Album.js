import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusic from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../Components/MusicCard';

class Album extends Component {
  state = {
    loadingPage: true,
    musics: '',
    albumsInfo: '',
  };

  async componentDidMount() {
    const minTwo = 2;
    const minThree = 3;
    const { history: { location } } = this.props;
    const musicArray = location.pathname
      .split('/', minThree);
    const musics = await getMusic(musicArray[minTwo]);
    const newArray = musics
      .filter((song, index) => index !== 0);
    this.setState({
      albumsInfo: musics[0],
      musics: newArray,
      loadingPage: false,
    });
  }

  render() {
    const { loadingPage, musics, albumsInfo } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loadingPage
          ? (<Loading />)
          : (
            <div>
              <img src={albumsInfo.artworkUrl100} alt="album-cover" />
              <h4 data-testid="album-name">
                {albumsInfo.collectionName}
              </h4>
              <h5 data-testid="artist-name">
                {albumsInfo.artistName}
              </h5>
              <MusicCard musics={musics} />
            </div>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
