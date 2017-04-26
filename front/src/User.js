import './User.css'
import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'

import UserGraph from './UserGraph'

class User extends Component {
  render() {
    const { user } = this.props;

    if (!user) return console.log('no User props') || null;

    return (
      <div className="User">
        <h1>User</h1>
        <img className="User-picture" alt="" src={user.pictureUrl} />

        <h1>{user.fisrtName} {user.lastName}</h1>

        <p className="User-intro">
          {user.intro}
        </p>

        <UserGraph />
      </div>
    );
  }
}

module.exports = createFragmentContainer(User, graphql`
  fragment User_user on Person {
    firstName
    lastName
    intro
    pictureUrl
  }
`);

export default User
