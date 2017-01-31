import React, { Component } from 'react';
import AuthService from './utils/AuthService';
import ProfilePage from './ProfilePage';
import Home from './Home';
import DATA from '../data';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      idToken: null
     };
  }

  componentWillMount() {
    this.auth = new AuthService('w1gVQ10geuWCt2wQrQ1yLR7kmucFsxcB', 'connorzg.auth0.com');

    if (this.auth.loggedIn()) {
      let idToken = this.auth.getToken();
      this.setState({ idToken });
      this.auth.setToken(idToken);
    }
  }

  render() {
    if (this.state.idToken) {
      return (<Home auth={this.auth} idToken={this.state.idToken} />);
    } else {
      return (<ProfilePage auth={this.auth} />)
    }
  }
}

export default App;
