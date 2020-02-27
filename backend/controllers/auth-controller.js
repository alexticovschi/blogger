const User = require('../models/user-model');
const shortId = require('shortid');

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
