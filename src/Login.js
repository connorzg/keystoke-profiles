import React, { Component } from 'react';
import './Home.css';

class Login extends Component {
  render() {
    return (
      <div className="login-box">
        <button onClick={this.props.auth.login.bind(this)}>Login</button>
      </div>
    );
  }
}

export default Login;
