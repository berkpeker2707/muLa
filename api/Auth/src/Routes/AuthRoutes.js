const express = require("express");

var path = require("path");

console.log(__dirname);
console.log(path.resolve("./"));

const {
  preRegisterController,
  verifyRegisterController,
  registerController,
  loginController,
  forgotPasswordController,
  verifyPasswordController,
} = require(`${__dirname}/Controllers/authControllers`);

const authRoutes = express.Router();

authRoutes.post("/pre-register", preRegisterController);
authRoutes.post("/verify-register", verifyRegisterController);
authRoutes.post("/register", registerController);
authRoutes.post("/login", loginController);
authRoutes.post("/forgot-password", forgotPasswordController);
authRoutes.post("/verify-password", verifyPasswordController);

module.exports = authRoutes;
