import './User.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getUser } from './state/actionCreators'
import UserGraph from './UserGraph'

class User extends Component {
  componentWillMount() {
    getUser(0, `name intro pictureUrl`);
  }

  render() {
    const { _ } = this.props;

    return (
      <div className="User">
        <img className="User-picture" alt="" src={_.get('pictureUrl')} />

        <h1>{_.get('name')}</h1>

        <p className="User-intro">
          {_.get('intro')}
        </p>

        <UserGraph />
      </div>
    );
  }
}

export default connect(s => ({ _: s.user }))(User)
