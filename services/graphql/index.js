const graphqlHTTP = require('express-graphql');
const express = require('express');
const schema = require('./schema');

const isDevelopment = process.env.NODE_ENV !== 'production';

express()
.use('/graphql', graphqlHTTP({
  schema,
  pretty: true,
  graphiql: isDevelopment,
  formatError: isDevelopment ?
    error => console.error(error) || { message: error.message, locations: error.locations } :
    error => console.error(error) || { message: 'Internal server error' },
}))
.listen(3001, err => console.log(err || 'GraphQL endpoint listening on port 3001\n'));
