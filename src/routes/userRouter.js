const express = require('express');

const router = express.Router();

const rescue = require('express-rescue');

const userController = require('../controllers/userController');

const validCreateUser = require('../middlewares/validJoiCreateUser');

const validJWT = require('../middlewares/validJWT');

router.post('/', validCreateUser, rescue(userController.createUser));

router.get('/', validJWT, rescue(userController.getAllUsers));

module.exports = router;