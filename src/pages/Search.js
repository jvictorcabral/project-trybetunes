import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbums from '../services/searchAlbumsAPI';

// import '../components/search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      valueName: '',
      searchText: '',
      disable: true,
      loading: false,
      albums: [],
      albumNotFound: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.buttonChange = this.buttonChange.bind(this);
    this.searchButton = this.searchButton.bind(this);
  }

  handleChange({ target }) {
    this.setState({ valueName: target.value }, () => this.buttonChange());
  }

  buttonChange() {
    const TWO = 2;
    const { valueName } = this.state;
    if (valueName.length < TWO) {
      this.setState({ disable: true });
    } else {
      this.setState({ disable: false });
    }
  }

  searchButton() {
    const { valueName } = this.state;

    this.setState({
      loading: true,
    }, () => {
      searchAlbums(valueName).then((albums) => {
        this.setState({
          albums: [...albums],
          searchText: valueName,
          valueName: '',
          loading: false,
          albumNotFound: albums.length === 0,
        });
      });
    });
  }

  render() {
    const { valueName, disable, loading, albums, searchText, albumNotFound } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            placeholder="Nome do Artista"
            value={ valueName }
            onChange={ this.handleChange }
            data-testid="search-artist-input"
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ disable }
            onClick={ this.searchButton }
          >
            Pesquisar
          </button>
        </form>
        {albumNotFound && <h1>Nenhum álbum foi encontrado</h1>}
        { loading ? <Loading />
          : (
            <div className="albums-content">
              <div>
                <h1>
                  Resultado de álbuns de:
                  {' '}
                  { searchText }
                </h1>
                { albums.map((album) => (
                  <div key={ album.collectionId }>
                    <Link
                      to={ `album/${album.collectionId}` }
                      data-testid={ `link-to-album-${album.collectionId}` }
                    >
                      <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                      <h2>{ album.collectionName }</h2>
                      <span>{ album.artistName }</span>
                    </Link>
                  </div>
                )) }
              </div>
            </div>
          ) }
      </div>
    );
  }
}

export default Search;
