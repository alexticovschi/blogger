const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controllers/auth-controller');

// validators
const { runValidation } = require('../validators');
const {
  userSignupValidator,
  userSigninValidator
} = require('../validators/auth-validator');

// if validation is passed, execute the code in signup controller
router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userSigninValidator, runValidation, signin);

module.exports = router;
