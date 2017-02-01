import React, { Component } from 'react';
import ProgressiveImage from 'react-progressive-image';
import './Home.css'

class ProfileCard extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="users">
        <ProgressiveImage src={user.user_metadata.picture} placeholder={require('../public/placeholder.png')}>
          {(src) => <img src={src} alt='user'/>}
        </ProgressiveImage>
        <div>
          <h3>{user.user_metadata.name}</h3>
          <p>{user.user_metadata.description}</p>
        </div>
      </div>
    )
  }
}

export default ProfileCard;
