const Category = require('../models/category-model');
const slugify = require('slugify');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.createCategory = (req, res) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();

  let category = new Category({ name, slug });

  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(data);
  });
};

exports.getCategories = (req, res) => {
  Category.find({}).exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(categories);
  });
};

exports.getCategory = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Category.find({ slug }).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(category);
  });
};

exports.removeCategory = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Category.findOneAndRemove({ slug }).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({ message: 'Category deleted successfully' });
  });
};
