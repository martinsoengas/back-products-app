const jwt = require("jsonwebtoken");

const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(401).json({ message: "Please fill user and password" });
  }

  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const token = jwt.sign(user, process.env.TOKEN_SECRET);
  res.status(200).json({ token });
};

module.exports = { login };
