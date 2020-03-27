const User = require('../models/user-model');
const Blog = require('../models/blog-model');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.read = (req, res) => {
  // set user hashed password to undefined and return its profile
  req.profile.hashed_password = undefined;
  return res.json(req.profile);
};

exports.publicProfile = (req, res) => {
  let { username } = req.params;
  let user;
  let blogs;

  User.findOne({ username }).exec((err, userFromDB) => {
    if (err || !userFromDB) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    user = userFromDB;

    Blog.find({ postedBy: user._id })
      .populate('categories', '_id name slug')
      .populate('tags', '_id name slug')
      .populate('postedBy', '_id name')
      .limit(10)
      .select(
        '_id title slug excerpt categories tags postedBy createdAt updatedAt'
      )
      .exec((err, data) => {
        if (err || !userFromDB) {
          return res.status(400).json({
            error: errorHandler(err)
          });
        }
        user.photo = undefined;
        res.json({
          user,
          blogs: data
        });
      });
  });
};
