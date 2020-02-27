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

// if validation is passed, execute the code in signup controller
router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userSigninValidator, runValidation, signin);
router.get('/signout', signout);

// test
router.get('/secret', requireSignin, (req, res) => {
  res.json({
    message: 'you have access to secret page'
  });
});

module.exports = router;
