const express = require('express');
const router = express.Router();
const {
  createBlog,
  getBlog,
  getBlogs,
  removeBlog,
  updateBlog,
  getPhoto,
  getAllBlogsCategoriesAndTags,
  getRelatedBlogs,
  blogSearch,
  getUserBlogs
} = require('../controllers/blog-controller');
const {
  requireSignin,
  adminMiddleWare,
  authMiddleWare,
  canUpdateAndDeleteBlog
} = require('../controllers/auth-controller');

router.post('/blog', requireSignin, adminMiddleWare, createBlog);
router.get('/blog/:slug', getBlog);
router.get('/blogs', getBlogs);
router.delete('/blog/:slug', requireSignin, adminMiddleWare, removeBlog);
router.put('/blog/:slug', requireSignin, adminMiddleWare, updateBlog);
router.get('/blog/photo/:slug', getPhoto);
router.post('/blogs-categories-tags', getAllBlogsCategoriesAndTags);
router.post('/blogs/related', getRelatedBlogs);
router.get('/blogs/search', blogSearch);

// auth user create blog
router.get('/:username/blogs', getUserBlogs);

router.post('/user/blog', requireSignin, authMiddleWare, createBlog);
router.delete(
  '/user/blog/:slug',
  requireSignin,
  authMiddleWare,
  canUpdateAndDeleteBlog,
  removeBlog
);
router.put(
  '/user/blog/:slug',
  requireSignin,
  authMiddleWare,
  canUpdateAndDeleteBlog,
  updateBlog
);

module.exports = router;
