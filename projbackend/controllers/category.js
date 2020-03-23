const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
	Category.findById(id).exec((err, category) => {
		if (err) {
			return res.status(400).json({
				error: "Category not found in DB"
			});
		}
		req.category = category;
		next();
	});
	next();
};

exports.createCategory = (req, res) => {
	const category = new Category(req.body);
	category.save((err, category) => {
		if (err) {
			return res.status(400).json({
				error: "Unable to save category in DB"
			});
		}
		res.json({ category });
	});
};
