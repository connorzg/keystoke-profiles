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
      headers: { authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1VVXpOakJETUVRNVJqTTRRa0ZCUVRWR01rVkZSalkxUlRneE1VVXdSakUyUkRJelFUWXlNZyJ9.eyJpc3MiOiJodHRwczovL2Nvbm5vcnpnLmF1dGgwLmNvbS8iLCJzdWIiOiJpQlFWbENnV0FZQWxuU2syNmNnS1ZPbTZWcGZLWDdjQkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9jb25ub3J6Zy5hdXRoMC5jb20vYXBpL3YyLyIsImV4cCI6MTQ4NTk4MTEwNCwiaWF0IjoxNDg1ODk0NzA0LCJzY29wZSI6InJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIHJlYWQ6dXNlcnNfYXBwX21ldGFkYXRhIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSJ9.mqTdRfWxaZFg0COuEKH-rDJLLWld61E7BQIV3PvhPfi7hW-u0eLTgOTM3tQuRJabdc7tdmRC_hXgRf4ROC9v-8J77j7zoy_6nElTBOicYqT27cCGDwAGyR44nIeporf6RBR2rWqgdENnh4i4YEzRND99pmjsMKT8wgTWzmgwp-KoJb2c7rSbhJLpVSljpUe0WDMCAVJkSMAB6Zp494RLtsNJ2qnjoqjkLGh_mGE5_X__Q-snJpPiZQCm8iIOtFXV48EcSNALwjvLJDq-NNDZcUs1QUpzHl_LllGjbA8hf_MqS77X-tO8khl3EiqPExXlWYKLMNHlHh1rlXeZWguW3w" }
    }

    // GET all users with description metadata, avoiding users on my other Auth0 instance
    axios.get('https://connorzg.auth0.com/api/v2/users?q=_exists_%3Auser_metadata.description', headers)
      .then((res) => {
        console.log(res);
        this.setState({users: res.data})
      })
  }

  MetadataPatch(profile) {
    axios({
      method: 'PATCH',
      url: `https://connorzg.auth0.com/api/v2/users/${profile.user_id}`,
      headers: { authorization: `Bearer ${this.props.idToken}` },
      data: {
        user_metadata: {
          name: profile.name,
          picture: profile.picture,
          description: profile.user_metadata.description || ''
        }
      }
    }).then((res) => {
        console.log(res.data);
        this.setState({profile: res.data});
      })
  }

  componentDidMount() {
    // The token is passed down from the App component
    // and used to retrieve the profile
    this.props.auth.lock.getProfile(this.props.idToken, (err, profile) => {
      console.log(profile);
      this.setState({profile: profile});

      this.getAllUsers();

      // Patch initial metadata for new users
      if (!profile.user_metadata) {
        this.MetadataPatch(profile);
      }
    });
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
