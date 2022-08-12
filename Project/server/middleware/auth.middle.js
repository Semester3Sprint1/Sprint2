const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Acess denied. No Token provided");
  try {
    const decoded = jwt.verify(token, process.env.KEY);

    // this gives you the object of the decoded JSON key ex req.user._id
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid Token.");
  }
}

//Auth function goes here with this only logged in users can use this post
// router.post("/mongo", auth, async (req, res) =>

module.exports = auth;
