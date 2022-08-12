const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Acess denied. No Token provided");
  try {
    const decoded = jwt.verify(token, env.process.KEY);
    // this gives you the object of the decoded JSON key ex req.user._id
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid Token.");
  }
}

module.exports = auth;
