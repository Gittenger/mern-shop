const express = require("express");
const router = express.Router();

//import methods
const {
	signUp,
	signIn,
	signOut,
	requireSignIn,
} = require("../controllers/auth.js");
const { userSignupValidator } = require("../validator/index");

router.post("/signup", userSignupValidator, signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);

module.exports = router;
