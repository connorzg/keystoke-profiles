import React, { Component } from 'react';
import './Home.css';

class ProfilePage extends Component {
  showLock() {
   // Show the Auth0Lock widget
   this.props.auth.login();
  }

  render() {
    return (
      <div className="login-box">
        <button onClick={this.showLock.bind(this)}>Sign In</button>
      </div>
    );
  }
}

export default ProfilePage;
