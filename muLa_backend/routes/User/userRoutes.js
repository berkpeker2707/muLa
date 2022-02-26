const express = require("express");
const auth = require("../../middlewares/auth");
const {
  photoUpload,
  profilePhotoResize,
} = require("../../middlewares/photoUpload");
const {
  userRegisterController,
  userLoginController,
  getUsersController,
  getUserController,
  updateUserController,
  updateUsersTestController,
  updateUserPasswordController,
  generateVerificationController,
  verifyAccount,
  photoUploadController,
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

//update logged in user
userRoutes.put("/me/update", auth, updateUserController);

//update logged in user
userRoutes.put("/me/update/test", auth, updateUsersTestController);

//update logged in users password
userRoutes.put("/me/update/password", auth, updateUserPasswordController);

//send verify email
userRoutes.post("/generate-verification", auth, generateVerificationController);

//verify account
userRoutes.put("/verify-account", auth, verifyAccount);

//upload image
userRoutes.put(
  "/upload-image",
  auth,
  photoUpload.single("image"),
  profilePhotoResize,
  photoUploadController
);

module.exports = userRoutes;
