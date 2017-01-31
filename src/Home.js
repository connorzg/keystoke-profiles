import React, { Component } from 'react';
import './Home.css';
import Users from './Users'
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      users: [],
      editMode: false
     };
  }

  getAllUsers() {
    const headers = {
      headers: { authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1VVXpOakJETUVRNVJqTTRRa0ZCUVRWR01rVkZSalkxUlRneE1VVXdSakUyUkRJelFUWXlNZyJ9.eyJpc3MiOiJodHRwczovL2Nvbm5vcnpnLmF1dGgwLmNvbS8iLCJzdWIiOiJpQlFWbENnV0FZQWxuU2syNmNnS1ZPbTZWcGZLWDdjQkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9jb25ub3J6Zy5hdXRoMC5jb20vYXBpL3YyLyIsImV4cCI6MTQ4NTk4NTI1NSwiaWF0IjoxNDg1ODk4ODU1LCJzY29wZSI6InJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIHJlYWQ6dXNlcnNfYXBwX21ldGFkYXRhIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEifQ.Zr-AelL-unLG_nFmCPp3LsChiG3cB9M4k9nV5Fst-UVaYn7HpU1M74s6kqRU3RVblpepPRGBH6ucNoECwbTaBEJ6e8u4niLafbrnt88UZWP6g6eZlJ5XQq8uUYeWkMfFdsTAA4KQt1X3T_ssavx9MIyYwNpitzq52lH50V6yfheAKcv8gSxuoo5Rx5eR2wuVMZV-RA6M2o-XYAI6CwNKhGF4I7A88Ivh1dXf9A0dBUtjRMMrVVPd_PFkYUtAygdZX6hugNbMCo6fAjOpU0tBfcMORf9r57uyd6Uua05iZGIFfPkIo1st3O2jH2SHpiqdlVVpJ59QluUP9qecMxPNHA" }
    }

    // GET all users with description metadata, avoiding users on my other Auth0 instance
    axios.get('https://connorzg.auth0.com/api/v2/users?q=_exists_%3Auser_metadata.description', headers)
      .then((res) => {
        this.setState({users: res.data})
        console.log(res.data);
      })
  }

  patchMetadata(profile) {
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
        this.setState({profile: res.data}, () => this.setState({editMode: false}));
      });
  }

  handleInputChange(event) {
    const name = event.target.name;
    const profile = this.state.profile;
    profile.user_metadata[name] = event.target.value;
    this.setState({ profile });
  }

  componentWillMount() {
    // Token generated in App.js is used to get user profile
    this.props.auth.lock.getProfile(this.props.idToken, (err, profile) => {
      console.log(profile);
      this.setState({ profile });

      this.getAllUsers();

      // Patch initial metadata for new users
      if (!profile.user_metadata) {
        this.patchMetadata(profile);
      }

      this.setState({editMode: true});
    });
  }

  render() {
    let profile = this.state.profile.user_metadata || this.state.profile;
    if (!this.state.editMode) {
      return (
        <div className="home">
          <div>
            <img src={profile.picture} alt='user' />
            <h2>{profile.name}</h2>
            <p>{profile.description}</p>
            <button onClick={this.props.auth.logout.bind(this)}>Logout</button>
          </div>
          <Users users={this.state.users} />
        </div>
      );
    } else {
      return (
        <div>
          <img src={profile.picture} alt='user' />
          <input type="text" value={profile.name} onChange={this.handleInputChange.bind(this)} name='name' placeholder="Name" />
          <label>
            Describe Yourself:
            <input type="text" placeholder="Description" value={profile.description} name="description" onChange={this.handleInputChange.bind(this)} />
          </label>
          <button onClick={this.patchMetadata.bind(this, this.state.profile)}>Submit</button>
        </div>
      )
    }
  }
}

export default Home;
