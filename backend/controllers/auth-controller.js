const User = require('../models/user-model');
const Blog = require('../models/blog-model');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const _ = require('lodash');
const { errorHandler } = require('../helpers/dbErrorHandler');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.preSignup = (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    // if user exists, return message
    if (user) {
      return res.status(400).json({
        error: 'Email is taken'
      });
    }
    // else proceed further
    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      {
        expiresIn: '10m'
      }
    );

    // information to be sent to user by email
    const emailData = {
      to: email,
      from: process.env.EMAIL_FROM,
      subject: 'Account activation link',
      html: `
        <h4>Please use the following link to activate your account:</h4>
        <p>${process.env.CLIENT_URL}/auth/account/activate/${token}</p>

        <hr/>
        <p>This email may contain sensitive information</p>
        <a href="https://bloggingcoder.com">https://bloggingcoder.com</a>
    `
    };

    sgMail.send(emailData).then(sent => {
      return res.json({
        message: `
        Email has been sent to ${email}. 
        Follow tthe instructions to activate your account.`
      });
    });
  });
};

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

exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: 'User with that email does not exist'
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, {
      expiresIn: '10m'
    });

    const emailData = {
      to: email,
      from: process.env.EMAIL_FROM,
      subject: 'Password reset link',
      html: `
        <h4>Please use the following link to reset your password:</h4>
        <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>

        <hr/>
        <p>This email may contain sensitive information</p>
        <a href="https://bloggingcoder.com">https://bloggingcoder.com</a>
    `
    };

    return user.updateOne({ resetPasswordLink: token }, (err, success) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      } else {
        sgMail.send(emailData).then(sent =>
          res.json({
            message: `
              Email has been sent to ${email}. 
              Follow the instructions to reset your password. 
              Link expires in 10min
              `
          })
        );
      }
    });
  });
};

exports.resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  // check if you have the reset password
  if (resetPasswordLink) {
    jwt.verify(
      // verify if the token has expired
      resetPasswordLink,
      process.env.JWT_RESET_PASSWORD,
      (err, decoded) => {
        if (err) {
          return res.status(401).json({
            error: 'Expired link. Try again'
          });
        }

        // find the user based on reset password link
        User.findOne({ resetPasswordLink }, (err, user) => {
          if (err || !user) {
            return res.status(401).json({
              error: 'Something went wrong. Try later'
            });
          }

          // update user fields
          const updatedFields = {
            password: newPassword,
            resetPasswordLink: ''
          };

          user = _.extend(user, updatedFields); // update fields that have changed

          // save user with updated information
          user.save((err, result) => {
            if (err) {
              return res.status(401).json({
                error: errorHandler(err)
              });
            }

            res.json({
              message: `Great! Now you can login with your new password`
            });
          });
        });
      }
    );
  }
};
