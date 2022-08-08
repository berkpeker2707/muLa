const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  members: {
    type: Array,
  },
});

module.exports = Conversation = mongoose.model(
  "conversation",
  conversationSchema
);
