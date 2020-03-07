const express = require('express');
const router = express.Router();
const { create } = require('../controllers/category-controller');

// validators
const { runValidation } = require('../validators');
const { categoryCreateValidator } = require('../validators/category-validator');
const {
  requireSignin,
  adminMiddleWare
} = require('../controllers/auth-controller');

router.post(
  '/category',
  categoryCreateValidator,
  runValidation,
  requireSignin,
  adminMiddleWare,
  create
);

module.exports = router;
