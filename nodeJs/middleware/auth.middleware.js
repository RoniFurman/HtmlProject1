const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.header("x-auth-token");
  if (!token && req.headers.authorization) {
    const [scheme, value] = req.headers.authorization.split(" ");
    if (scheme && scheme.toLowerCase() === "bearer") token = value;
  }

  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};
