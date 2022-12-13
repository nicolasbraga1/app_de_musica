import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    loadingPage: false,
    inputName: '',
  };

  componentDidMount() { this.getAPI(); }

  async getAPI() {
    this.setState({ loadingPage: true });
    const nameLogin = await getUser();
    this.setState({
      loadingPage: false,
      inputName: nameLogin.name });
  }

  render() {
    const { loadingPage, inputName } = this.state;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">
          {loadingPage ? <Loading /> : inputName}
        </p>
        <Link to="/search" data-testid="link-to-search">
          Search
        </Link>
        <Link to="/favorites" data-testid="link-to-favorites">
          Favorites
        </Link>
        <Link to="/profile" data-testid="link-to-profile">
          Profile
        </Link>
      </header>
    );
  }
}

export default Header;
