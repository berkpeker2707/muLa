const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetLink: {
    data: String,
    default: "",
  },
  accountVerified: {
    type: Boolean,
    default: false,
  },
  accountVerificationToken: {
    type: String,
  },
  accountVerificationTokenExpires: {
    Date,
  },
  viewedBy: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  accountCreatedAt: Date,
  lastLogin: Date,
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  job: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "Hasn't written anything yet.",
  },
  userLatitude: {
    type: String,
    required: true,
  },
  userLongitude: {
    type: String,
    required: true,
  },
  language: {
    type: String,
  },
  belief: {
    type: String,
    default: "-",
  },
  politics: {
    type: String,
    default: "-",
  },
  diet: {
    type: String,
  },
  alcohol: {
    type: String,
  },
  smoking: {
    type: String,
  },
  pictures: {},
  picture: {
    type: String,
    default: "defaultProfilePicture.png",
  },
  liked: {
    type: Array,
    default: [],
  },
  likedBy: {
    type: Array,
    default: [],
  },
  disliked: {
    type: Array,
    default: [],
    createdAt: { type: Date, expires: "2m", default: Date.now },
  },
  matched: {
    type: Array,
    default: [],
  },
  blocked: {
    type: Array,
    default: [],
  },
  extraversionValue: {
    type: Number,
  },
  introversionValue: {
    type: Number,
  },
  sensingValue: {
    type: Number,
  },
  intuitionValue: {
    type: Number,
  },
  thinkingValue: {
    type: Number,
  },
  feelingValue: {
    type: Number,
  },
  judgingValue: {
    type: Number,
  },
  perceivingValue: {
    type: Number,
  },
  characterType: {
    type: String,
  },
},
{
  timestamps: true
});

module.exports = User = mongoose.model("user", UserSchema);
