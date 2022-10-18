const express = require("express");
const auth = require("../middlewares/auth");
const {
  postMessageController,
  getMessageController,
} = require("../Controllers/MessageControllers");
const MessageRoutes = express.Router();

//get user according to id
MessageRoutes.get("/users/:id", auth, postMessageController);

//get all users
MessageRoutes.get("/users", auth, getMessageController);

module.exports = MessageRoutes;
