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
const UserRoutes = express.Router();

//get logged in user
UserRoutes.get("/me", auth, getLoggedInUser);

//get all users
UserRoutes.get("/users", auth, getUsersController);

//get user according to id
UserRoutes.get("/:id", auth, getUserController);

//update logged in user
UserRoutes.put("/update", auth, updateUserController);

//update logged in user
UserRoutes.put("/update/test", auth, updateUsersTestController);

//update logged in users password
UserRoutes.put("/update/password", auth, updateUserPasswordController);

//send verify email
UserRoutes.post("/generate-verification", auth, generateVerificationController);

//verify account
UserRoutes.put(
  "/verify-account",
  // auth,
  verifyAccount
);

//upload profile image
UserRoutes.post(
  "/image/profile/upload",
  auth,
  photoUpload.single("image"),
  profilePhotoResize,
  profilePhotoUploadController
);

//delete profile image
UserRoutes.delete("/image/profile/delete", auth, profilePhotoDeleteController);

//upload photo
UserRoutes.post(
  "/image/upload",
  auth,
  photoUpload.single("image"),
  profilePhotoResize,
  photoUploadController
);

//upload photo
UserRoutes.delete("/image/delete", auth, photoDeleteController);

module.exports = UserRoutes;
