import store from './store';

function graphql(query, operationName, variables) {
  return fetch('http://localhost:3001/graphql', {
    method: 'post',
    headers : {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, operationName, variables }),
  })
  .then(res => res.json())
  .then(out => {
    if (out.errors) {
      console.log('Graphql error:')
      out.errors.forEach(err => console.error(err.message))
      console.log('___')

      return null;
    }
    // console.log(out);
    return typeof out.data === 'object' ? out.data : null
  });
}

function getUser(userId, fragment = '') {
  return graphql(`{user(id:"${userId}"){${fragment}}}`)
  .then(data => data && store.dispatch({
    type: 'GET_USER',
    payload: data.user,
  }));
}

export {
  getUser
}
