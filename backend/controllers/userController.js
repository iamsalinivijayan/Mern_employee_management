const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const signUp = async (req, res, next) => {
  try {
    const { email, password, isAdmin } = req.body;
    console.log(req.body);

    // encrypting password  docs: https://github.com/dcodeIO/bcrypt.js/blob/master/README.md
    const hashedPwd = bcrypt.hashSync(password, 8);
    console.log("hashed", hashedPwd);

    const user = await User.create({ email, password: hashedPwd, isAdmin });
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // find a user with the email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    // compare passwords (returns true/false)
    const paswordsMatch = bcrypt.compareSync(password, user.password);
    if (!paswordsMatch) {
      res.status(401);
      throw new Error("Incorrect password");
    }

    // create a jwt token docs: https://github.com/auth0/node-jsonwebtoken
    const expirationTime = Date.now() + 1000 * 60 * 60; //Date.now gives the milliseconds from 1970
    const token = jwt.sign(
      { sub: user._id, exp: expirationTime, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    // set the cookie as an httpOnly cookie so that only the browser and the server has access to it (send it as json is not secure) docs: https://www.npmjs.com/package/cookie#expires
    res.cookie("Authorization", token, {
      expires: new Date(expirationTime),
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).json({ isAdmin: user.isAdmin });
    // res.status(200).json({ isAdmin: user.isAdmin });
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

const logOut = (req, res, next) => {
  try {
    res.clearCookie("Authorization");
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const checkAuth = (req, res, next) => {
  try {
    console.log("inside check auth");
    res.status(200).json({ authenticated: true, isAdmin: req.user.isAdmin });
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp, logIn, logOut, checkAuth };
