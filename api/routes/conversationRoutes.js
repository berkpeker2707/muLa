const express = require("express");
const auth = require("../middlewares/auth");
const {
  postConversationController,
  getConversationsController,
  getConversationWithIDsController,
} = require("../Controllers/ConversationControllers");
const ConversationRoutes = express.Router();

//get user according to id
ConversationRoutes.get("/users/:id", auth, postConversationController);

//get all users
ConversationRoutes.get("/users", auth, getConversationsController);

//update logged in users password
ConversationRoutes.put(
  "/me/update/password",
  auth,
  getConversationWithIDsController
);

module.exports = ConversationRoutes;
