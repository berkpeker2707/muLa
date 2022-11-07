const express = require("express");
const auth = require("../middlewares/auth");
const {
  photoUpload,
  profilePhotoResize,
} = require("../middlewares/photoUpload");
const {
  getLoggedInUser,
  getUserController,
  getAllUserController,
  updateUserController,
  updateUsersTestController,
  updateUserPasswordController,
  profilePhotoUploadController,
  profilePhotoDeleteController,
  photoUploadController,
  photoDeleteController,
  likeUserController,
  dislikeUserController,
  blockUserController,
} = require("../controllers/userControllers");
const userRoutes = express.Router();

userRoutes.get("/me", auth, getLoggedInUser);
userRoutes.get("/select/:id", auth, getUserController);
userRoutes.get("/all", auth, getAllUserController);
userRoutes.put("/update", auth, updateUserController);
userRoutes.put("/update/test", auth, updateUsersTestController);
userRoutes.put("/update/password", auth, updateUserPasswordController);
userRoutes.post(
  "/image/profile/upload",
  auth,
  photoUpload.single("image"),
  profilePhotoResize,
  profilePhotoUploadController
);
userRoutes.delete("/image/profile/delete", auth, profilePhotoDeleteController);
userRoutes.post(
  "/image/upload",
  auth,
  photoUpload.single("image"),
  profilePhotoResize,
  photoUploadController
);
userRoutes.delete("/image/delete", auth, photoDeleteController);
userRoutes.put("/like", auth, likeUserController);
userRoutes.put("/dislike", auth, dislikeUserController);
userRoutes.put("/block", auth, blockUserController);

module.exports = userRoutes;
