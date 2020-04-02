const express = require('express');
const router = express.Router();
const {
  contactForm,
  contactBlogAuthorForm
} = require('../controllers/form-controller');

// validators
const { runValidation } = require('../validators');
const { contactFormValidator } = require('../validators/form-validator');

router.post('/contact', contactFormValidator, runValidation, contactForm);
router.post(
  '/contact-author',
  contactFormValidator,
  runValidation,
  contactBlogAuthorForm
);

module.exports = router;
