const express = require('express');
const router = express.Router();
const {
  signup,
  signin,
  signout,
  requireSignin
} = require('../controllers/auth-controller');

// validators
const { runValidation } = require('../validators');
const {
  userSignupValidator,
  userSigninValidator
} = require('../validators/auth-validator');

// if validation is passed, execute the code in signup and signin controllers
router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userSigninValidator, runValidation, signin);
router.get('/signout', signout);

// the requireSignin middleware makes the user available in the request object by default
// router.get('/secret', requireSignin, (req, res) => {
//   res.json({
//     user: req.user
//   });
// });

module.exports = router;
