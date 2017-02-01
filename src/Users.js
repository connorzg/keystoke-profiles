import React, { Component } from 'react';
import ProfileCard from './ProfileCard';

class Users extends Component {
  mapUsers() {
    return this.props.users.map((user, index) => {
      if (user.email !== this.props.userEmail) {
        return (<ProfileCard key={index} user={user}/>);
      }
    })
  }

  render() {
    let users = this.mapUsers();
    return (
      <div>
        {users}
      </div>
    )
  }
}

export default Users;
