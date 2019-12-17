const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.token;
  if (req.decodedJwt) {
    next();
  } else if (token) {
    jwt.verify(token, "whatAboutSecondBreakfast?", (err, decodedJwt) => {
      if (err) {
        res.status(402).json({ message: "Failed to verify authorization" });
      } else {
        req.decodedJwt = decodedJwt;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Failed to verify authorization" });
  }
}