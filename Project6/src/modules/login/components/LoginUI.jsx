import React from 'react';

const Login = ({onCheckCredentials, loginSuccess}) => (
  <div className="content">
    <form className="loginForm">
      <input type="text" placeholder="username" ref={(input) => { this.username = input; }}/>
      <input type="password" placeholder="password" ref={(input) => { this.password = input; }}/>
      <input type="button" className="loginBtn" onClick={() => onCheckCredentials({username: this.username.value, password: this.password.value})} value="login" />
      {
        !loginSuccess ?
          <span className="message">Please fill valid Username/Password</span>
          : null
      }
    </form>
  </div>    
);

export default Login;
