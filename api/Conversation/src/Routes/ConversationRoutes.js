const express = require("express");
const auth = require("../middlewares/auth");
const {
  postConversationController,
  getConversationsController,
  getConversationWithIDsController,
} = require("../controllers/conversationControllers");
const conversationRoutes = express.Router();

conversationRoutes.post("/new", auth, postConversationController);
conversationRoutes.get("/my-conversations", auth, getConversationsController);
conversationRoutes.get(
  "/conversation/:firstUserId/:secondUserId",
  auth,
  getConversationWithIDsController
);

module.exports = conversationRoutes;
