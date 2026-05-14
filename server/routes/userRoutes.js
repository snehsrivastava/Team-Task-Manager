const router = require('express').Router();
const { getUsers, updateProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', getUsers);
router.put('/profile', updateProfile);

module.exports = router;
