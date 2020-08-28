const express = require("express");
const router = express.Router();

//import methods
const { userById, read, update } = require("../controllers/user.js");
const { requireSignIn, isAdmin, isAuth } = require("../controllers/auth.js");

router.get("/secret/:userId", requireSignIn, isAuth, isAdmin, (req, res) => {
	res.json({
		user: req.profile,
	});
});

router.get("/user/:userId", requireSignIn, isAuth, read);
router.put("/user/:userId", requireSignIn, isAuth, update);

//anytime param userId is present in URL, add user to req obj
router.param("userId", userById);

module.exports = router;
