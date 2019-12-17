const express = require("express");
const graphqlHTTP = require('express-graphql');
const schema = require('../schema/schema');
const server = express();
const cors = require("cors");
const prerender = require('prerender-node');

const authRouter = require('../auth/authRouter');
const authenticate = require('../config/authenticate-middleware');


// Middleware
server.use(cors());
server.use(express.json());
server.use(prerender)
server.use('/api', authRouter);


server.use('/graphql', authenticate, graphqlHTTP({
  schema,
  graphiql: true,
}));

server.get('/', (req, res) => {
  res.send('<h3>Server is up and running</h3>');
});

module.exports = server;