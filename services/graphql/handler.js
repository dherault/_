const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    user(id: String): User
  }

  type User {
    name: String
    intro: String
    pictureUrl: String
  }
`)

const root = {
  user: id => ({
    name: 'David Hérault',
    intro: 'Strategy - Algorithms',
    pictureUrl: 'https://camo.githubusercontent.com/43b9c0ae7dcca234a341e198a68da16dab098020/687474703a2f2f692e696d6775722e636f6d2f584671636b6b462e706e67',
  }),
}

module.exports.graphql = (event, context, callback) => {
  let body

  try {
    body = JSON.parse(event.body)
  }
  catch (error) {
    console.error('Invalid JSON');
    console.error(error);

    return callback(null, {
      statusCode: 400,
      body: {
        errors: [{ message: 'Invalid JSON' }],
      },
    });
  }

  if (typeof body.query !== 'string') {
    return callback(null, {
      statusCode: 400,
      body: {
        errors: [{ message: 'Missing query key' }],
      },
    });
  }

  console.log('New query:');
  console.log(body.query, '\n');

  graphql(schema, body.query, root)
  .then(output => callback(null, {
    statusCode: 200,
    body: JSON.stringify(output),
  }));
}
