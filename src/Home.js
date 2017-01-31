import React, { Component } from 'react';
import './Home.css';
import ProfilePage from './ProfilePage';
import DATA from '../data';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  render() {
    return (
      <ProfilePage data={ DATA } />
    );
  }
}

export default Home;
