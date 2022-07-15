const express = require('express');

const router = express.Router();

const rescue = require('express-rescue');

const categoriesController = require('../controllers/categoriesController');

const createCategoryValid = require('../middlewares/validCreateCategory');

const validJWT = require('../middlewares/validJWT');

router.post('/', validJWT, createCategoryValid, rescue(categoriesController.createCategory));

router.get('/', validJWT, rescue(categoriesController.getAllCategories));

module.exports = router;