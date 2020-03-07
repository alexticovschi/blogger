const express = require('express');
const router = express.Router();
const {
  createCategory,
  getCategories,
  getCategory,
  removeCategory
} = require('../controllers/category-controller');

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
  createCategory
);
router.get('/categories', getCategories);
router.get('/category/:slug', getCategory);
router.delete(
  '/category/:slug',
  requireSignin,
  adminMiddleWare,
  removeCategory
);

module.exports = router;
