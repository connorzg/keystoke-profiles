import React, { Component } from 'react';
import './Home.css';

class Login extends Component {
  componentDidMount() {
    // Open Auth0 widget
    this.props.auth.login();
  }

  render() {
    return (
      <div className="login">
        <div className="login-box">
          <h1>Keystoke Profiles</h1>
        </div>
      </div>
    );
  }
}

export default Login;
