import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import './header.css';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      loading: true,
    };
    this.callApi = this.callApi.bind(this);
  }

  componentDidMount() {
    this.callApi();
  }

  async callApi() {
    await getUser().then((user) => {
      this.setState({
        userName: user.name,
        loading: false,
      });
    });
  }

  render() {
    const { userName, loading } = this.state;

    return (
      <header data-testid="header-component">
        <div className="class-header">
          { loading ? <Loading />
            : <span data-testid="header-user-name">{ userName }</span> }
        </div>
        <nav>
          <Link
            data-testid="link-to-search"
            to="/search"
          >
            Search
          </Link>

          {/* <Link to="/album/:id">Album</Link> */}

          <Link
            data-testid="link-to-favorites"
            to="/favorites"
          >
            Favorites
          </Link>

          <Link
            data-testid="link-to-profile"
            to="/profile"
          >
            Profile
          </Link>

          {/* <Link to="/profile/edit">Edit Profile</Link> */}
        </nav>
      </header>
    );
  }
}

export default Header;
