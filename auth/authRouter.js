const router = require('express').Router();
const bcjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

const User = require('../models/userModel');

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
  
    User.createUser(user)
      .then(saved => {
        const token = genToken(saved);
        res.status(201).json({ created_user: saved, token: token });
      })
      .catch(err => {
        res.status(500).json(err)
      })
  })

  router.post("/login", (req, res) => {
    const { username, password } = req.body;
    User.find({ username: username })
      .then(user => {
        if (user && bcjs.compareSync(password, user[0].password)) {
          let token = generateToken(user);
          res
            .status(200)
            .json({
              message: `Welcome ${username}! Here's a token: `,
              token: token
            });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch(err => {
        res.status(500).json({ message: "Error logging in" });
      });
  });
  
  function generateToken(user) {
    const payload = {
      subject: user.id,
      username: user.username
    };
  
    const options = {
      expiresIn: "1hr"
    };
  
    return jwt.sign(payload, "whatAboutSecondBreakfast?", options);
  }
  
  module.exports = router;