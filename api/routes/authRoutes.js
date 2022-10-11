const express = require("express");
const auth = require("../middlewares/auth");
const {
  registerController,
  loginController,
} = require("../Controllers/AuthControllers");
const AuthRoutes = express.Router();

//register controller
AuthRoutes.post("/register", registerController);

//login controller
AuthRoutes.post("/login", loginController);

module.exports = AuthRoutes;
