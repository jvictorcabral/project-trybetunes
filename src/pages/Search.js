import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      valueName: '',
      disable: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.buttonChange = this.buttonChange.bind(this);
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

  render() {
    const { valueName, disable } = this.state;

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
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
