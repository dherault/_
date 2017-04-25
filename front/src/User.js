import './User.css'
import React, { Component } from 'react'

import UserGraph from './UserGraph'

class User extends Component {
  render() {
    return (
      <div className="User">
        <img className="User-picture" alt="" src={'_'} />

        <h1>{'_'}</h1>

        <p className="User-intro">
          {'_'}
        </p>

        <UserGraph />
      </div>
    );
  }
}

export default User
