const User = require("../models/user");
const expressAsyncHandler = require("express-async-handler");
require("dotenv").config();
const fs = require("fs");
const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../middlewares/cloudinary");

//get logged in user controller ***
const getLoggedInUser = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(400);
    throw new Error("Bad Request!");
  }
});

//get specific user controller ***
const getUserController = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(400);
    throw new Error("Bad Request!");
  }
});

//get users controller ***
const getAllUserController = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400);
    throw new Error("Bad Request!");
  }
});

//update logged in user controller ***
const updateUserController = expressAsyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
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
    res.status(400);
    throw new Error("Bad Request!");
  }
});

//update logged in user's test controller ***
const updateUsersTestController = expressAsyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
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
    res.status(400);
    throw new Error("Bad Request!");
  }
});

//update logged in user's password controller ***
const updateUserPasswordController = expressAsyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const { password, newPassword } = req.body;
    const user = await User.findById(_id);
    if (newPassword && (await user.isPasswordMatched(password))) {
      user.password = newPassword;
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(401);
      throw new Error("Invalid Entry!");
    }
  } catch (error) {
    res.status(400);
    throw new Error("Bad Request!");
  }
});

//profile photo upload controller ***
const profilePhotoUploadController = expressAsyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const localPath = `public/images/uploads/${req.file.filename}`;
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
  } catch (error) {
    res.status(400);
    throw new Error("Bad Request!");
  }
});

//profile photo delete controller ***
const profilePhotoDeleteController = expressAsyncHandler(async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400);
    throw new Error("Bad Request!");
  }
});

//photo upload controller ***
const photoUploadController = expressAsyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const localPath = `public/images/uploads/${req.file.filename}`;
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
  } catch (error) {
    res.status(400);
    throw new Error("Bad Request!");
  }
});

//photo delete controller ***
const photoDeleteController = expressAsyncHandler(async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400);
    throw new Error("Bad Request!");
  }
});

///////////////////////////////////////////////
// like, unlike, dislike, match interactions //
///////////////////////////////////////////////

//like & unlike (match and create conversation) user controller ***
const likeUserController = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const likedUser = await User.findById(req.body.liked);

    if (!user.liked.includes(req.body.liked)) {
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        {
          $push: { liked: req.body.liked },
        },
        { new: true }
      );
      const updatedLikedUser = await User.findByIdAndUpdate(
        req.body.liked,
        {
          $push: { likedBy: req.user.id },
        },
        { new: true }
      );

      const matchValue1 = await updatedUser.liked.includes(req.body.liked);
      const matchValue2 = await updatedLikedUser.liked.includes(req.user.id);

      const existingConversation = await Conversation.find({
        members: [req.user.id, req.body.liked],
      });

      if (matchValue1 && matchValue2) {
        await updatedUser.matched.unshift(req.body.liked);
        await updatedLikedUser.matched.unshift(req.user.id);
        await updatedUser.save();
        await updatedLikedUser.save();

        //if matched & conversation does not exist, create a new conversation
        if (existingConversation.length > 0) {
          res.status(200).json("User has been liked & matched!");
        } else {
          const filter = { members: [req.user.id, req.body.liked] };
          const update = { members: [req.user.id, req.body.liked] };

          const newConversation = await Conversation.findOneAndUpdate(
            filter,
            update,
            {
              new: true,
              upsert: true,
            }
          );

          res.status(200).json("User has been liked & matched!");
        }
      } else {
        res.status(200).json("User has been liked");
      }
    } else {
      await user.updateOne({ $pull: { liked: req.body.liked } });
      await likedUser.updateOne({ $pull: { likedBy: req.user.id } });
      await user.updateOne({ $pull: { matched: req.body.liked } });
      await likedUser.updateOne({ $pull: { matched: req.user.id } });
      res.status(200).json("User has been unliked");
    }
  } catch (error) {
    res.status(400);
    throw new Error("Bad Request!");
  }
});

//dislike & remove dislike user controller ***
const dislikeUserController = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (
      !user.disliked.some((alreadyDis) =>
        alreadyDis.dislikedID.includes(req.body.dislike)
      )
    ) {
      await user.updateOne({
        $push: {
          disliked: [
            {
              dislikedID: req.body.dislike,
              dislikedDate: new Date(new Date()),
            },
          ],
        },
      });

      await user.save();
      res.status(200).json("User has been disliked");
    } else {
      await user.updateOne({
        $pull: { disliked: { dislikedID: req.body.dislike } },
      });
      await user.save();
      res.status(200).json("Removed disliked from user");
    }
  } catch (error) {
    res.status(400);
    throw new Error("Bad Request!");
  }
});

//block user & ublock user controller ***
const blockUserController = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.blocked.includes(req.body.block)) {
      await user.updateOne({ $push: { blocked: req.body.block } });
      await user.save();
      res.status(200).json("User has been blocked");
    } else {
      await user.updateOne({ $pull: { blocked: req.body.block } });
      await user.save();
      res.status(200).json("User has been unblocked");
    }
  } catch (error) {
    res.status(400);
    throw new Error("Bad Request!");
  }
});

module.exports = {
  getLoggedInUser,
  getUserController,
  getAllUserController,
  updateUserController,
  updateUsersTestController,
  updateUserPasswordController,
  profilePhotoUploadController,
  profilePhotoDeleteController,
  photoUploadController,
  photoDeleteController,
  likeUserController,
  dislikeUserController,
  blockUserController,
};
