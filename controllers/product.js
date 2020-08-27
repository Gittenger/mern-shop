const Product = require("../models/product");
const fs = require("fs");
const formidable = require("formidable");
const _ = require("lodash");
const { errorHandler } = require("../utils/dbErrorHandler");

exports.productById = (req, res, next, id) => {
	Product.findById(id).exec((err, product) => {
		if (err || !product) {
			return res.status(400).json({
				errror: "Product not found",
			});
		}

		req.product = product;
		next();
	});
};

exports.read = (req, res) => {
	//create separate method for getting photo
	req.product.photo = undefined;
	return res.json(req.product);
};

exports.create = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields, files) => {
		if (err) {
			return res.status(400).json({
				error: "Image could not be uploaded",
			});
		}

		const { name, description, price, category, shipping, quantity } = fields;

		if (!name || !description || !price || !category || !shipping || !quantity) {
			return res.status(400).json({
				error: "All fields are required",
			});
		}

		let product = new Product(fields);

		if (files.photo) {
			if (files.photo.size > 1000000) {
				return res.status(400).json({
					error: "Image must be less than 1mb in size",
				});
			}

			product.photo.data = fs.readFileSync(files.photo.path);
			product.photo.contentType = files.photo.type;
		}

		product.save((err, result) => {
			if (err) {
				return res.status(400).json({
					error: errorHandler(err),
				});
			}
			res.json({ result });
		});
	});
};

exports.update = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields, files) => {
		if (err) {
			return res.status(400).json({
				error: "Image could not be uploaded",
			});
		}

		const { name, description, price, category, shipping, quantity } = fields;

		if (!name || !description || !price || !category || !shipping || !quantity) {
			return res.status(400).json({
				error: "All fields are required",
			});
		}

		let product = req.product;
		product = _.extend(product, fields);

		if (files.photo) {
			if (files.photo.size > 1000000) {
				return res.status(400).json({
					error: "Image must be less than 1mb in size",
				});
			}

			product.photo.data = fs.readFileSync(files.photo.path);
			product.photo.contentType = files.photo.type;
		}

		product.save((err, result) => {
			if (err) {
				return res.status(400).json({
					error: errorHandler(err),
				});
			}
			res.json({ result });
		});
	});
};

exports.remove = (req, res) => {
	let product = req.product;
	product.remove((err, deletedProduct) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler(err),
			});
		}
		res.json({
			// deletedProduct,
			message: "Product deleted successfully",
		});
	});
};
