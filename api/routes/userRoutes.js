const express = require("express");
const auth = require("../middlewares/auth");
const {
  photoUpload,
  profilePhotoResize,
} = require("../middlewares/photoUpload");
const {
  getLoggedInUser,
  getUsersController,
  getUserController,
  updateUserController,
  updateUsersTestController,
  updateUserPasswordController,
  generateVerificationController,
  verifyAccount,
  profilePhotoUploadController,
  profilePhotoDeleteController,
  photoUploadController,
  photoDeleteController,
} = require("../controllers/userControllers");
const userRoutes = express.Router();

//get logged in user
userRoutes.get("/me", auth, getLoggedInUser);

//get all users
userRoutes.get("/users", auth, getUsersController);

//get user according to id
userRoutes.get("/:id", auth, getUserController);

//update logged in user
userRoutes.put("/update", auth, updateUserController);

//update logged in user
userRoutes.put("/update/test", auth, updateUsersTestController);

//update logged in users password
userRoutes.put("/update/password", auth, updateUserPasswordController);

//send verify email
userRoutes.post("/generate-verification", auth, generateVerificationController);

//verify account
userRoutes.put(
  "/verify-account",
  // auth,
  verifyAccount
);

//upload profile image
userRoutes.post(
  "/image/profile/upload",
  auth,
  photoUpload.single("image"),
  profilePhotoResize,
  profilePhotoUploadController
);

//delete profile image
userRoutes.delete("/image/profile/delete", auth, profilePhotoDeleteController);

//upload photo
userRoutes.post(
  "/image/upload",
  auth,
  photoUpload.single("image"),
  profilePhotoResize,
  photoUploadController
);

//upload photo
userRoutes.delete("/image/delete", auth, photoDeleteController);

module.exports = userRoutes;
