const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  //Check token
  if (!token) {
    return res.status(401).json({ msg: "Access Denied." });
  }

  try {
    //Verify token
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    //Add user from payload
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Access Denied." });
  }
};
