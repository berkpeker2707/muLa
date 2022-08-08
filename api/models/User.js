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
  pictures: {
  },
  picture:{
  },
  image:{
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
  },
  liked:{
    type: Array,
    default:[]
  },
  likedBy:{
    type: Array,
    default:[]
  },
  disliked:{
    type:Array,
    default:[],
    createdAt: { type: Date, expires: '2m', default: Date.now }
  },
  matched:{
    type: Array,
    default:[]
  },
  blocked:{
    type: Array,
    default:[]
  },
  // liked: [{}],
  // likedBy: [{}],
  // matched: [{}],
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
});

module.exports = User = mongoose.model("user", UserSchema);
