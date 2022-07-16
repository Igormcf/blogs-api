const express = require('express');

const router = express.Router();

const rescue = require('express-rescue');

const postController = require('../controllers/postController');

const validPost = require('../middlewares/validPostCreate');

const validJWT = require('../middlewares/validJWT');

router.post('/', validJWT, validPost, rescue(postController.createBlogPost));

module.exports = router;