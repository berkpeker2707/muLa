const User = require("../models/user");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../config/token");

//dotenv config
require("dotenv").config();

//post a conversation controller ***
const postConversationController = expressAsyncHandler(async (req, res) => {
  try {
    const conversationExists = await Conversation.find({
      members: { $all: [req.body.senderId, req.body.recieverId] },
    });

    if (conversationExists == "") {
      const newConversation = await new Conversation({
        members: [req.body.senderId, req.body.recieverId],
      });
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } else {
      res.status(401);
      throw new Error("Invalid Entry!");
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error("Bad Request!");
  }
});

//get conversations of logged in user controller ***
const getConversationsController = expressAsyncHandler(async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.user.id] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(400);
    throw new Error("Bad Request!");
  }
});

//get conv includes two userId controller
const getConversationWithIDsController = expressAsyncHandler(
  async (req, res) => {
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// // get conv includes two userId
// app.get("/conversations/find/:firstUserId/:secondUserId", async (req, res) => {
//   try {
//     const conversation = await Conversation.findOne({
//       members: { $all: [req.params.firstUserId, req.params.secondUserId] },
//     });
//     res.status(200).json(conversation);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = {
  postConversationController,
  getConversationsController,
  getConversationWithIDsController,
};
