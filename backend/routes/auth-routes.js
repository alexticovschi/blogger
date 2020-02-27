const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/auth-controller');

// validators
const { runValidation } = require('../validators');
const { userSignupValidator } = require('../validators/auth-validator');

// if validation is passed, execute the code in signup controller
router.post('/signup', userSignupValidator, runValidation, signup);

module.exports = router;
