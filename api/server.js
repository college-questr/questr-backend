const express = require("express");
const graphqlHTTP = require('express-graphql');
const schema = require('../schema/schema');
const server = express();
const cors = require("cors");

const authRouter = require('../auth/authRouter')

// const { createToken, verifyToken } = require('../auth/authentication');

// Middleware
server.use(cors());
server.use(express.json());
server.use('/api', authRouter)

// server.use('/login', (req, res) => {
//   if (req.method === 'POST') {
//     const token = createToken(req.body.username, req.body.password)
//     if (token) { //send successful token
//       res.status(200).json({ token })
//     } else {
//       res.status(403).json({ //no token - invalid credentials
//         message: 'Login failed! Invalid credentials!'
//       })
//     }
//   }
// });

// server.use('/verifyToken', (req, res) => {
//   if (req.method === 'POST') {
//     try {
//       const token = req.headers['authorization']
//       const user = verifyToken(token)
//       res.status(200).json({ user })
//     } catch (e) {
//       console.log(e.message)
//       res.status(401).json({ //unauthorized token
//         message: e.message
//       })
//     }
//   }
// });

// server.use('/graphql', (req, res, next) => {
//   const token = req.headers['authorization']
//   try {
//     req.user = verifyToken(token)
//     next()
//   } catch (e) {
//     res.status(401).json({ //unauthorized token
//       message: e.message
//     })
//   }
// });

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

server.get('/', (req, res) => {
  res.send('<h3>Server is up and running</h3>');
});

module.exports = server;