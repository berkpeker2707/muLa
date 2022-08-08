const express = require("express");
const mongoose = require("mongoose");
//connection for db
const connectDatabase = require("./config/db");

//models
const User = require("./models/User");
const Conversation = require("./models/Conversation");
const Message = require("./models/Message");

//using this to get config information
const config = require("config");

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
const conn = mongoose.createConnection(config.get("dbKEY"), {
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

//code for authentication
const auth = require("./auth");

//encryption and authentication modules
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

//Mailing System
const mailgun = require("mailgun-js");
const DOMAIN = "sandbox186fa978175a44d0863ae4d3f6763326.mailgun.org";
const mg = mailgun({ apiKey: config.get("MAILGUN_APIKEY"), domain: DOMAIN });

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

// const conn = mongoose.createConnection(config.get("dbKEY"), {
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
//   url: config.get("dbKEY"),
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

//Routes

//////////Register without activation stars//////////
app.post("/testregister", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    email,
    password,
    firstname,
    lastname,
    age,
    gender,
    job,
    description,

    userLatitude,
    userLongitude,

    language,
    belief,
    politics,
    diet,
    alcohol,
    smoking,

    extraversionValue,
    introversionValue,
    sensingValue,
    intuitionValue,
    thinkingValue,
    feelingValue,
    judgingValue,
    perceivingValue,
    characterType,
  } = req.body;

  try {
    //checking user exists
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "User Already Exists!" }] });
    }

    user = new User({
      email,
      password,
      firstname,
      lastname,
      age,
      gender,
      job,
      description,

      userLatitude,
      userLongitude,

      language,
      belief,
      politics,
      diet,
      alcohol,
      smoking,

      extraversionValue,
      introversionValue,
      sensingValue,
      intuitionValue,
      thinkingValue,
      feelingValue,
      judgingValue,
      perceivingValue,
      characterType,
    });
    //encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    //return jsonwebtoken (in order to login right after register)
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 31556926 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//////////Register without activation Ends//////////

//Register with recieving mailing
app.post(
  "/register",
  [
    check("email", "Email is required.").isEmail(),
    check("password", "Password is required.").isLength({ min: 4 }),
    check("firstname", "Firstname is required.").not().isEmpty(),
    check("lastname", "Lastname is required.").not().isEmpty(),
    check("age", "Age is required.").not().isEmpty(),
    check("gender", "Gender is required.").not().isEmpty(),
    check("job", "Job is required.").not().isEmpty(),
    check("description", "Description is required."),

    check("userLatitude", "User Latitude, is required.").not().isEmpty(),
    check("userLongitude", "User Longitude, is required.").not().isEmpty(),

    check("language", "Language is required.").not().isEmpty(),
    check("belief", "Belief is required."),
    check("politics", "Politics is required."),
    check("diet", "Diet is required.").not().isEmpty(),
    check("alcohol", "Alcohol is required.").not().isEmpty(),
    check("smoking", "Smoking is required.").not().isEmpty(),

    check("extraversionValue", "Character test value is required.")
      .not()
      .isEmpty(),
    check("introversionValue", "Character test value is required.")
      .not()
      .isEmpty(),
    check("sensingValue", "Character test value is required.").not().isEmpty(),
    check("intuitionValue", "Character test value is required.")
      .not()
      .isEmpty(),
    check("thinkingValue", "Character test value is required.").not().isEmpty(),
    check("feelingValue", "Character test value is required.").not().isEmpty(),
    check("judgingValue", "Character test value is required.").not().isEmpty(),
    check("perceivingValue", "Character test value is required.")
      .not()
      .isEmpty(),
    check("characterType", "Character test value is required.").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      email,
      password,
      firstname,
      lastname,
      age,
      gender,
      job,
      description,

      userLatitude,
      userLongitude,

      language,
      belief,
      politics,
      diet,
      alcohol,
      smoking,

      extraversionValue,
      introversionValue,
      sensingValue,
      intuitionValue,
      thinkingValue,
      feelingValue,
      judgingValue,
      perceivingValue,
      characterType,
    } = req.body;

    try {
      //checking user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User Already Exists!" }] });
      }

      const token = jwt.sign(
        {
          email,
          password,
          firstname,
          lastname,
          age,
          gender,
          job,
          description,

          userLatitude,
          userLongitude,

          language,
          belief,
          politics,
          diet,
          alcohol,
          smoking,

          extraversionValue,
          introversionValue,
          sensingValue,
          intuitionValue,
          thinkingValue,
          feelingValue,
          judgingValue,
          perceivingValue,
          characterType,
        },
        config.get("jwtSecret"),
        { expiresIn: 12000 } //12000
      );

      //Sending Mail - Starts
      //Sending mail according to jsonwebtoken
      const data = {
        from: "noreply@appmail.com",
        to: email,
        subject: "App Account Activation",
        html: `<h2>Please click for account activation</h2>
        <p>${process.env.CLIENT_URL}/activate${token}</p>
      </form> 

`,
      };
      mg.messages().send(data, function (error, body) {
        if (error) {
          return res.json({
            error: error.message,
          });
        }
        return res.json({
          message: `Email sent, please activate account.`,
        });
      });
      //Sending Mail - Ends
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//Activation mail
app.post("/activate", async (req, res) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(
      token,
      config.get("jwtSecret"),
      async function (err, decodedToken) {
        if (err) {
          return res.status(400).json({ error: "Incorrect or Expired Link." });
        }
        const {
          email,
          password,
          firstname,
          lastname,
          age,
          gender,
          job,
          description,

          userLatitude,
          userLongitude,

          language,
          belief,
          politics,
          diet,
          alcohol,
          smoking,

          extraversionValue,
          introversionValue,
          sensingValue,
          intuitionValue,
          thinkingValue,
          feelingValue,
          judgingValue,
          perceivingValue,
          characterType,
        } = decodedToken;

        try {
          //checking user exists
          let user = await User.findOne({ email });
          if (user) {
            return res.status(400).json({ errors: "User Already Exists!" });
          }

          user = new User({
            email,
            password,
            firstname,
            lastname,
            age,
            gender,
            job,
            description,

            userLatitude,
            userLongitude,

            language,
            belief,
            politics,
            diet,
            alcohol,
            smoking,

            extraversionValue,
            introversionValue,
            sensingValue,
            intuitionValue,
            thinkingValue,
            feelingValue,
            judgingValue,
            perceivingValue,
            characterType,
          });
          //encrypt password
          const salt = bcrypt.genSaltSync(10);
          user.password = await bcrypt.hash(password, salt);
          await user.save();

          res.json({ message: "User activated & registered!" });
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Server Error");
        }
      }
    );
  } else {
    return res.json({ error: "Something went obviously wrong." });
  }
});

//Reset password
app.put("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ error: "User with this email does not exist." });
    }
    const token = jwt.sign(
      { _id: user._id },
      config.get("RESET_PASSWORD_KEY"),
      { expiresIn: 1200 }
    );
    const data = {
      from: "noreply@appmail.com",
      to: email,
      subject: "Reset Password Link",
      html: `<h2>Please click on the link to reset your password.</h2>
        <p>${process.env.CLIENT_URL}/reset-password${token}</p>`,
    };

    return user.updateOne({ resetLink: token }, function (err, success) {
      mg.messages().send(data, function (error, body) {
        if (error) {
          return res.json({
            error: err.message,
          });
        }
        return res.json({
          message: `Email sent, please follow instruction.`,
        });
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Accept reset link
app.put("/reset-password", async (req, res) => {
  const { resetLink, newPass } = req.body;
  if (resetLink) {
    jwt.verify(
      resetLink,
      config.get("RESET_PASSWORD_KEY"),
      async function (error, decodedData) {
        if (error) {
          return res.status(401).json({
            error: "Incorrect or Expired Link.",
          });
        }
        try {
          let user = await User.findOne({ resetLink });
          if (!user) {
            return res
              .status(400)
              .json({ error: "User with authentication does not exist.." });
          }
          //encrypt password
          const salt = bcrypt.genSaltSync(10);
          const newPassHashed = await bcrypt.hash(newPass, salt);
          const obj = {
            password: newPassHashed,
            resetLink: "",
          };

          user = await _.extend(user, obj);
          await user.save();

          return res
            .status(200)
            .json({ message: "Your password has been changed." });
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Server Error");
        }
      }
    );
  } else {
    return res.status(401).json({ error: "Access Denied." });
  }
});

//Login
app.post(
  "/login",
  [
    check("password", "Password is required.").exists(),
    check("email", "Email is required.").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password, email } = req.body;

    try {
      //checking user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "Invalid Entry!" }] });
      }

      //comparing with bcrypt
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Invalid Entry!" }] });
      }
      //return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 31556926 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//Get current user
app.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select([
      "email",
      "password",
      "firstname",
      "lastname",
      "age",
      "gender",
      "job",
      "description",

      "userLatitude",
      "userLongitude",

      "language",
      "belief",
      "politics",
      "diet",
      "alcohol",
      "smoking",

      "picture",

      "extraversionValue",
      "introversionValue",
      "sensingValue",
      "intuitionValue",
      "thinkingValue",
      "feelingValue",
      "judgingValue",
      "perceivingValue",
      "characterType",

      "liked",
      "likedBy",
      "matched",
      "blocked",

      "disliked"
    ]);
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Get user by id
app.get("/user/:id", auth, async (req, res) => {
  try {
    const friendUser = await User.findById(req.params.id).select([
      "email",
      "password",
      "firstname",
      "lastname",
      "age",
      "gender",
      "job",
      "description",

      "userLatitude",
      "userLongitude",

      "language",
      "belief",
      "politics",
      "diet",
      "alcohol",
      "smoking",

      "picture",

      "extraversionValue",
      "introversionValue",
      "sensingValue",
      "intuitionValue",
      "thinkingValue",
      "feelingValue",
      "judgingValue",
      "perceivingValue",
      "characterType",
    ]);
    res.status(200).json(friendUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UNDER CONSTRUCTION IMAGE STUFF
//UNDER CONSTRUCTION IMAGE STUFF
//UNDER CONSTRUCTION IMAGE STUFF
//UNDER CONSTRUCTION IMAGE STUFF
//UNDER CONSTRUCTION IMAGE STUFF

//Get user picture by id
app.get("/user/picture/:id", auth, async (req, res) => {
  try {
    const friendUser = await User.findById(req.params.id).select([
      "firstname",
      "picture",
    ]);
    res.status(200).json(friendUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get specific media file route
app.get("/file/:filename", auth, async (req, res) => {
  try {
      const file = await gfs.files.findOne({ filename: req.params.filename });
      const readStream = gfs.createReadStream(file.filename);
      readStream.pipe(res);
  } catch (error) {
      res.send("not found");
  }
});

//get all images for logged user and filename
app.get("/me/avatar", auth, async (req,res) =>{
  gfs.files.find().toArray((err,files) =>{
if(err){
  console.log(err);
}
else{
    // if(!files || files.length === 0){
    //   res.send("no pictures", {files:false});
    // } else{
      files.map(file => {
        if(file.contentType === "image/jpeg" || file.contentType === "image/jpg" || file.contentType === "image/png"){
          file.isImage = true;
        } else{
          file.isImage = false;
        }
      });
      res.send({files:files});
    // }
  }
  });
})

//get the image of logged user and filename
app.get("/me/avatar/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // if (!file || file.length === 0) {
    //   return res.status(404).json({
    //     err: "No picture exist.",
    //   });
    // }

    //check if image
    if (
      file?.contentType === "image/jpeg" ||
      file?.contentType === "image/jpg" ||
      file?.contentType === "image/png"
    ) {
      //read output to browser by using create read stream
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({ err: "Not an image." });
    }
  });
});

//update logged user's avatar
app.put(
  "/me/update/avatar",
  picture.single("picture"),
  [
    auth,
    // [check("password").exists()]
  ],
  async (req, res) => {
    console.log("file", req.file);
    console.log("file", req.body);
    
    fs.access("./assests/pictures/", (err) => {
      if(err){
      fs.mkdirSync("./assests/pictures");
      }
    });
    await sharp(req.file.buffer).resize({width:390, height: 350}).toFile("./assests/pictures/" +  req.file.originalname);
    // get the .file property from req that was added by the upload middleware
    const { file } = req;
    // and the id of that new image file
    const { id } = file;
    // we can set other, smaller file size limits on routes that use the upload middleware
    // set this and the multer file size limit to whatever fits your project
    if (file.size > 5000000) {
      // if the file is too large, delete it and send an error
      // deleteImage(id);
      return res.status(400).send("file may not exceed 5mb");
    }

    // const { password } = await req.body;
    let modifications = {};
    if (req.file) modifications.picture = await req.file;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: modifications },
      { new: true }
    );
    // .select(["password"]);

    // //comparing with bcrypt
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(400).json({ errors: [{ msg: "Invalid Entry!" }] });
    // }

    res.status(200).send("Updated!");
    await user.save();
  }
);

//UNDER CONSTRUCTION IMAGE STUFF
//UNDER CONSTRUCTION IMAGE STUFF
//UNDER CONSTRUCTION IMAGE STUFF
//UNDER CONSTRUCTION IMAGE STUFF
//UNDER CONSTRUCTION IMAGE STUFF

//Get all users all information except current user
app.get("/users", auth, async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.user.id },
    }).select([
      "email",
      "firstname",
      "lastname",
      "age",
      "gender",
      "job",
      "description",

      "userLatitude",
      "userLongitude",

      "language",
      "belief",
      "politics",
      "diet",
      "alcohol",
      "smoking",

      "picture",

      "extraversionValue",
      "introversionValue",
      "sensingValue",
      "intuitionValue",
      "thinkingValue",
      "feelingValue",
      "judgingValue",
      "perceivingValue",
      "characterType",

      "liked",
      "likedBy",
      "matched"
    ]);

    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Servor Error");
  }
});

//Update user
app.put(
  "/me-update",
  // picture.single("picture"),
  [auth, [check("password").exists()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { password } = await req.body;

      let modifications = {};

      if (req.body.firstname)
        modifications.firstname = await req.body.firstname;
      if (req.body.lastname) modifications.lastname = await req.body.lastname;
      if (req.body.age) modifications.age = await req.body.age;
      if (req.body.gender) modifications.gender = await req.body.gender;
      if (req.body.job) modifications.job = await req.body.job;
      if (req.body.description)
        modifications.description = await req.body.description;

      if (req.body.language) modifications.language = await req.body.language;
      if (req.body.belief) modifications.belief = await req.body.belief;
      if (req.body.politics) modifications.politics = await req.body.politics;
      if (req.body.diet) modifications.diet = await req.body.diet;
      if (req.body.alcohol) modifications.alcohol = await req.body.alcohol;
      if (req.body.smoking) modifications.smoking = await req.body.smoking;

      const user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: modifications },
        { new: true }
      ).select(["password"]);

      //comparing with bcrypt
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Invalid Entry!" }] });
      }

      res.status(200).send("Updated!");
      await user.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//Update user's test
app.put("/test-update", auth, async (req, res) => {
  let modifications = {};

  if (req.body.extraversionValue)
    modifications.extraversionValue = await req.body.extraversionValue;
  if (req.body.introversionValue)
    modifications.introversionValue = await req.body.introversionValue;
  if (req.body.sensingValue)
    modifications.sensingValue = await req.body.sensingValue;
  if (req.body.intuitionValue)
    modifications.intuitionValue = await req.body.intuitionValue;
  if (req.body.thinkingValue)
    modifications.thinkingValue = await req.body.thinkingValue;
  if (req.body.feelingValue)
    modifications.feelingValue = await req.body.feelingValue;
  if (req.body.judgingValue)
    modifications.judgingValue = await req.body.judgingValue;
  if (req.body.perceivingValue)
    modifications.perceivingValue = await req.body.perceivingValue;
  if (req.body.characterType)
    modifications.characterType = await req.body.characterType;

  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: modifications },
      { new: true }
    );

    res.status(200).send("Updated!");
    await user.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//like user by using it's id. update it to liked
app.put("/like/:id", auth, async (req, res) => {
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
app.put("/unlike/:id", auth, async (req, res) => {
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
app.get("/matched/:id", auth, async (req, res) => {
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
app.put("/dislike/:id", auth, async (req, res) => {
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

app.get("/liked", auth, async (req, res) => {
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
app.post("/conversation", auth, async (req, res) => {
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
app.get("/conversations/:userId", auth, async (req, res) => {
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
app.post("/message", auth, async (req, res) => {
  try {
    const newMesssage = new Message(req.body);
    const savedMessage = await newMesssage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get messages
app.get("/messages/:conversationId", auth, async (req, res) => {
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
app.get("/conversations/find/:firstUserId/:secondUserId", auth, async (req, res) => {
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