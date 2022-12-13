import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
      buttonDisabled: true,
      loadingPage: false,
    };
    this.redirectPage = this.redirectPage.bind(this);
    this.controlBtn = this.controlBtn.bind(this);
  }

  redirectPage(nome) {
    const { history } = this.props;
    this.setState({ loadingPage: true }, async () => {
      if (nome) {
        await createUser({ name: nome });
        return history.push('/search');
      }
    });
  }

  controlBtn({ target: { name, value } }) {
    const min = 3;
    this.setState({
      [name]: value,
    });
    if (name === 'inputName') {
      const textSize = value.length;
      if (textSize >= min) {
        this.setState({
          buttonDisabled: false,
        });
      }
    }
  }

  render() {
    const { buttonDisabled, inputName, loadingPage } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <input
            name="inputName"
            type="text"
            data-testid="login-name-input"
            placeholder="Nome"
            onChange={ this.controlBtn }
          />
          <button
            name="button"
            data-testid="login-submit-button"
            type="submit"
            disabled={ buttonDisabled }
            onClick={ () => this.redirectPage(inputName) }
          >
            Entrar
          </button>
          { loadingPage && <Loading />}
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
