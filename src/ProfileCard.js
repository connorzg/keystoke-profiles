import React, { Component } from 'react';
import './Home.css'

class ProfileCard extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="home">
        <div>
          <img src={user.picture} alt='user' />
          <h3>{user.name}</h3>
        </div>
        <p>{user.user_metadata.description}</p>
      </div>
    )
  }
}

export default ProfileCard;
