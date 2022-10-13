const express = require("express");
const auth = require("../middlewares/auth");
const {
  postConversationController,
  getConversationsController,
  getConversationWithIDsController,
} = require("../Controllers/ConversationControllers");
const ConversationRoutes = express.Router();

ConversationRoutes.post("/new", auth, postConversationController);
ConversationRoutes.get("/users", auth, getConversationsController);
ConversationRoutes.get(
  "/me/update/password",
  auth,
  getConversationWithIDsController
);
// ConversationRoutes.get("/users/:id", auth, postConversationController);

// ConversationRoutes.get("/find/:firstUserId/:secondUserId", auth, adasda);

module.exports = ConversationRoutes;
