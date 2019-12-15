const jwt = require('jsonwebtoken');


const expiresIn = '3h'
const secret = 'samplejwtauthgraphql'
const tokenPrefix = 'JWT'

const createToken = (username, password) => {
  if (!username || !password) { // no credentials = fail
    return false
  }
  const user = User.find(
    (user) => {
      return user.username === username.toLowerCase()
        && user.password.toLowerCase() === password
    }
  );
  if (!user) { // return false if not found
    return false
  }
  const payload = {
    username: user.username,
  }
  const token = jwt.sign(payload, secret, {
    expiresIn
  })
  return token
}

const verifyToken = (token) => {
  const [prefix, payload] = token.split('')
  let user = null
  if (!payload) { //no token in the header
    throw new Error('No token provided')
  }
  if (prefix !== tokenPrefix) { //unexpected prefix or format
    throw new Error('Invalid header format')
  }
  jwt.verify(payload, secret, (err, data) => {
    if (err) { //token is invalid
      throw new Error('Invalid token!')
    } else {
      user = User.find({ username: data.username })
    }
  })
  if (!user) { //user does not exist in DB
    throw new Error('User doesn not exist')
  }
  return user
}

module.exports.createToken = createToken;
module.exports.verifyToken = verifyToken;