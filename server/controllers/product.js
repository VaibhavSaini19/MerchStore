const Product = require("../models/product");
const formiadble = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
	Product.findById(id)
		.populate("category")
		.exec((err, product) => {
			if (err || !product) {
				return res.status(400).json({
					error: "Product not found"
				});
			}
			req.product = product;
			next();
		});
};

exports.createProduct = (req, res) => {
	let form = new formiadble.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields, file) => {
		if (err) {
			return res.status(400).json({
				error: "Problem with image"
			});
		}
		const { name, description, price, category, stock } = fields;
		if (!name || !description || !price || !category || !stock) {
			return res.status(400).json({
				error: "Please include all fields"
			});
		}
		let product = new Product(fields);
		if (file.photo) {
			if (file.photo.size > 3 * 1024 * 1024) {
				return res.status(400).json({
					error: "File size too big"
				});
			}
			product.photo.data = fs.readFileSync(file.photo.path);
			product.photo.contentType = file.photo.type;
		}
		product.save((err, product) => {
			if (err || !product) {
				return res.status(400).json({
					error: "Saving product in DB failed"
				});
			}
			res.json(product);
		});
	});
};

exports.getProduct = (req, res) => {
	req.product.photo = undefined;
	res.json(req.product);
};

exports.photo = (req, res, next) => {
	if (req.product.photo.data) {
		res.set("Content-Type", req.product.photo.contentType);
		return res.send(req.product.photo.data);
	}
	next();
};

exports.deleteProduct = (req, res) => {
	let product = req.product;
	product.remove((err, deletedProduct) => {
		if (err) {
			return res.status(400).json({
				error: "Failed to delete product from DB"
			});
		}
		res.json({
			msg: "Successfully deleted"
		});
	});
};

exports.updateProduct = (req, res) => {
	let form = new formiadble.IncomingForm();
	form.keepExtensions = true;

	form.parse(req, (err, fields, file) => {
		if (err) {
			return res.status(400).json({
				error: "Problem with image"
			});
		}

		let product = req.product;
		product = _.extend(product, fields);
		if (file.photo) {
			if (file.photo.size > 3 * 1024 * 1024) {
				return res.status(400).json({
					error: "File size too big"
				});
			}
			product.photo.data = fs.readFileSync(file.photo.path);
			product.photo.contentType = file.photo.type;
		}
		product.save((err, product) => {
			if (err || !product) {
				return res.status(400).json({
					error: "Failed to update product in DB"
				});
			}
			res.json(product);
		});
	});
};

exports.getAllProducts = (req, res) => {
	let limit = req.query.limit ? parseInt(req.query.limit) : 8;
	let sortBy = req.query.sortBy ? req.query.limit : "_id";
	Product.find()
		.select("-photo")
		.populate("category")
		.sort([[sortBy, "asc"]])
		.limit(limit)
		.exec((err, products) => {
			if (err || !products) {
				return res.json({
					error: "No products found in DB"
				});
			}
			res.json(products);
		});
};

exports.updateStock = (req, res, next) => {
	let myOperations = req.body.order.products.map(product => {
		return {
			updateOne: {
				filter: { _id: product._id },
				update: { $inc: { stock: -product.count, sold: +product.count } }
			}
		};
	});
	Product.bulkWrite(myOperations, {}, (err, products) => {
		if (err) {
			return res.status(400).json({
				error: "Bulk operation failed"
			});
		}
		next();
	});
};

exports.getAllUniqueCategories = (req, res) => {
	Product.distinct("category", {}, (err, categories) => {
		if (err || !categories) {
			return res.status(400).json({
				error: "No categories found"
			});
		}
		res.json(categories);
	});
};
