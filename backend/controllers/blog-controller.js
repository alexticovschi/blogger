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

exports.getBlog = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Blog.findOne({ slug })
    .populate('categories', '_id name slug')
    .populate('tags', '_id name slug')
    .populate('postedBy', '_id name username')
    .select(
      '_id title body slug mtitle mdesc categories tags postedBy createdBy updatedAt'
    )
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: errorHandler(err)
        });
      }
      res.json(data);
    });
};

exports.getBlogs = (req, res) => {
  Blog.find({})
    .populate('categories', '_id name slug')
    .populate('tags', '_id name slug')
    .populate('postedBy', '_id name username')
    .select(
      '_id title blog slug excerpt categories tags postedBy createdBy updatedAt'
    )
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: errorHandler(err)
        });
      }
      res.json(data);
    });
};

exports.removeBlog = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Blog.findOneAndRemove({ slug }).exec((err, data) => {
    if (err) {
      return res.json({
        error: errorHandler(err)
      });
    }
    res.json({ message: 'Blog deleted successfully' });
  });
};

exports.updateBlog = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Blog.findOne({ slug }).exec((err, oldBlog) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: 'Image could not be uploaded'
        });
      }

      let slugBeforeMerge = oldBlog.slug;

      // if anything has changed, that will be updated
      // else it will be merged without change
      odBlog = _.merge(oldBlog, fields);

      // keep the old value of slug before merge
      oldBlog.slug = slugBeforeMerge;

      const { body, desc, categories, tags } = fields;

      // if body has changed, update the excerpt and meta description
      if (body) {
        oldBlog.excerpt = smartTrim(body, 320, ' ', ' ...');
        oldBlog.mdesc = stripHtml(body.substring(0, 160));
      }

      // if categories have changed, perform update
      if (categories) {
        oldBlog.categories = categories.split(',');
      }

      // if tags have changed, perform update
      if (tags) {
        oldBlog.tags = tags.split(',');
      }

      // handle files
      if (files.photo) {
        if (files.photo.size > 10000000) {
          return res.status(400).json({
            error: 'Image should be less than 1mb in size'
          });
        }
        oldBlog.photo.data = fs.readFileSync(files.photo.path);
        oldBlog.photo.contentType = files.photo.type;
      }

      // save the updated blog
      oldBlog.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err)
          });
        }
        // result.photo = undefined;
        res.json(result);
      });
    });
  });
};

exports.getPhoto = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Blog.findOne({ slug })
    .select('photo')
    .exec((err, blog) => {
      if (err || !blog) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.set('Content-Type', blog.photo.contentType);
      return res.send(blog.photo.data);
    });
};

exports.getAllBlogsCategoriesAndTags = (req, res) => {
  // set the default limit to 10
  let limit = req.body.limit ? parseInt(req.body.limit) : 10;
  // how many to skip
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  let blogs;
  let categories;
  let tags;

  Blog.find({})
    .populate('categories', '_id name slug')
    .populate('tags', '_id name slug')
    .populate('postedBy', '_id name username')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select(
      '_id title slug excerpt categories tags postedBy createdBy updatedAt'
    )
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: errorHandler(err)
        });
      }
      // blogs
      blogs = data;

      // get all categories
      Category.find({}).exec((err, categoriesData) => {
        if (err) {
          return res.json({
            error: errorHandler(err)
          });
        }
        // categories
        categories = categoriesData;

        // get all tags
        Tag.find({}).exec((err, tagsData) => {
          if (err) {
            return res.json({
              error: errorHandler(err)
            });
          }
          // tags
          tags = tagsData;

          // return all blogs categories and tags
          res.json({ blogs, categories, tags, size: blogs.length });
        });
      });
    });
};

exports.getRelatedBlogs = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 3;
  const { _id, categories } = req.body;

  // find all blogs, not including the current blog, based on categories of the current blog
  Blog.find({ _id: { $ne: _id }, categories: { $in: categories } })
    .limit(limit)
    .populate('postedBy', '_id name profile')
    .select('title slug excerpt postedBy createdAt updatedAt')
    .exec((err, blogs) => {
      if (err) {
        return res.status(400).json({
          error: 'Blogs not found'
        });
      }
      res.json(blogs);
    });
};

exports.blogSearch = (req, res) => {
  // get the request query by the name search
  const { search } = req.query;

  // find blog by the provided string
  if (search) {
    // find blog based on blog title or blog body
    Blog.find(
      {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { body: { $regex: search, $options: 'i' } }
        ]
      },
      (err, blogs) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err)
          });
        }
        res.json(blogs);
      }
    ).select('-photo -body');
  }
};
