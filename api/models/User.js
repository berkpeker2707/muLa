const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const randomatic = require("randomatic");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
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
    expireAt: {
      type: Date,
      /* Remove doc 5 min after specified date */
      expires: 300,
    },
    accountVerificationToken: {
      type: String,
    },
    accountVerificationTokenExpires: Date,
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
      default: true,
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
      // required: true,
    },
    description: {
      type: String,
      default: "Hasn't written anything yet.",
    },
    userLatitude: {
      type: String,
      // required: true,
    },
    userLongitude: {
      type: String,
      // required: true,
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
    profilePhoto: {
      type: String,
    },
    pictures: {
      type: Array,
      default: [],
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
    timestamps: true,
  }
);

//password encryption
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//matching password
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//account verification
userSchema.methods.createAccountVerificationToken = async function () {
  // create token
  const verificationToken = randomatic("Aa0", 32).toString("hex");
  this.accountVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");
  this.accountVerificationTokenExpires = Date.now() + 3600 * 1000 * 24; //24 hour
  return verificationToken;
};

module.exports = User = mongoose.model("user", userSchema);
