const User = require("../models/user");
const { errorHandler } = require("../utils/dbErrorHandler");

exports.signUp = (req, res) => {
  console.log("req-body", req.body);
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