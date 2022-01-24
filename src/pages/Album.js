import React from 'react';
import PropTypes, { string } from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      albumSongs: [],
      bandName: '',
      albumName: '',
      albumImage: '',
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    // console.log(id);
    getMusics(id).then((info) => {
      // console.log(info);
      const { artworkUrl100, artistName, collectionName } = info[0];
      // console.log(bandName);
      const songs = info.filter((song) => song.kind === 'song');
      this.setState({
        albumSongs: [...songs],
        bandName: artistName,
        albumName: collectionName,
        albumImage: artworkUrl100,
      });
    });
  }

  render() {
    const { albumSongs, bandName, albumName, albumImage } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h2 data-testid="artist-name">{ bandName }</h2>
          <h2 data-testid="album-name">{ albumName }</h2>
          <img src={ albumImage } alt={ albumName } />
          <div>
            { albumSongs.map((song) => (
              <MusicCard
                key={ song.trackId }
                trackId={ song.trackId }
                trackName={ song.trackName }
                previewUrl={ song.previewUrl }
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(string),
  }).isRequired,
};

export default Album;
