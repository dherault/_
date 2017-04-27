import './index.css';
import React from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router'
import { Link } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { QueryRenderer, graphql } from 'react-relay'

import store from './state/store'
import history from './state/navigationHistory'
import environment from './state/relayEnvironment'

import User from './User'
import Skills from './Skills'

const renderApp = ({ error, props }) => {
  const data = props || {};

  // <pre>{JSON.stringify(data, null, 2)}</pre>
  return (
    <ConnectedRouter history={history}>
      <div>

      <h1>App</h1>
      <Link to="/">home</Link>
      &nbsp;~&nbsp;
      <Link to="/skills">skills</Link>

      {!!error && <pre>{JSON.stringify(error, null, 2)}</pre>}

        <Route exact path="/" render={p => <User {...p} user={data.user} />} />
        <Route exact path="/skills" render={p => <Skills {...p} skills={data.skills} />} />
      </div>
    </ConnectedRouter>
  )
}

const query = graphql`
  query indexQuery {
    user {
      ...User_user
    }
    skills {
      ...Skills_skills
    }
  }
`

ReactDOM.render(
  <Provider store={store}>
    <QueryRenderer
      query={query}
      render={renderApp}
      environment={environment}
    />
  </Provider>,
  document.getElementById('root')
)
