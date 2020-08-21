const express = require("express");
const router = express.Router();

//import methods
const { signUp } = require("../controllers/user.js");
const { userSignupValidator } = require("../validator/index");

router.post("/signup", userSignupValidator, signUp);

module.exports = router;
