import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import defaultAction from '../store/actions';

const MIN_PASSWORD_LENGTH = 5;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
      email: '',
      password: '',

    };
  }

  validateEmail = () => {
    const { email } = this.state;
    return email.split('').includes('@')
    && email.split('').includes('.')
    && email.split('.').includes('com');
  }

buttonEnabler = () => {
  const isEmailValid = this.validateEmail();
  const { password } = this.state;
  if (password.length >= MIN_PASSWORD_LENGTH && isEmailValid) {
    this.setState({ buttonDisabled: false });
  } else {
    this.setState({ buttonDisabled: true });
  }
}

handleChange = ({ target }) => {
  this.setState({ [target.name]: target.value }, this.buttonEnabler());
}

render() {
  const { buttonDisabled, email, password } = this.state;
  const { dispatchUser } = this.props;
  return (
    <div>
      <h1>Login</h1>
      <label htmlFor="email">
        Digite seu email:
        <input
          onChange={ this.handleChange }
          type="email"
          name="email"
          data-testid="email-input"
          value={ email }
        />
      </label>
      <label htmlFor="password">
        Digite sua senha:
        <input
          name="password"
          onChange={ this.handleChange }
          type="password"
          data-testid="password-input"
          value={ password }
        />
      </label>
      <Link to="/carteira">
        <button
          type="submit"
          onClick={ () => dispatchUser(email) }
          disabled={ buttonDisabled }
        >
          Entrar

        </button>
      </Link>
    </div>
  );
}
}

Login.propTypes = {
  dispatchUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchUser: (state) => dispatch(defaultAction(state, 'SAVE_EMAIL')),
});

export default connect(null, mapDispatchToProps)(Login);
