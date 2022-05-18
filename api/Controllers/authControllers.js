const User = require("../models/user");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../config/token");

//register user controller
const registerController = expressAsyncHandler(async (req, res) => {
  const userExists = await User.findOne({ email: req?.body?.email });

  if (userExists) {
    throw new Error("User already exists.");
  }
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
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

//login user controller
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

module.exports = {
  registerController,
  loginController,
};
