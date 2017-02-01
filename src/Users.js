import React, { Component } from 'react';
import ProfileCard from './ProfileCard';

class Users extends Component {

  componentDidMount() {

  }

  mapUsers() {
    return this.props.users.map(function(user, index) {
       return (<ProfileCard key={index} user={user}/>);
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
