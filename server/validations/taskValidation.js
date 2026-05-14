const { body } = require('express-validator');

exports.createTaskRules = [
  body('title').trim().notEmpty().withMessage('Task title is required')
    .isLength({ max: 150 }).withMessage('Title must be under 150 characters'),
  body('description').optional().isLength({ max: 1000 }),
  body('project').notEmpty().withMessage('Project is required').isMongoId().withMessage('Invalid project ID'),
  body('assignedTo').optional().isMongoId().withMessage('Invalid user ID'),
  body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']).withMessage('Invalid priority'),
  body('status').optional().isIn(['todo', 'in_progress', 'in_review', 'done']).withMessage('Invalid status'),
  body('dueDate').optional().isISO8601().withMessage('Invalid date format'),
];

exports.updateTaskRules = [
  body('title').optional().trim().notEmpty().isLength({ max: 150 }),
  body('description').optional().isLength({ max: 1000 }),
  body('assignedTo').optional({ nullable: true }),
  body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']),
  body('status').optional().isIn(['todo', 'in_progress', 'in_review', 'done']),
  body('dueDate').optional().isISO8601(),
];

exports.commentRules = [
  body('text').trim().notEmpty().withMessage('Comment text is required')
    .isLength({ max: 500 }).withMessage('Comment must be under 500 characters'),
];
