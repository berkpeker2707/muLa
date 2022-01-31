const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  conversationId: {
    type: String,
  },
  sender:{
      type:String
  },
  text:{
      type:String
  }
},
{
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
}
);

module.exports = Message = mongoose.model("message", MessageSchema);
