const User = require("../models/user");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../config/token");

//dotenv config
require("dotenv").config();

//post a messages
const postMessageController = expressAsyncHandler(async (req, res) => {
  try {
    const newMesssage = new Message(req.body);
    const savedMessage = await newMesssage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get messages
const getMessageontroller = expressAsyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {
  postMessageController,
  getMessageontroller,
};
