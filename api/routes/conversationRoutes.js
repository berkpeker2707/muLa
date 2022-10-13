const express = require("express");
const auth = require("../middlewares/auth");
const {
  postConversationController,
  getConversationsController,
  getConversationWithIDsController,
} = require("../Controllers/ConversationControllers");
const ConversationRoutes = express.Router();

ConversationRoutes.post("/new", auth, postConversationController);
ConversationRoutes.get("/my-conversations", auth, getConversationsController);
ConversationRoutes.get(
  "/conversation/:firstUserId/:secondUserId",
  auth,
  getConversationWithIDsController
);
// ConversationRoutes.get("/users/:id", auth, postConversationController);

// ConversationRoutes.get("/find/:firstUserId/:secondUserId", auth, adasda);

module.exports = ConversationRoutes;
