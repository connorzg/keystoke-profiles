import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {}
     };
  }

  componentDidMount() {
    // The token is passed down from the App component
    // and used to retrieve the profile
    this.props.auth.lock.getProfile(this.props.idToken, (err, profile) => {
      if (err) {
        console.log("Error loading the Profile", err);
        return;
      }
      this.setState({profile: profile});
    });
  }

  render() {
    if (this.state.profile) {
      return (
        <div>
          <img src={this.state.profile.picture} />
          <h2>Welcome {this.state.profile.nickname}</h2>
        </div>
      );
    } else {
      return (
        <div className="loading">Loading your profile</div>
      );
    }
  }

}

export default Home;
