const User = require('../models/user-model');
const Blog = require('../models/blog-model');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user) {
      return res.status(400).json({
        error: 'Email is taken'
      });
    }

    const { name, email, password } = req.body;
    let username = shortId.generate();
    let profile = `${process.env.CLIENT_URL}/profile/${username}`;

    let newUser = new User({ name, email, password, profile, username });
    newUser.save((error, success) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }

      res.json({
        message: 'Signup successful! Please signin.'
      });
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  // check if user exist
  User.findOne({ email }).exec((error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: 'User with that email does not exist. Please signup.'
      });
    }

    // authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: 'Email and password do not match.'
      });
    }

    // generate a token and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.cookie('token', token, { expiresIn: '1d' });
    const { _id, username, name, email, role } = user;
    return res.json({
      token,
      user: { _id, username, name, email, role }
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie('token');
  res.json({
    message: 'Signout success'
  });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET
});

exports.authMiddleWare = (req, res, next) => {
  const authUserId = req.user._id;
  // based on the user id, query the database and find user
  // then make it available in the request.profile object
  User.findById({ _id: authUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }
    req.profile = user;
    // execute callback function so it can be used as a middleware
    next();
  });
};

exports.adminMiddleWare = (req, res, next) => {
  const adminUserId = req.user._id;
  // based on the user id, query the database and find user
  // then make it available in the request.profile object
  User.findById({ _id: adminUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }
    // check if admin
    if (user.role !== 1) {
      return res.status(400).json({
        error: 'Admin resource. Access denied'
      });
    }

    req.profile = user;
    next();
  });
};

exports.canUpdateAndDeleteBlog = (req, res, next) => {
  const slug = req.params.slug.toLowerCase();

  Blog.findOne({ slug }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }

    let authorizedUser =
      data.postedBy._id.toString() === req.profile._id.toString();

    if (!authorizedUser) {
      return res.status(400).json({
        error: 'You are not authorized!'
      });
    }
    next();
  });
};
