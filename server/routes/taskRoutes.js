const router = require('express').Router();
const {
  getTasks, getTask, createTask,
  updateTask, updateTaskStatus, deleteTask, addComment,
} = require('../controllers/taskController');
const { createTaskRules, updateTaskRules, commentRules } = require('../validations/taskValidation');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const roleGuard = require('../middleware/roleGuard');

router.use(auth);

router.route('/')
  .get(getTasks)
  .post(createTaskRules, validate, createTask);

router.route('/:id')
  .get(getTask)
  .put(updateTaskRules, validate, updateTask)
  .delete(roleGuard('admin'), deleteTask);

router.patch('/:id/status', updateTaskStatus);
router.post('/:id/comments', commentRules, validate, addComment);

module.exports = router;
