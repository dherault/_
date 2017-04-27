const fs = require('fs');
const path = require('path');
const SemanticGraph = require('semantic-graphql');

const resolvers = require('./resolvers');

const inputDir = path.join(__dirname, '../../ontology');

const _ = new SemanticGraph(resolvers, { relay: true });

fs.readdirSync(inputDir).forEach(name => name.endsWith('.ttl') && _.parseFile(path.join(inputDir, name)));

console.log(`graph created: ${_}`);

module.exports = _;
// Register connections
// This will add the proper mechanics around the field (ie the connectionArgs and the connectionResolver)
// _['http://foo.com#hasComments'].isRelayConnection = true;

// Any part of the field can still be overriden with
// _['http://foo.com#hasComments'].graphqlFieldConfigExtension = { type: ..., resolve: ..., ...}
// Or the field can be overriden entirely using
// _['http://foo.com#hasComments'].graphqlFieldConfig = { type: ..., resolve: ..., ...}
