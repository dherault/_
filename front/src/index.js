import './index.css';
import React from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import store from './state/store'
import history from './state/navigationHistory'

import User from './User'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route exact path="/" component={User} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
