const router = require('express').Router();
const { getStats, getActivity } = require('../controllers/dashboardController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/stats', getStats);
router.get('/activity', getActivity);

module.exports = router;
