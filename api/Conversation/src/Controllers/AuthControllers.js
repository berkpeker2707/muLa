const User = require("../Models/user");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../config/token");
const {
  smtpAccountCreationFunc,
  smtpForgotPasswordFunc,
} = require("../helpers/smtp");
require("dotenv").config();
const crypto = require("crypto");

//first step of login with email verification ***
const preRegisterController = expressAsyncHandler(async (req, res) => {
  try {
    //save the user
    const newUserInvalidated = await User.create({
      email: req?.body?.email,
      password: req?.body?.password,
      firstname: req?.body?.firstname,
      lastname: req?.body?.lastname,
      age: req?.body?.age,
      gender: req?.body?.gender,
      job: req?.body?.job,
      description: req?.body?.description,

      userLatitude: req?.body?.userLatitude,
      userLongitude: req?.body?.userLongitude,

      language: req?.body?.language,
      belief: req?.body?.belief,
      politics: req?.body?.politics,
      diet: req?.body?.diet,
      alcohol: req?.body?.alcohol,
      smoking: req?.body?.smoking,

      extraversionValue: req?.body?.extraversionValue,
      introversionValue: req?.body?.introversionValue,
      sensingValue: req?.body?.sensingValue,
      intuitionValue: req?.body?.intuitionValue,
      thinkingValue: req?.body?.thinkingValue,
      feelingValue: req?.body?.feelingValue,
      judgingValue: req?.body?.judgingValue,
      perceivingValue: req?.body?.perceivingValue,
      characterType: req?.body?.characterType,
      /* Defaults 1 days from now */
      expireAt: new Date(new Date().valueOf() + 86400000),
    });

    //generate token
    const verificationToken =
      await newUserInvalidated.createAccountVerificationToken();

    await newUserInvalidated.save();

    await smtpAccountCreationFunc(verificationToken, newUserInvalidated, res);
  } catch (error) {
    res.status(401);
    throw new Error("Invalid Entry!");
  }
});

//second step of login with email verification ***
const verifyRegisterController = expressAsyncHandler(async (req, res) => {
  try {
    const token = req.body.token;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    //find this user by token
    const userFound = await User.findOne({
      accountVerificationToken: hashedToken,
      accountVerificationTokenExpires: { $gt: new Date() },
    });

    //update isAccountVerified to true
    userFound.accountVerified = true;
    userFound.accountVerificationToken = undefined;
    userFound.accountVerificationTokenExpires = undefined;
    await userFound.save();

    await userFound.updateOne({ $unset: { expireAt: 1 } });

    res.status(200).json(userFound);
  } catch (error) {
    res.status(401);
    throw new Error("Token expired!");
  }
});

//register without email verification ***
const registerController = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.create({
      email: req?.body?.email,
      password: req?.body?.password,
      firstname: req?.body?.firstname,
      lastname: req?.body?.lastname,
      age: req?.body?.age,
      gender: req?.body?.gender,
      job: req?.body?.job,
      description: req?.body?.description,

      userLatitude: req?.body?.userLatitude,
      userLongitude: req?.body?.userLongitude,

      language: req?.body?.language,
      belief: req?.body?.belief,
      politics: req?.body?.politics,
      diet: req?.body?.diet,
      alcohol: req?.body?.alcohol,
      smoking: req?.body?.smoking,

      extraversionValue: req?.body?.extraversionValue,
      introversionValue: req?.body?.introversionValue,
      sensingValue: req?.body?.sensingValue,
      intuitionValue: req?.body?.intuitionValue,
      thinkingValue: req?.body?.thinkingValue,
      feelingValue: req?.body?.feelingValue,
      judgingValue: req?.body?.judgingValue,
      perceivingValue: req?.body?.perceivingValue,
      characterType: req?.body?.characterType,
    });

    //update isAccountVerified to true
    user.accountVerified = true;
    user.accountVerificationToken = undefined;
    user.accountVerificationTokenExpires = undefined;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(401);
    throw new Error("Invalid Entry!");
  }
});

//login controller ***
const loginController = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email });
  //check if password is matched
  if (userFound && (await userFound.isPasswordMatched(password))) {
    res.json({
      _id: userFound?._id,
      email: userFound?.email,
      password: userFound?.password,
      firstname: userFound?.firstname,
      lastname: userFound?.lastname,
      age: userFound?.age,
      gender: userFound?.gender,
      job: userFound?.job,
      description: userFound?.description,

      userLatitude: userFound?.userLatitude,
      userLongitude: userFound?.userLongitude,

      language: userFound?.language,
      belief: userFound?.belief,
      politics: userFound?.politics,
      diet: userFound?.diet,
      alcohol: userFound?.alcohol,
      smoking: userFound?.smoking,

      extraversionValue: userFound?.extraversionValue,
      introversionValue: userFound?.introversionValue,
      sensingValue: userFound?.sensingValue,
      intuitionValue: userFound?.intuitionValue,
      thinkingValue: userFound?.thinkingValue,
      feelingValue: userFound?.feelingValue,
      judgingValue: userFound?.judgingValue,
      perceivingValue: userFound?.perceivingValue,
      characterType: userFound?.characterType,
      token: generateToken(userFound?._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Entry!");
  }
});

//forgot password controller ***
const forgotPasswordController = expressAsyncHandler(async (req, res) => {
  try {
    const emailExists = await User.findOne({ email: req.body.userEmail });
    const recievedEmail = req.body.userEmail;
    //generate token
    const verificationToken =
      await emailExists.createAccountVerificationToken();

    //save the user
    await emailExists.save();

    await smtpForgotPasswordFunc(verificationToken, recievedEmail, res);
  } catch (error) {
    res.status(401);
    throw new Error("Invalid Entry!");
  }
});

//verify password controller ***
const verifyPasswordController = expressAsyncHandler(async (req, res) => {
  try {
    const newPassword = req.body.newPassword;
    const token = req.body.token;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    //find this user by token
    const userFound = await User.findOne({
      accountVerificationToken: hashedToken,
      accountVerificationTokenExpires: { $gt: new Date() },
    });

    //change user password
    userFound.password = newPassword;
    await userFound.save();

    //update isAccountVerified to true
    userFound.accountVerified = true;
    userFound.accountVerificationToken = undefined;
    userFound.accountVerificationTokenExpires = undefined;

    await userFound.save();

    res.json(userFound);
  } catch (error) {
    res.status(401);
    throw new Error("Invalid Entry!");
  }
});

module.exports = {
  preRegisterController,
  verifyRegisterController,
  registerController,
  loginController,
  forgotPasswordController,
  verifyPasswordController,
};
