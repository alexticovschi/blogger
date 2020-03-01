const User = require('../models/user-model');

exports.read = (req, res) => {
  // set user hashed password to undefined and return its profile
  req.profile.hashed_password = undefined;
  return res.json(req.profile);
};
