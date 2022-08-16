const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  if (!req.headers["authorization"]) {
    res
      .status(403)
      .json({ message: "You must be logged in to access this page" });
    return;
  }
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    res.status(401);
    return;
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      res.status(403).json({ error: "Access denied, please log in again" });
      return;
    }

    const booleanIsAdmin = user.isAdmin == "true" ? true : false;

    if (booleanIsAdmin) {
      req.user = user;
    } else {
      res.status(403).json({ error: "Only admins can access this page" });
      return;
    }

    req.user = user;

    next();
  });
};

module.exports = authenticateToken;
