const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authentication = async (req, res, next) => {
  try {
    console.log("inside authentication middleware", req.cookies.Authorization);
    // console.log("req headers--->>>>>",req.headers)
    //   read the token from the request
    const token = req.cookies?.Authorization //? req.cookies?.Authorization : req.headers.cookie ;
    if (!token) {
      res.status(401);
      throw new Error("token not found");
    }

    //   decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // check expiration
    if (Date.now() > decoded.exp) {
      res.status(401);
      throw new Error("token expired");
    }

    // find user using the decoded token
    const user = await User.findById(decoded.sub);
    if (!user) {
      res.status(401);
      throw new Error("unauthorized user");
    }
    // attatch user to the request so that we can use it later
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
