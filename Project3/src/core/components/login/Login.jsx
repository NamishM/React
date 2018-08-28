import React, { Component } from 'react';
import ShippingLabelMarker from '../../../features/shipping-label-marker/ShippingLabelMarker';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    } 
    componentDidMount() {
        this.username.focus();
      }
  render() {
    return (
      <div className="content">
        <form className={`loginForm ${this.state.username==='namish' && this.state.password==='sapient' ? 'hide' : null}`}>
            <input type="text" placeholder="username" ref={(input) => { this.username = input; }}/>
            <input type="password" placeholder="password" ref={(input) => { this.password = input; }}/>
            <input type="button" className="loginBtn" onClick={() => this.setState({username: this.username.value, password: this.password.value})} value="login" />
            <span className={`message ${this.state.username==='namish' && this.state.password==='sapient' ? 'hide' : null}`}>Please fill valid Username/Password</span>
        </form> 
        <div className={this.state.username==='namish' && this.state.password==='sapient' ? 'show' : 'hide'}> 
            <ShippingLabelMarker />
        </div>
      </div>
      
    );
  }
}

export default Login;
