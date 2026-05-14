const router = require('express').Router();
const { register, login, getMe } = require('../controllers/authController');
const { registerRules, loginRules } = require('../validations/authValidation');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');

router.post('/register', registerRules, validate, register);
router.post('/login', loginRules, validate, login);
router.get('/me', auth, getMe);

module.exports = router;
