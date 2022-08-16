const express = require("express");
const routes = express.Router();
const authenticateToken = require("../middleware/auth");

const {
  userLogin,
  userLogout,
  addUser,
  userToken,
} = require("../controllers/userController");

routes.post("/login", userLogin);

routes.delete("/logout", userLogout);

routes.post("/token", userToken);

routes.post("/new-user", authenticateToken, addUser);

module.exports = routes;
