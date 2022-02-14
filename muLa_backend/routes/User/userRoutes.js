const express = require("express");
const auth = require("../../middlewares/auth");
const {
  userRegisterController,
  userLoginController,
  getUsersController,
  getUserController,
  updateUserController,
  updateUserPasswordController,
} = require("../../Controllers/UserControllers");
const userRoutes = express.Router();

//user register
userRoutes.post("/register", userRegisterController);

//user login
userRoutes.post("/login", userLoginController);

//get user according to id
userRoutes.get("/users/:id", auth, getUserController);

//get all users
userRoutes.get("/users", auth, getUsersController);

//update logged in users password
userRoutes.put("/me/update", auth, updateUserController);

//verify account

userRoutes.put("/me/update/password",auth, updateUserPasswordController);

module.exports = userRoutes;
