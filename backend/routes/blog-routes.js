const express = require('express');
const router = express.Router();
const { createBlog } = require('../controllers/blog-controller');
const {
  requireSignin,
  adminMiddleWare
} = require('../controllers/auth-controller');

router.post('/blog', requireSignin, adminMiddleWare, createBlog);

module.exports = router;
