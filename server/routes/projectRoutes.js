const router = require('express').Router();
const {
  getProjects, getProject, createProject,
  updateProject, deleteProject, addMember, removeMember,
} = require('../controllers/projectController');
const { createProjectRules, updateProjectRules } = require('../validations/projectValidation');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const roleGuard = require('../middleware/roleGuard');

router.use(auth);

router.route('/')
  .get(getProjects)
  .post(roleGuard('admin'), createProjectRules, validate, createProject);

router.route('/:id')
  .get(getProject)
  .put(roleGuard('admin'), updateProjectRules, validate, updateProject)
  .delete(roleGuard('admin'), deleteProject);

router.post('/:id/members', roleGuard('admin'), addMember);
router.delete('/:id/members/:userId', roleGuard('admin'), removeMember);

module.exports = router;
