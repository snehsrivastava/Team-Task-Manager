const { body } = require('express-validator');

exports.createProjectRules = [
  body('title').trim().notEmpty().withMessage('Project title is required')
    .isLength({ max: 100 }).withMessage('Title must be under 100 characters'),
  body('description').optional().isLength({ max: 500 }).withMessage('Description must be under 500 characters'),
  body('dueDate').optional().isISO8601().withMessage('Invalid date format'),
  body('status').optional().isIn(['active', 'completed', 'archived']).withMessage('Invalid status'),
];

exports.updateProjectRules = [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty')
    .isLength({ max: 100 }).withMessage('Title must be under 100 characters'),
  body('description').optional().isLength({ max: 500 }),
  body('dueDate').optional().isISO8601(),
  body('status').optional().isIn(['active', 'completed', 'archived']),
];
