const express = require('express');

const router = express.Router();

const rescue = require('express-rescue');

const postController = require('../controllers/postController');

const validPost = require('../middlewares/validPostCreate');

const validJWT = require('../middlewares/validJWT');

const validUpdatePost = require('../middlewares/validUpdatePost');

router.get('/search', validJWT, rescue(postController.getQueryAll));

router.post('/', validJWT, validPost, rescue(postController.createBlogPost));

router.get('/', validJWT, rescue(postController.getAllPosts));

router.get('/:id', validJWT, rescue(postController.getPostId));

router.put('/:id', validJWT, validUpdatePost, rescue(postController.updatePost));

router.delete('/:id', validJWT, rescue(postController.deletePost));

module.exports = router;