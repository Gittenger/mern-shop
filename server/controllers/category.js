const Category = require("../models/category");
const { errorHandler } = require("../utils/dbErrorHandler");

exports.categoryById = (req, res, next, id) => {
	Category.findById(id).exec((err, category) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler(err),
			});
		} else if (!category) {
			return res.status(400).json({
				message: "Category does not exist",
			});
		}
		req.category = category;
		next();
	});
};

exports.create = (req, res) => {
	const category = new Category(req.body);
	category.save((err, data) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler(err),
			});
		}
		return res.json({ data });
	});
};

exports.read = (req, res) => {
	return res.json(req.category);
};

exports.update = (req, res) => {
	const category = req.category;
	category.name = req.body.name;
	category.save((err, data) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler(err),
			});
		}
		return res.json(data);
	});
};

exports.remove = (req, res) => {
	const category = req.category;
	category.remove((err, data) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler(err),
			});
		}
		return res.json({
			message: "Category successfully deleted",
		});
	});
};

exports.list = (req, res) => {
	Category.find().exec((err, data) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler(err),
			});
		}
		return res.json(data);
	});
};