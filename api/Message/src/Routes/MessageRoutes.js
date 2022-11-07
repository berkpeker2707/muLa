const express = require("express");
const auth = require("../middlewares/auth");
const {
  postMessageController,
  getMessageController,
} = require("../Controllers/MessageControllers");
const MessageRoutes = express.Router();

//get user according to id
MessageRoutes.post("/new/:conversationId", auth, postMessageController);

//get all users
MessageRoutes.get("/all/:conversationId", auth, getMessageController);

module.exports = MessageRoutes;
