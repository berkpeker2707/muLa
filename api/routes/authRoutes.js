const express = require("express");
const auth = require("../middlewares/auth");
const {
  registerController,
  loginController,
} = require("../controllers/authControllers");
const authRoutes = express.Router();

//register controller
authRoutes.post("/register", registerController);

//login controller
authRoutes.post("/login", loginController);

module.exports = authRoutes;
