//auth middleware for token checking in header
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../Models/user");

const auth = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      if (token) {
        const decodedUserId = jwt.verify(token, process.env.JWT_KEY);
        //find user by id
        const user = await User.findById(decodedUserId?.id).select("-password");
        //attach the user to the request object
        req.user = user;
        next();
      } else {
        throw new Error("Not authorized.");
      }
    } catch (error) {
      throw new Error("Not authorized.");
    }
  } else {
    throw new Error("Not authorized.");
  }
});

module.exports = auth;
