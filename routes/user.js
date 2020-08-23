const express = require("express");
const router = express.Router();

//import methods
const { signUp, signIn, signOut } = require("../controllers/user.js");
const { userSignupValidator } = require("../validator/index");

router.post("/signup", userSignupValidator, signUp);
router.post("/signin", signIn);
router.post("/signout", signOut);

module.exports = router;
