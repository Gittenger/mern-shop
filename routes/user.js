const express = require("express");
const router = express.Router();

//import methods
const { signUp } = require("../controllers/user.js");

router.post("/", signUp);

module.exports = router;
