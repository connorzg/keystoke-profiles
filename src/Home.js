import React, { Component } from 'react';
import './Home.css';
import Users from './Users'
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      users: []
     };
  }

  getAllUsers() {
    let headers = {
      headers: { authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJHSmFCSEFqMGROVnZEaTc4ekpXYW5uZ2JCMmpPQkVYbCIsInNjb3BlcyI6eyJ1c2VycyI6eyJhY3Rpb25zIjpbInJlYWQiXX19LCJpYXQiOjE0ODU4ODUxNDQsImp0aSI6IjE2MzQxOTc4OGVkNzViNDExODA4NDUzNzE5YzAxY2QwIn0.KBz4yQToIp0t-EmgOkqSFb9RdTJDGdFvDQCo7OLY12I" }
    }

    axios.get('https://connorzg.auth0.com/api/v2/users?q=_exists_%3Auser_metadata.description', headers)
      .then((res) => {
        console.log(res.data);
        this.setState({users: res.data})
      })
  }

  componentDidMount() {
    // The token is passed down from the App component
    // and used to retrieve the profile
    this.props.auth.lock.getProfile(this.props.idToken, (err, profile) => {
      if (err) {
        console.log("Error loading the Profile", err);
        return;
      }
      console.log(profile);
      this.setState({profile: profile});
    });

    this.getAllUsers();
  }

  render() {
    if (this.state.profile) {
      return (
        <div className="home">
          <div>
            <img src={this.state.profile.picture} alt='user'/>
            <h2>{this.state.profile.name}</h2>
            <button onClick={this.props.auth.logout.bind(this)}>Logout</button>
          </div>
          <Users users={this.state.users} />
        </div>
      );
    }
  }
}

export default Home;
