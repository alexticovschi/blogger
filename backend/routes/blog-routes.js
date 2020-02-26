const express = require('express');
const router = express.Router();
const { time } = require('../controllers/blog-controller');

router.get('/blogs', time);

module.exports = router;
