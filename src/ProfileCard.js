import React, { Component } from 'react';
import './Home.css'

class ProfileCard extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="users">
        <img src={user.user_metadata.picture} alt='user' />
        <div>
          <h3>{user.user_metadata.name}</h3>
          <p>{user.user_metadata.description}</p>
        </div>
      </div>
    )
  }
}

export default ProfileCard;
