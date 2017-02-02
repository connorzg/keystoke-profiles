import React, { Component } from 'react';
import './Home.css';
import Users from './Users';
import axios from 'axios';
import ProgressiveImage from 'react-progressive-image';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      backupProfile: {},
      users: [],
      editMode: false
     };
  }

  getAllUsers() {
    const headers = {
      headers: { authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJHSmFCSEFqMGROVnZEaTc4ekpXYW5uZ2JCMmpPQkVYbCIsInNjb3BlcyI6eyJ1c2VycyI6eyJhY3Rpb25zIjpbInJlYWQiXX19LCJpYXQiOjE0ODU5MTQzMzgsImp0aSI6ImRlY2FhM2NiMDJmOTgyMzc2NDJjNmJkOWI5MjE1ZjY2In0.H2IyYtANGUh0yjnrxiZyta3QN8tnYEpliklb9n9ZkTI" }
    }
    // GET all users with 'description' metadata, avoiding users on my other Auth0 instance
    axios.get('https://connorzg.auth0.com/api/v2/users?q=_exists_%3Auser_metadata.description', headers)
      .then((res) => {
        this.setState({ users: res.data });
      })
  }

  // The profile object cannot be directly mutated so it's mirrored in metadata
  // This metadata is how a user will view/edit their information
  patchMetadata(profile) {
    axios({
      method: 'PATCH',
      url: `https://connorzg.auth0.com/api/v2/users/${profile.user_id}`,
      headers: { authorization: `Bearer ${this.props.idToken}` },
      data: {
        user_metadata: {
          name: profile.user_metadata.name || profile.name,
          picture: profile.user_metadata.picture || profile.picture,
          description: profile.user_metadata.description || ''
        }
      }
    }).then((res) => {
        console.log(res.data);
        this.setState({profile: res.data}, () => {
          // Refresh user profiles and hide the form after setting current user
          this.setState({ editMode: false });
          this.getAllUsers();
        });
      });
  }

  handleInputChange(event) {
    const name = event.target.name;
    const profile = this.state.profile;
    profile.user_metadata[name] = event.target.value;
    this.setState({ profile });
  }

  editMode() {
    this.setState({editMode: true, backupProfile: this.state.profile});
  }

  revertEditMode() {
    this.setState({editMode: false, profile: this.state.backupProfile});
  }

  componentWillMount() {
    // Token generated in App.js is used to get user profile
    this.props.auth.lock.getProfile(this.props.idToken, (err, profile) => {
      console.log(profile);
      this.setState({ profile });

      this.getAllUsers();

      // Patch initial metadata for new users
      if (!profile.user_metadata) {
        profile.user_metadata = {};
        this.patchMetadata(profile);
      }
    })
  }

  render() {
    let profile = this.state.profile.user_metadata || this.state.profile;
    // Conditional rendering of Home page or profile edit page
    if (!this.state.editMode) {
      return (
        <div className="home">
          <div className="currentUser">

            {/*  ProgressiveImage was implemented due to the drastic resizing as images finish loading  */}
            <ProgressiveImage src={profile.picture} placeholder={require('../public/placeholder.png')}>
              {(src) => <img src={src} alt='user'/>}
            </ProgressiveImage>

            <div className="bio">
              <h3>{profile.name}</h3>
              <p>{profile.description}</p>
            </div>

            <div className="buttons">
              <button onClick={this.editMode.bind(this)}>Edit</button>
              <button onClick={this.props.auth.logout.bind(this)}>Logout</button>
            </div>
          </div>

          <Users userEmail={this.state.profile.email} users={this.state.users} />
        </div>
      );
    } else {
      return (
        <div className="form">
          <ProgressiveImage src={profile.picture} placeholder={require('../public/placeholder.png')}>
            {(src) => <img src={src} alt='user'/>}
          </ProgressiveImage>

          <p>Enter a URL for a new profile picture:</p>
          <input size="45" type="text" value={profile.picture} onChange={this.handleInputChange.bind(this)} name='picture' placeholder="Image URL" />

          <p>Do you go by another name?</p>
          <input type="text" value={profile.name} onChange={this.handleInputChange.bind(this)} name='name' placeholder="Name" />

          <p>Describe Yourself:</p>
          <textarea rows="12" cols="44" type="text" placeholder="Description" value={profile.description} name="description" onChange={this.handleInputChange.bind(this)} />

          <div>
            <button className="formButton" onClick={this.revertEditMode.bind(this)}>Cancel</button>
            <button className="formButton" onClick={this.patchMetadata.bind(this, this.state.profile)}>Submit</button>
          </div>
        </div>
      );
    }
  }
}

export default Home;
