const express = require('express');
const router = express.Router();
const {
  requireSignin,
  adminMiddleWare,
  authMiddleWare
} = require('../controllers/auth-controller');
const {
  read,
  publicProfile,
  updateProfile,
  uploadProfilePhoto
} = require('../controllers/user-controller');

router.get('/profile', requireSignin, adminMiddleWare, read);
router.get('/user/:username', publicProfile);
router.put('/user/update', requireSignin, authMiddleWare, updateProfile);
router.get('/user/photo/:username', uploadProfilePhoto);

module.exports = router;
