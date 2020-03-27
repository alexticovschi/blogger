const express = require('express');
const router = express.Router();
const {
  requireSignin,
  adminMiddleWare,
  authMiddleWare
} = require('../controllers/auth-controller');
const { read, publicProfile } = require('../controllers/user-controller');

router.get('/profile', requireSignin, adminMiddleWare, read);
router.get('/profile/:username', publicProfile);

module.exports = router;
