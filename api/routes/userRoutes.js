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
} = require("../controllers/UserControllers");
const UserRoutes = express.Router();

UserRoutes.get("/me", auth, getLoggedInUser);
UserRoutes.get("/select/:id", auth, getUserController);
UserRoutes.get("/all", auth, getAllUserController);
UserRoutes.put("/update", auth, updateUserController);
UserRoutes.put("/update/test", auth, updateUsersTestController);
UserRoutes.put("/update/password", auth, updateUserPasswordController);
UserRoutes.post(
  "/image/profile/upload",
  auth,
  photoUpload.single("image"),
  profilePhotoResize,
  profilePhotoUploadController
);
UserRoutes.delete("/image/profile/delete", auth, profilePhotoDeleteController);
UserRoutes.post(
  "/image/upload",
  auth,
  photoUpload.single("image"),
  profilePhotoResize,
  photoUploadController
);
UserRoutes.delete("/image/delete", auth, photoDeleteController);
UserRoutes.put("/like", auth, likeUserController);

module.exports = UserRoutes;
