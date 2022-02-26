const express = require("express");
const mongoose = require("mongoose");
//connection for db
const connectDatabase = require("./config/db");

//models
const User = require("./models/User");
const Conversation = require("./models/Conversation");
const Message = require("./models/Message");

//dotenv config
require("dotenv").config();

//using this in password reset
const _ = require("lodash");

//file management stuff
const fs = require("fs");

//image config starts
//image uploading
var multer = require('multer');
//using this for file (image) stream
const Grid = require("gridfs-stream");
//image for stream
const conn = mongoose.createConnection(process.env.dbKEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
conn.once("open", () => {
  //Init Stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("picture");
});

//image config for multer
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var picture = multer({ storage: storage });
//image config ends

//encryption and authentication modules
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

//Mailing System
const mailgun = require("mailgun-js");
const { userRegisterController } = require("./Controllers/UserControllers");
const userRoutes = require("./routes/User/userRoutes");
const { errorHandler, notFound } = require("./middlewares/errorHandler");
const DOMAIN = "sandbox186fa978175a44d0863ae4d3f6763326.mailgun.org";
const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN });

const app = express({ extended: false });
app.use(express.static("picture"));

connectDatabase();

//bodyparser like middleware for express
//app.use(express.json());
app.use(express.json({ extended: false }));

//port
const port = process.env.PORT || 1000;
app.listen(port, () => console.log(`Server started on port ${port}.`));

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

////////////////////
//Image config stars
////////////////////

// const conn = mongoose.createConnection(process.env.dbKEY, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// conn.once("open", () => {
//   //Init Stream
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection("picture");
// });


// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
  
// var picture = multer({ storage: storage });


///////////////////////////////////////////////////////////////////////////////
// const storage = new GridFsStorage({
//   url: process.env.dbKEY,
//   cache: true,
//   options: { useNewUrlParser: true, useUnifiedTopology: true },
//   file: (req, file) => {

//     const match = ["image/png", "image/jpeg"];

//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString("hex") + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: "picture",
//         };
//         resolve(fileInfo);
//       });
//     });
//   },
// });
// const picture = multer({ storage });

// const store = multer({
//   storage,
//   limits: {
//     fileSize: 20000000,
//     fileFilter: (req,file,cb) => {
//       checkFileType(file,cb)
//     }
//   },
// });

// function checkFileType(file,cb) {
//   const filetypes = /jpeg|jgp|png/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);
//   if(mimetype && extname) return cb(null,true);
//   cb("filetype")
// }

// const uploadMiddleware = (req,res,next) =>{
//   const upload = store.single("picture")
// upload(req,res,function(err) {
//   if(err instanceof multer.MulterError){
//     return res.status(400).send("File too large");
//   } else if(err){
//     if(err === "filetype") return res.status(400).send("Image files only.");
//     return res.sendStatus(500)
//   }
//   next();
// })
// }

/////////////////////
//Image config ends
////////////////////

//Controllers
//Routes

//User Routes
app.use("/api/user", userRoutes);

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
app.put("/like/:id",  async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const loggedUser = await User.findById(req.user.id).select("-password");
    //check if it is already liked
    if (
      user.likedBy.filter((like) => like === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: "Already Liked" });
    } else {
      await user.likedBy.unshift( req.user.id );
      await loggedUser.liked.unshift(req.params.id );
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
        const newConversation = await Conversation.findOneAndUpdate(filter, update, {
          new: true,
          upsert: true,
        });
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
app.put("/unlike/:id",  async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const loggedUser = await User.findById(req.user.id).select("-password");
    //check if it is already liked
    if (
      user.likedBy.filter((like) => like === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "User already unliked" });
    }

    //finding location index
    const removeIndex = await user.likedBy
      .indexOf(req.user.id);

    //finding location index
    const removeIndex2 = await loggedUser.liked
      .indexOf(req.user.id);


    const removeIndex3 = await user.matched
      .indexOf(req.user.id);

    //finding location index
    const removeIndex4 = await loggedUser.matched
      .indexOf(req.user.id);

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
app.get("/matched/:id",  async (req, res) => {
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
    res.status(200).json(matchedList)
  } catch (err) {
    res.status(500).json(err);
  }
});

//dislike user by using it's id. update it to disliked
app.put("/dislike/:id",  async (req, res) => {
  try {
    // const user = await User.findById(req.params.id);
    const loggedUser = await User.findById(req.user.id).select("-password");
    //check if it is already liked
    if (
      loggedUser.disliked.filter((dis) => dis === req.params.id).length > 0
    ) {
      return res.status(400).json({ msg: "Already Disliked" });
    } else {
      // await user.likedBy.unshift( req.user.id );
      await loggedUser.disliked.unshift(req.params.id );
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

app.get("/liked",  async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select([
      "liked"
    ]);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/////////////////////////////////
// Conversation Section Starts //
/////////////////////////////////

//post a conversation
app.post("/conversation",  async (req, res) => {
  try {
    //const loggedUser = await User.findById(req.user.id).select(["_id"]);
    //const user = await User.findById(req.params.id);
    const newConversation = await new Conversation({
      members: [req.body.senderId, req.body.recieverId],
    });
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//get conversations
app.get("/conversations/:userId",  async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//post a messages
app.post("/message",  async (req, res) => {
  try {
    const newMesssage = new Message(req.body);
    const savedMessage = await newMesssage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get messages
app.get("/messages/:conversationId",  async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId:req.params.conversationId
    });
    res.status(200).json(messages)
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId
app.get("/conversations/find/:firstUserId/:secondUserId",  async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});

///////////////////////////////
// Conversation Section Ends //
///////////////////////////////