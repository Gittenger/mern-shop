const express = require("express");
const router = express.Router();

//import methods
const { create } = require("../controllers/category.js");
const { requireSignIn, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.post("/category/create/:userId", requireSignIn, isAuth, isAdmin, create);

router.param("userId", userById);

module.exports = router;
