const express = require("express");
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const server = express();
const cors = require("cors");

// Middleware
server.use(cors());
server.use(express.json());

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

server.get('/', (req, res) => {
  res.send('<h3>Server is up and running</h3>');
});

module.exports = server;