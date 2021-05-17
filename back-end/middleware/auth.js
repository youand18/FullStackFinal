const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {

  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token auth denied " });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decodedToken.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};