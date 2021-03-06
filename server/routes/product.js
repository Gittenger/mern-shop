const express = require("express");
const router = express.Router();

//import methods
const {
	create,
	productById,
	read,
	remove,
	update,
	list,
	listRelated,
	listCategories,
	listBySearch,
	photo,
} = require("../controllers/product.js");
const { requireSignIn, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/product/:productId", read);
router.post("/product/create/:userId", requireSignIn, isAuth, isAdmin, create);
router.delete(
	"/product/:productId/:userId",
	requireSignIn,
	isAuth,
	isAdmin,
	remove
);
router.put(
	"/product/:productId/:userId",
	requireSignIn,
	isAuth,
	isAdmin,
	update
);

router.get("/products", list);
router.get("/products/related/:productId", listRelated);
router.get("/products/categories", listCategories);

router.param("userId", userById);
router.param("productId", productById);

router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId", photo);

module.exports = router;
