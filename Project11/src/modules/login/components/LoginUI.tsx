import * as React from 'react';
import PropTypes from 'prop-types';

interface LoginUIProps {
    loginSuccess: boolean;
    onCheckCredentials(username: any, password: any): void;
    setLoginfailed(): void;
}

export default class Login extends React.Component<LoginUIProps, any> {
  constructor(props: LoginUIProps) {
      super(props);
      this.state = { username: '', password: '' };      
  }

  handleNameChange = (event: any) => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = (event: any) => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <div className={`content ${this.props.loginSuccess ? 'loading' : null}`}>
        <form className="loginForm">
          <input type="text" placeholder="username" value={this.state.username} onChange={this.handleNameChange} />
          <input type="password" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange} />
          <input
            type="button"
            className="loginBtn"
            onClick={
              () => {
                if (this.state.username !== '' && this.state.password !== '') {
                  this.props.onCheckCredentials(this.state.username, this.state.password);
                } else {
                  this.props.setLoginfailed();
                }
              }
            }
            value="login"
          />
          {
            !this.props.loginSuccess && this.props.loginSuccess !== null ?
              <span className="message">Please fill valid Username/Password</span>
              : null
          }
        </form>
      </div>
    );
  }
}

