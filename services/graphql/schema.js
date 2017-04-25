const fs = require('fs');
const path = require('path');
const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const graphqlHTTP = require('express-graphql');
const express = require('express');
const SemanticGraph = require('semantic-graphql');

const data = require('./data');
const resolvers = require('./resolvers');

const _ = new SemanticGraph(resolvers, { relay: true });
const inputDir = path.join(__dirname, '../../ontology');

fs.readdirSync(inputDir).forEach(name => name.endsWith('.ttl') && _.parseFile(path.join(inputDir, name)));

console.log(`graph created: ${_}`);

// Register connections
// This will add the proper mechanics around the field (ie the connectionArgs and the connectionResolver)
// _['http://foo.com#hasComments'].isRelayConnection = true;

// Any part of the field can still be overriden with
// _['http://foo.com#hasComments'].graphqlFieldConfigExtension = { type: ..., resolve: ..., ...}
// Or the field can be overriden entirely using
// _['http://foo.com#hasComments'].graphqlFieldConfig = { type: ..., resolve: ..., ...}

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: _.getObjectType('http://foo.com#Person'),
        resolve: () => data[0],
      },
      node: _.nodeField,
    },
  }),
});
