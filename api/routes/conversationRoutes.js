const express = require("express");
const auth = require("../middlewares/auth");
const {
  postConversationController,
  getConversationsController,
  getConversationWithIDsController,
} = require("../controllers/conversationControllers");
const conversationRoutes = express.Router();

//get user according to id
conversationRoutes.get("/users/:id", auth, postConversationController);

//get all users
conversationRoutes.get("/users", auth, getConversationsController);

//update logged in users password
conversationRoutes.put(
  "/me/update/password",
  auth,
  getConversationWithIDsController
);

module.exports = conversationRoutes;
