const Blog = require('../models/blog-model');
const Category = require('../models/category-model');
const Tag = require('../models/tag-model');
const formidable = require('formidable');
const slugify = require('slugify');
const stripHtml = require('string-strip-html');
const _ = require('lodash');
const { errorHandler } = require('../helpers/dbErrorHandler');
const fs = require('fs');
const { smartTrim } = require('../helpers/blog');

exports.createBlog = (req, res) => {
  // get all form data
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded'
      });
    }

    const { title, body, categories, tags } = fields;

    if (!title || !title.length) {
      return res.status(400).json({
        error: 'Title is required'
      });
    }

    if (!body || !body.length) {
      return res.status(400).json({
        error: 'Content is too short'
      });
    }

    if (!categories || !categories.length === 0) {
      return res.status(400).json({
        error: 'At least one category is required'
      });
    }

    if (!tags || !tags.length === 0) {
      return res.status(400).json({
        error: 'At least one tag is required'
      });
    }

    // create new blog
    let blog = new Blog();
    blog.title = title;
    blog.body = body;
    blog.excerpt = smartTrim(body, 320, '', ' ...');
    blog.slug = slugify(title).toLowerCase();
    blog.mtitle = `${title} - ${process.env.APP_NAME}`;
    blog.mdesc = stripHtml(body.substring(0, 160));
    blog.postedBy = req.user._id;

    // categories and tags
    let categoriesArr = categories && categories.split(',');
    let tagsArr = tags && tags.split(',');

    // handle files
    if (files.photo) {
      if (files.photo.size > 10000000) {
        return res.status(400).json({
          error: 'Image should be less than 1mb in size'
        });
      }
      blog.photo.data = fs.readFileSync(files.photo.path);
      blog.photo.contentType = files.photo.type;
    }

    // save the blog
    blog.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }

      Blog.findByIdAndUpdate(
        result._id,
        {
          $push: { categories: categoriesArr }
        },
        { new: true }
      ).exec((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err)
          });
        } else {
          Blog.findByIdAndUpdate(
            result._id,
            { $push: { tags: tagsArr } },
            { new: true }
          ).exec((err, result) => {
            if (err) {
              return res.status(400).json({
                error: errorHandler(err)
              });
            } else {
              res.json(result);
            }
          });
        }
      });
    });
  });
};
