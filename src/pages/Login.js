import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import '../components/login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      disable: true,
      valueName: '',
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.buttonChange = this.buttonChange.bind(this);
    this.saveButton = this.saveButton.bind(this);
  }

  handleChange({ target }) {
    this.setState({ valueName: target.value }, () => this.buttonChange());
  }

  buttonChange() {
    const TRES = 3;
    const { valueName } = this.state;
    if (valueName.length < TRES) {
      this.setState({ disable: true });
    } else {
      this.setState({ disable: false });
    }
  }

  saveButton(valueName) {
    const { history } = this.props;

    this.setState({ loading: true });

    createUser({ name: valueName }).then(() => {
      history.push('/search');
    });
  }

  render() {
    const { disable, valueName, loading } = this.state;

    return (
      <div data-testid="page-login" className="div-login">
        { loading ? <Loading /> : (
          <form className="form-login">
            <label htmlFor="login-name-input">
              Nome
              <input
                data-testid="login-name-input"
                type="text"
                value={ valueName }
                onChange={ this.handleChange }
              />
            </label>
            <button
              data-testid="login-submit-button"
              type="submit"
              disabled={ disable }
              onClick={ () => this.saveButton(valueName) }
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
