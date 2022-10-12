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
  profilePhotoUploadController,
  profilePhotoDeleteController,
  photoUploadController,
  photoDeleteController,
} = require("../controllers/userControllers");
const UserRoutes = express.Router();

UserRoutes.get("/me", auth, getLoggedInUser);
UserRoutes.get("/:id", auth, getUserController);
UserRoutes.get("/users", auth, getUsersController);
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

module.exports = UserRoutes;
