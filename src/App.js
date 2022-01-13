import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Album from './components/Album';
import Favorites from './components/Favorites';
import Login from './components/Login';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import NotFound from './components/NotFound';
import Search from './components/Search';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" Component={ Login } />
        <Route path="/search" Component={ Search } />
        <Route path="/album/:id" Component={ Album } />
        <Route path="/favorites" Component={ Favorites } />
        <Route path="/profile" Component={ Profile } />
        <Route path="/profile/edit" Component={ ProfileEdit } />
        <Route path="/*" Component={ NotFound } />
      </BrowserRouter>
    );
  }
}

export default App;
