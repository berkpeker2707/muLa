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

//like user by using it's id. update it to liked
app.put("/like/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const loggedUser = await User.findById(req.user.id).select("-password");
    //check if it is already liked
    if (user.likedBy.filter((like) => like === req.user.id).length > 0) {
      return res.status(400).json({ msg: "Already Liked" });
    } else {
      await user.likedBy.unshift(req.user.id);
      await loggedUser.liked.unshift(req.params.id);
      await user.save();
      await loggedUser.save();

      const value1 = await user.likedBy.includes(req.user.id);
      // const value1 = await user.likedBy[0].user;
      const value2 = await user.liked.includes(req.user.id);
      // const value2 = await user.liked[0].user;

      if (value1 && value2) {
        await user.matched.unshift(req.user.id);
        await loggedUser.matched.unshift(req.params.id);
        await user.save();
        await loggedUser.save();
        //if matched, create a new conversation

        const filter = { members: [req.user.id, req.params.id] };
        const update = { members: [req.user.id, req.params.id] };
        const newConversation = await Conversation.findOneAndUpdate(
          filter,
          update,
          {
            new: true,
            upsert: true,
          }
        );
        await newConversation.save();

        res.status(200).send("Liked & Matched!");
      } else {
        res.status(200).send("Liked!");
      }
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

//unlike liked user
app.put("/unlike/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const loggedUser = await User.findById(req.user.id).select("-password");
    //check if it is already liked
    if (user.likedBy.filter((like) => like === req.user.id).length === 0) {
      return res.status(400).json({ msg: "User already unliked" });
    }

    //finding location index
    const removeIndex = await user.likedBy.indexOf(req.user.id);

    //finding location index
    const removeIndex2 = await loggedUser.liked.indexOf(req.user.id);

    const removeIndex3 = await user.matched.indexOf(req.user.id);

    //finding location index
    const removeIndex4 = await loggedUser.matched.indexOf(req.user.id);

    //removing element according to index
    await loggedUser.liked.splice(removeIndex2, 1);
    await user.likedBy.splice(removeIndex, 1);

    await loggedUser.matched.splice(removeIndex3, 1);
    await user.matched.splice(removeIndex4, 1);

    await user.save();
    await loggedUser.save();

    //res.json(user.liked);
    res.status(200).send("Unliked");
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

//dislike user by using it's id. update it to disliked
app.put("/dislike/:id", async (req, res) => {
  try {
    // const user = await User.findById(req.params.id);
    const loggedUser = await User.findById(req.user.id).select("-password");
    //check if it is already liked
    if (loggedUser.disliked.filter((dis) => dis === req.params.id).length > 0) {
      return res.status(400).json({ msg: "Already Disliked" });
    } else {
      // await user.likedBy.unshift( req.user.id );
      await loggedUser.disliked.unshift(req.params.id);
      // await user.save();
      await loggedUser.save();

      // const value1 = await user.likedBy.includes(req.user.id);
      // const value1 = await user.likedBy[0].user;
      // const value2 = await user.liked.includes(req.user.id);
      // const value2 = await user.liked[0].user;

      // await user.matched.unshift(req.user.id);
      // await loggedUser.matched.unshift(req.params.id);
      // await user.save();
      // await loggedUser.save();
      //if matched, create a new conversation

      // const filter = { members: [req.user.id, req.params.id] };
      // const update = { members: [req.user.id, req.params.id] };
      // const newConversation = await Conversation.findOneAndUpdate(filter, update, {
      //   new: true,
      //   upsert: true,
      // });
      // await newConversation.save();

      res.status(200).send("Disliked");
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

app.get("/liked", async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(["liked"]);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
