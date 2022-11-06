const express = require("express");
const {
  preRegisterController,
  verifyRegisterController,
  registerController,
  loginController,
  forgotPasswordController,
  verifyPasswordController,
} = require("../Controllers/AuthControllers");
const AuthRoutes = express.Router();

AuthRoutes.post("/pre-register", preRegisterController);
AuthRoutes.post("/verify-register", verifyRegisterController);
AuthRoutes.post("/register", registerController);
AuthRoutes.post("/login", loginController);
AuthRoutes.post("/forgot-password", forgotPasswordController);
AuthRoutes.post("/verify-password", verifyPasswordController);

module.exports = AuthRoutes;
