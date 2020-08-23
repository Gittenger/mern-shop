const express = require("express");
const router = express.Router();

//import methods
const { userById } = require("../controllers/user.js");
const { requireSignIn, isAdmin, isAuth } = require("../controllers/auth.js");

router.get("/secret/:userId", requireSignIn, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});

//anytime param userId is present in URL, add user to req obj
router.param("userId", userById);

module.exports = router;
