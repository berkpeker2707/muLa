const User = require("../models/user");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../config/token");

//dotenv config
require("dotenv").config();

//Mailing System
const Mailgun = require("mailgun.js");
const formData = require("form-data");
const mailgun = new Mailgun(formData);
const client = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_PASS,
  url: "https://api.eu.mailgun.net",
});

// hashing token
const crypto = require("crypto");

const fs = require("fs");
// cloudinary
const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../middlewares/cloudinary");

//get logged in user *
const getLoggedInUser = expressAsyncHandler(async (req, res) => {
  const id = req.user.id;
  try {
    const user = await User.findById(id);

    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get specific user controller *
const getUserController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

//get users controller *
const getUsersController = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

//update logged in user controller *
const updateUserController = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  try {
    let modifications = {};

    if (req?.body?.firstname)
      modifications.firstname = await req?.body?.firstname;
    if (req?.body?.lastname) modifications.lastname = await req?.body?.lastname;
    if (req?.body?.age) modifications.age = await req?.body?.age;
    if (req?.body?.gender) modifications.gender = await req?.body?.gender;
    if (req?.body?.job) modifications.job = await req?.body?.job;
    if (req?.body?.description)
      modifications.description = await req?.body?.description;

    if (req?.body?.language) modifications.language = await req?.body?.language;
    if (req?.body?.belief) modifications.belief = await req?.body?.belief;
    if (req?.body?.politics) modifications.politics = await req?.body?.politics;
    if (req?.body?.diet) modifications.diet = await req?.body?.diet;
    if (req?.body?.alcohol) modifications.alcohol = await req?.body?.alcohol;
    if (req?.body?.smoking) modifications.smoking = await req?.body?.smoking;

    const user = await User.findByIdAndUpdate(
      _id,
      { $set: modifications },
      {
        new: true,
        runValidator: true,
      }
    );
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

//update logged in user's test controller *
const updateUsersTestController = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  try {
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

    const user = await User.findByIdAndUpdate(
      _id,
      { $set: modifications },
      {
        new: true,
        runValidator: true,
      }
    );
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

//update logged in user's password controller *
const updateUserPasswordController = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password, newPassword } = req.body;
  try {
    const user = await User.findById(_id);
    if (newPassword && (await user.isPasswordMatched(password))) {
      user.password = newPassword;
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(401);
      throw new Error("Invalid Entry!");
    }
    // res.json(user);
  } catch (error) {
    res.json(error);
  }
});

//generate email verification token controller
const generateVerificationController = expressAsyncHandler(async (req, res) => {
  const loginUserId = req.user.id;
  const userEmail = req.user.email;

  const user = await User.findById(loginUserId);
  try {
    //generate token
    const verificationToken = await user.createAccountVerificationToken();

    //save the user
    await user.save();

    //create a mail
    const messageData = {
      from: "muLa Support <noreply@muLa.com>",
      to: userEmail,
      subject: "Reset Password Link",
      html: `<h2>Please click the link to activate your account within a day.</h2>
      <a href=${process.env.CLIENT_URL}/verify-account/${verificationToken}>Click to Verify</a>`,
      text: "Testing some Mailgun awesomeness!",
    };
    client.messages.create(process.env.MAILGUN_USER, messageData);

    return res.json("Verification Mail Sent!");
  } catch (error) {
    throw new Error(error);
  }
});

//verify (update) account controller
const verifyAccount = expressAsyncHandler(async (req, res) => {
  const { token } = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  //find this user by token
  const userFound = await User.findOne({
    accountVerificationToken: hashedToken,
    accountVerificationTokenExpires: { $gt: new Date() },
  });
  if (!userFound) throw new Error("Token expired, try again later");
  //update isAccountVerified to true
  userFound.accountVerified = true;
  userFound.accountVerificationToken = undefined;
  userFound.accountVerificationTokenExpires = undefined;
  await userFound.save();
  res.json(userFound);
});

//profile photo upload controller
const profilePhotoUploadController = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const localPath = `public/images/profile/${req.file.filename}`;
  const imgUploaded = await cloudinaryUploadImg(localPath);

  const foundUser = await User.findByIdAndUpdate(
    _id,
    {
      profilePhoto: imgUploaded?.data?.secure_url,
      $push: { pictures: imgUploaded?.data?.secure_url },
    },
    { new: true }
  );
  fs.unlinkSync(localPath);

  res.json(imgUploaded);
});

//profile photo delete controller
const profilePhotoDeleteController = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  const { profilePhoto } = req?.body;

  const imgUploaded = await cloudinaryDeleteImg(profilePhoto);

  const foundUser = await User.findById(_id);

  var foundPictureLink = foundUser?.pictures;

  var indexOfSelectedImage = foundPictureLink.findIndex((element) =>
    element.includes(profilePhoto)
  );

  await User.findByIdAndUpdate(
    _id,
    {
      profilePhoto: foundUser?.pictures[indexOfSelectedImage - 1]
        ? foundUser?.pictures[indexOfSelectedImage - 1]
        : null,
      $pull: { pictures: foundPictureLink[indexOfSelectedImage] },
    },
    { new: true }
  );

  res.json(imgUploaded);
});

//photo upload controller
const photoUploadController = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const localPath = `public/images/profile/${req.file.filename}`;
  const imgUploaded = await cloudinaryUploadImg(localPath);

  const foundUser = await User.findByIdAndUpdate(
    _id,
    {
      $push: { pictures: imgUploaded?.data?.secure_url },
    },
    { new: true }
  );
  fs.unlinkSync(localPath);

  res.json(imgUploaded);
});

//photo delete controller
const photoDeleteController = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  const { selectedPhoto } = req?.body;

  const imgUploaded = await cloudinaryDeleteImg(selectedPhoto);

  const foundUser = await User.findById(_id);

  var foundPictureLink = foundUser?.pictures;

  var indexOfSelectedImage = foundPictureLink.findIndex((element) =>
    element.includes(selectedPhoto)
  );

  await User.findByIdAndUpdate(
    _id,
    {
      $pull: { pictures: foundPictureLink[indexOfSelectedImage] },
    },
    { new: true }
  );

  res.json(imgUploaded);
});

module.exports = {
  getLoggedInUser,
  getUserController,
  getUsersController,
  updateUserController,
  updateUsersTestController,
  updateUserPasswordController,
  generateVerificationController,
  verifyAccount,
  profilePhotoUploadController,
  profilePhotoDeleteController,
  photoUploadController,
  photoDeleteController,
};
