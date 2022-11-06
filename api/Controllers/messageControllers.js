const expressAsyncHandler = require("express-async-handler");
const Message = require("../Models/message");

//dotenv config
require("dotenv").config();

//post a messages ***
const postMessageController = expressAsyncHandler(async (req, res) => {
  try {
    const newMesssage = new Message({
      conversationId: req.params.conversationId,
      sender: req.user.id,
      text: req.body.text,
    });
    const savedMessage = await newMesssage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(400);
    throw new Error("Bad Request!");
  }
});

//get messages ***
const getMessageController = expressAsyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(400);
    throw new Error("Bad Request!");
  }
});

module.exports = {
  postMessageController,
  getMessageController,
};
