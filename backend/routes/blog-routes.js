const express = require('express');
const router = express.Router();
const {
  createBlog,
  getBlog,
  getBlogs,
  removeBlog,
  updateBlog,
  getPhoto,
  getAllBlogsCategoriesAndTags
} = require('../controllers/blog-controller');
const {
  requireSignin,
  adminMiddleWare
} = require('../controllers/auth-controller');

router.post('/blog', requireSignin, adminMiddleWare, createBlog);
router.get('/blog/:slug', getBlog);
router.get('/blogs', getBlogs);
router.delete('/blog/:slug', requireSignin, adminMiddleWare, removeBlog);
router.put('/blog/:slug', requireSignin, adminMiddleWare, updateBlog);
router.get('/blog/photo/:slug', getPhoto);
router.post('/blogs-categories-tags', getAllBlogsCategoriesAndTags);

module.exports = router;
