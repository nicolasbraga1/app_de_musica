import React, { Component } from 'react';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends Component {
  state = {
    loading: false,
    favoriteSongs: [],
  };

  async componentDidMount() {
    const favorites = await getFavoriteSongs();
    console.log(await getFavoriteSongs());
    this.setState({
      loading: true,
      favoriteSongs: favorites,
    }, () => this.setState({
      loading: false,
    }));
  }

  render() {
    const { loading, favoriteSongs } = this.state;
    return (
      <div>
        { loading ? <Loading />
          : (
            <div data-testid="page-favorites">
              <Header />
              <h1>FAvorites</h1>
              {favoriteSongs.map((favoriteSong) => (
                <MusicCard
                  key={ favoriteSong.trackId }
                  previewURL={ favoriteSong.previewUrl }
                  songName={ favoriteSong.trackName }
                  trackId={ favoriteSong.trackId }
                  songData={ favoriteSong }
                />
              ))}
            </div>
          )}
      </div>
    );
  }
}

export default Favorites;
