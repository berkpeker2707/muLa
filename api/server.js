const express = require("express");

//dotenv config
require("dotenv").config();

//connection for db
const connectDatabase = require("./config/db");

//models
const Conversation = require("./models/conversation");
const User = require("./models/user");

//routes
const AuthRoutes = require("./routes/AuthRoutes");
const ConversationRoutes = require("./routes/ConversationRoutes");
const MessageRoutes = require("./routes/MessageRoutes");
const UserRoutes = require("./routes/UserRoutes");

//encryption and authentication modules
const { errorHandler, notFound } = require("./middlewares/errorHandler");

const app = express({ extended: false });
app.use(express.static("picture"));

connectDatabase();

//bodyparser like middleware for express
app.use(express.json({ extended: false }));

//port
const port = process.env.PORT || 1000;
app.listen(port, () => console.log(`Server started on port ${port}.`));

//routes
app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/conversation", ConversationRoutes);
app.use("/api/message", MessageRoutes);

//Error Handler
//not found has to be at top for json response
app.use(notFound);
app.use(errorHandler);

// ????????????????????????????????????????? //
// ????????????????????????????????????????? //
// ????????????????????????????????????????? //
// ????????????????????????????????????????? //
// ????????????????????????????????????????? //

app.get("/liked", async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(["liked"]);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//get user's matched
app.get("/matched/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const matchedUsers = await Promise.all(
      user.matched.map((id) => {
        return User.findById(id);
      })
    );
    let matchedList = [];
    matchedUsers.map((matchedUser) => {
      const { _id, firstname, picture } = matchedUser;
      matchedList.push({ _id, firstname, picture });
    });
    res.status(200).json(matchedList);
  } catch (err) {
    res.status(500).json(err);
  }
});
