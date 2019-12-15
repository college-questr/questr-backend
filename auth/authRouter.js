const router = require('express').Router();
const bcrypt = require('bcryptjs');
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

  function genToken(user) {

    const payload = {
      userid: user.id,
      username: user.username,
    };
  
    const options = { expiresIn: '1h' };
    const token = jwt.sign(payload, secrets.jwtSecret, options);
  
    return token;
  }
  
  function tokenAuth(req, res, next) {
    const token = req.headers.authorization;
  
    if (req.decodedJwt) {
      next();
    } else if (token) {
      jwt.verify(token, secrets.jwtSecret, (err, decodedJwt) => {
        if (err) {
          res.status(401).json(err)
        } else {
          req.decodedJwt = decodedJwt;
          next();
        }
      })
    } else {
      res.status(401).json({ message: "failed, try again" });
    }
  }
  
  module.exports = router;