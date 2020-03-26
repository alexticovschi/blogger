const Tag = require('../models/tag-model');
const Blog = require('../models/blog-model');
const slugify = require('slugify');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.createTag = (req, res) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();

  let tag = new Tag({ name, slug });

  tag.save((err, tagData) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(tagData);
  });
};

exports.getTags = (req, res) => {
  Tag.find({}).exec((err, tags) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(tags);
  });
};

exports.getTag = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Tag.findOne({ slug }).exec((err, tag) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    // res.json(tag);
    Blog.find({ tags: tag })
      .populate('categories', '_id name slug')
      .populate('tags', '_id name slug')
      .populate('postedBy', '_id name')
      .select(
        '_id title slug excerpt categories postedBy tags createdAt updatedAt'
      )
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err)
          });
        }
        res.json({ tag: tag, blogs: data });
      });
  });
};

exports.removeTag = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Tag.findOneAndRemove({ slug }).exec((err, tag) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({ message: 'Tag deleted successfully' });
  });
};
