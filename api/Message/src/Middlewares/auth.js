//auth middleware for token checking in header
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      if (token) {
        const decodedUserId = jwt.verify(token, process.env.JWT_KEY);
        //attach the decodedUserId to the request object
        req.user = decodedUserId;
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
