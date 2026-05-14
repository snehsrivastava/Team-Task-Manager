const Task = require('../models/Task');
const Project = require('../models/Project');
const Activity = require('../models/Activity');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

exports.getTasks = asyncHandler(async (req, res) => {
  const { project, status, priority, assignedTo, search, page = 1, limit = 50 } = req.query;
  const filter = {};

  if (project) filter.project = project;
  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (assignedTo) filter.assignedTo = assignedTo;
  if (search) filter.title = { $regex: search, $options: 'i' };

  // Non-admins see tasks from their projects OR assigned directly to them
  if (req.user.role !== 'admin') {
    const userProjects = await Project.find({ members: req.user._id }).select('_id');
    const projectIds = userProjects.map(p => p._id);
    const selectedProject = filter.project;
    delete filter.project;
    if (selectedProject) {
      // within a specific project: must be a member of it OR assigned to the task
      filter.project = selectedProject;
      filter.$or = [
        { project: { $in: projectIds } },
        { assignedTo: req.user._id },
      ];
    } else {
      filter.$or = [
        { project: { $in: projectIds } },
        { assignedTo: req.user._id },
      ];
    }
  }

  const skip = (page - 1) * limit;
  const [tasks, total] = await Promise.all([
    Task.find(filter)
      .populate('assignedTo', 'name avatar email')
      .populate('createdBy', 'name avatar')
      .populate('project', 'title')
      .populate('comments.user', 'name avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Task.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: tasks,
    pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / limit) },
  });
});

exports.getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)
    .populate('assignedTo', 'name avatar email')
    .populate('createdBy', 'name avatar')
    .populate('project', 'title members')
    .populate('comments.user', 'name avatar');

  if (!task) throw new AppError('Task not found', 404);

  res.json({ success: true, data: task });
});

exports.createTask = asyncHandler(async (req, res) => {
  // Verify project exists
  const project = await Project.findById(req.body.project);
  if (!project) throw new AppError('Project not found', 404);

  const task = await Task.create({
    ...req.body,
    createdBy: req.user._id,
  });

  await Activity.create({
    user: req.user._id,
    action: 'created_task',
    target: task.title,
    targetId: task._id,
    project: task.project,
  });

  const populated = await task.populate([
    { path: 'assignedTo', select: 'name avatar email' },
    { path: 'createdBy', select: 'name avatar' },
    { path: 'project', select: 'title' },
  ]);

  res.status(201).json({ success: true, data: populated });
});

exports.updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) throw new AppError('Task not found', 404);

  // Members can only update tasks assigned to them
  if (req.user.role !== 'admin' && !task.assignedTo?.equals(req.user._id) && !task.createdBy.equals(req.user._id)) {
    throw new AppError('Not authorized to update this task', 403);
  }

  Object.assign(task, req.body);
  await task.save();

  await Activity.create({
    user: req.user._id,
    action: 'updated_task',
    target: task.title,
    targetId: task._id,
    project: task.project,
  });

  const populated = await task.populate([
    { path: 'assignedTo', select: 'name avatar email' },
    { path: 'createdBy', select: 'name avatar' },
    { path: 'project', select: 'title' },
  ]);

  res.json({ success: true, data: populated });
});

exports.updateTaskStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const task = await Task.findById(req.params.id);
  if (!task) throw new AppError('Task not found', 404);

  const oldStatus = task.status;
  task.status = status;
  await task.save();

  await Activity.create({
    user: req.user._id,
    action: 'changed_status',
    target: task.title,
    targetId: task._id,
    project: task.project,
    meta: { from: oldStatus, to: status },
  });

  const populated = await task.populate([
    { path: 'assignedTo', select: 'name avatar email' },
    { path: 'createdBy', select: 'name avatar' },
    { path: 'project', select: 'title' },
  ]);

  res.json({ success: true, data: populated });
});

exports.deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) throw new AppError('Task not found', 404);

  await Activity.create({
    user: req.user._id,
    action: 'deleted_task',
    target: task.title,
    targetId: task._id,
    project: task.project,
  });

  await task.deleteOne();
  res.json({ success: true, message: 'Task deleted' });
});

exports.addComment = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) throw new AppError('Task not found', 404);

  task.comments.push({ user: req.user._id, text: req.body.text });
  await task.save();

  await Activity.create({
    user: req.user._id,
    action: 'added_comment',
    target: task.title,
    targetId: task._id,
    project: task.project,
  });

  const populated = await task.populate('comments.user', 'name avatar');
  res.json({ success: true, data: populated });
});
