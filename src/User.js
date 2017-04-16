import React, { Component } from 'react';
import UserGraph from './UserGraph';
// import logo from './logo.svg';
// import './User.css';

class User extends Component {
  render() {
    const { intro, picture64pxUrl } = this.props;

    return (
      <div className="User">
        <div className="User-left_panel">

          <img className="User-picture" alt="" src={picture64pxUrl} />

          <p className="User-intro">
            {intro}
          </p>

        </div>

        <div className="User-right_panel">
          <UserGraph />
        </div>
      </div>
    );
  }
}

User.defaultProps = {
  intro: 'Strategy - Algorithms',
  picture64pxUrl: 'https://camo.githubusercontent.com/43b9c0ae7dcca234a341e198a68da16dab098020/687474703a2f2f692e696d6775722e636f6d2f584671636b6b462e706e67',
};

export default User;
