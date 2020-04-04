const express = require('express');
const router = express.Router();
const {
  preSignup,
  signup,
  signin,
  signout,
  requireSignin,
  forgotPassword,
  resetPassword,
  googleLogin
} = require('../controllers/auth-controller');

// validators
const { runValidation } = require('../validators');
const {
  userSignupValidator,
  userSigninValidator,
  forgotPasswordValidator,
  resetPasswordValidator
} = require('../validators/auth-validator');

// if validation is passed, execute the code in signup and signin controllers
router.post('/pre-signup', userSignupValidator, runValidation, preSignup);
router.post('/signup', signup);
router.post('/signin', userSigninValidator, runValidation, signin);
router.get('/signout', signout);
router.put(
  '/forgot-password',
  forgotPasswordValidator,
  runValidation,
  forgotPassword
);
router.put(
  '/reset-password',
  resetPasswordValidator,
  runValidation,
  resetPassword
);

// *** GOOGLE LOGIN ****
router.post('/google-login', googleLogin);

// the requireSignin middleware makes the user available in the request object by default
// router.get('/secret', requireSignin, (req, res) => {
//   res.json({
//     user: req.user
//   });
// });

module.exports = router;
