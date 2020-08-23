const User = require("../models/user");
const jwt = require("jsonwebtoken"); // generate signed token
const expressJwt = require("express-jwt"); // auth check

const { errorHandler } = require("../utils/dbErrorHandler");

exports.signUp = (req, res) => {
  const user = new User(req.body);

  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }

    user.hashed_password = undefined;
    user.salt = undefined;

    res.json({
      user,
    });
  });
};

exports.signIn = (req, res) => {
  // find user based on email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please sign up",
      });
    }

    // if user is found, check that username and password match
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password don't match",
      });
    }

    // generate a signed token with user ID and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // persist token with name 't' in cookie with expire date
    res.cookie("t", token, { expire: new Date() + 9999 });
    // return response with user and token to front end client
    const { _id, name, email, role } = user;
    return res.json({
      token,
      user: {
        _id,
        name,
        email,
        role,
      },
    });
  });
};

exports.signOut = (req, res) => {
  res.clearCookie("t");
  res.json({
    message: "signout success",
  });
};
