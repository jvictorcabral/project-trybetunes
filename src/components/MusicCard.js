import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteList: [],
      favorite: false,
      loading: false,
    };
    this.handleCheck = this.handleCheck.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.checkFavorites = this.checkFavorites.bind(this);
  }

  componentDidMount() {
    this.getFavorites();
  }

  handleCheck({ target }) {
    this.setState({
      loading: true,
    });
    if (target.checked) {
      (addSong(this.props).then(() => {
        this.setState({
          loading: false,
          favorite: true,
        });
      }));
      getFavoriteSongs().then((info) => console.log(info));
    } else {
      (removeSong(this.props).then(() => {
        this.setState({
          loading: false,
          favorite: false,
        });
      }));
    }
  }

  getFavorites = async () => {
    const favorite = await getFavoriteSongs();
    this.setState({
      favoriteList: favorite,
    }, this.checkFavorites);
  }

  checkFavorites() {
    const { trackId } = this.props;
    const { favoriteList } = this.state;
    const favoriteCheck = favoriteList.some((song) => song.trackId === trackId);
    this.setState({
      favorite: favoriteCheck,
    });
  }

  render() {
    const { trackId, trackName, previewUrl } = this.props;
    const { favorite, loading } = this.state;
    return (
      <div key={ trackId }>
        <span>{ trackName }</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite-input">
          favorite
          <input
            id="favorite-input"
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            value={ trackName }
            onChange={ this.handleCheck }
            checked={ favorite }
          />
        </label>
        { loading && <Loading /> }
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
};

export default MusicCard;
