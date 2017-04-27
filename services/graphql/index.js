const graphqlHTTP = require('express-graphql');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const schema = require('./schema');
const isDevelopment = process.env.NODE_ENV !== 'production';

const server = express()
.use(cors())
.use(bodyParser.urlencoded({ extended: false }))
.use(bodyParser.json())
.use('/graphql', (req, res, next) => {

  /* Log query */

  if (req.body && req.body.query) {
    console.log('\n__________\nNew query:\n', req.body.query);

    if (req.body.variables) {
      console.log('\nVariables:\n', JSON.stringify(req.body.variables, null, 2));
    }
  }
  else {
    console.log('body:', req.body);
  }

  /* Fetch user data */

  graphqlHTTP({
    schema,
    pretty: true,
    graphiql: isDevelopment,
    formatError: isDevelopment ?
      error => console.error(error) || { message: error.message, locations: error.locations } :
      error => console.error(error) || { message: 'Internal server error' },
  })(req, res);
})
.listen(3001, err => console.log(err || 'GraphQL endpoint listening on port 3001\n'));

process.on('SIGINT', () => {
  console.log('Terminating GraphQL service.');
  server.close();
  process.exit();
});
