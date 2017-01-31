import React, { Component } from 'react';
import AuthService from './utils/AuthService';
import Login from './Login';
import Home from './Home';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idToken: null
     };
  }

  componentWillMount() {
    this.auth = new AuthService('w1gVQ10geuWCt2wQrQ1yLR7kmucFsxcB', 'connorzg.auth0.com');
    if (this.auth.loggedIn()) {
      const idToken = this.auth.getToken();
      this.setState({ idToken });
    }
  }

  render() {
    if (this.state.idToken) {
      return (<Home auth={this.auth} idToken={this.state.idToken} />);
    } else {
      return (<Login auth={this.auth} />)
    }
  }
}

export default App;
