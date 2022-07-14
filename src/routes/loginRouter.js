const express = require('express');

const router = express.Router();

const rescue = require('express-rescue');

const loginController = require('../controllers/loginController');

const validLoginJoi = require('../middlewares/validJoiLogin');

router.post('/', validLoginJoi, rescue(loginController.login));

module.exports = router;