#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { graphql } = require('graphql');
const { introspectionQuery, printSchema } = require('graphql/utilities');

const schema = require('../schema');
const jsonFileLocation = path.join(__dirname, '../../../dist/schema.json');

graphql(schema, introspectionQuery)
.then(result => {
  if (result.errors) return console.error('ERROR introspecting schema:', JSON.stringify(result.errors, null, 2));

  // Save plugin readable schema
  fs.writeFileSync(jsonFileLocation, JSON.stringify(result, null, 2));

  console.log('Done! Check out the dist folder.');
})
.catch(err => {
  console.error(err);

  process.exit(1);
});
