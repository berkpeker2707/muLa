const express = require("express");
const auth = require("../middlewares/auth");
const {
  postMessageController,
  getMessageontroller,
} = require("../controllers/messageControllers");
const messageRoutes = express.Router();

//get user according to id
messageRoutes.get("/users/:id", auth, postMessageController);

//get all users
messageRoutes.get("/users", auth, getMessageontroller);

module.exports = messageRoutes;
