const express = require("express");
const {
  preRegisterController,
  verifyRegisterController,
  registerController,
  loginController,
  forgotPasswordController,
  verifyPasswordController,
} = require("../controllers/authControllers");
const authRoutes = express.Router();

authRoutes.post("/pre-register", preRegisterController);
authRoutes.post("/verify-register", verifyRegisterController);
authRoutes.post("/register", registerController);
authRoutes.post("/login", loginController);
authRoutes.post("/forgot-password", forgotPasswordController);
authRoutes.post("/verify-password", verifyPasswordController);

module.exports = authRoutes;
