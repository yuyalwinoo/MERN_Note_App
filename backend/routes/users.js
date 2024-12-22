const express = require('express');

const { register, login, getLoginUser } = require('../controllers/UsersController');
const { handleValidation, registerValidator, loginValidator } = require('../middleware/validation');
const { verifyUserToken } = require('../middleware/auth');

const router = express.Router();

router.post('/register', registerValidator, handleValidation, register);
router.post('/login', loginValidator, handleValidation, login);
router.get('/current', verifyUserToken, getLoginUser);
module.exports = router;
