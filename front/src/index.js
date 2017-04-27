import './index.css';
import React from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { QueryRenderer, graphql } from 'react-relay'

import store from './state/store'
import history from './state/navigationHistory'
import environment from './state/relayEnvironment'

import User from './User'

const renderApp = ({ error, props }) => {
  const data = props || {};

  return (
    <div>
      <h1>App</h1>

      <pre>{JSON.stringify(data, null, 2)}</pre>

      {!!error && <pre>{JSON.stringify(error, null, 2)}</pre>}

      <Route exact path="/" render={p => <User {...p} user={data.user} />} />
    </div>
  )
}

const query = graphql`
  query indexQuery {
    user {
      ...User_user
    }
  }
`

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <QueryRenderer
        query={query}
        render={renderApp}
        environment={environment}
      />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
