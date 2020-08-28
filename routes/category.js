const express = require("express");
const router = express.Router();

//import methods
const {
	create,
	read,
	update,
	remove,
	list,
	categoryById,
} = require("../controllers/category.js");
const { requireSignIn, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/category/:categoryId", read);
router.post("/category/create/:userId", requireSignIn, isAuth, isAdmin, create);
router.put(
	"/category/:categoryId/:userId",
	requireSignIn,
	isAuth,
	isAdmin,
	update
);
router.delete(
	"/category/:categoryId/:userId",
	requireSignIn,
	isAuth,
	isAdmin,
	remove
);
router.get("/categories", list);

router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;
