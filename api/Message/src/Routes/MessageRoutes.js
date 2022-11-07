const express = require("express");
const auth = require("../middlewares/auth");
const {
  postMessageController,
  getMessageController,
} = require("../Controllers/messageControllers");
const messageRoutes = express.Router();

//get user according to id
messageRoutes.post("/new/:conversationId", auth, postMessageController);

//get all users
messageRoutes.get("/all/:conversationId", auth, getMessageController);

module.exports = messageRoutes;
