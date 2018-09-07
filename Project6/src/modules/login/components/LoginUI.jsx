import React from 'react';
import PropTypes from 'prop-types';

const Login = ({ onCheckCredentials, loginSuccess, setLoginfailed }) => (
  <div className={`content ${loginSuccess ? 'loading' : null}`}>
    <form className="loginForm">
      <input type="text" placeholder="username" ref={(input) => { this.username = input; }} />
      <input type="password" placeholder="password" ref={(input) => { this.password = input; }} />
      <input
        type="button"
        className="loginBtn"
        onClick={
          () => {
            if (this.username.value !== '' && this.password.value !== '') {
              onCheckCredentials(this.username.value, this.password.value);
            } else {
              setLoginfailed();
            }
          }
        }
        value="login"
      />
      {
        !loginSuccess && loginSuccess !== null ?
          <span className="message">Please fill valid Username/Password</span>
          : null
      }
    </form>
  </div>
);

Login.propTypes = {
  loginSuccess: PropTypes.bool,
  onCheckCredentials: PropTypes.func.isRequired,
  setLoginfailed: PropTypes.func.isRequired,
};

export default Login;

