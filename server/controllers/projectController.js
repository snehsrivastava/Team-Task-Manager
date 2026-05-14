const Project = require('../models/Project');
const Task = require('../models/Task');
const Activity = require('../models/Activity');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

exports.getProjects = asyncHandler(async (req, res) => {
  const { status, search, page = 1, limit = 12 } = req.query;
  const filter = {};

  // Non-admins only see their projects
  if (req.user.role !== 'admin') {
    filter.members = req.user._id;
  }
  if (status) filter.status = status;
  if (search) filter.title = { $regex: search, $options: 'i' };

  const skip = (page - 1) * limit;
  const [projects, total] = await Promise.all([
    Project.find(filter)
      .populate('members', 'name email avatar')
      .populate('createdBy', 'name avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Project.countDocuments(filter),
  ]);

  // Attach task counts to each project
  const projectsWithStats = await Promise.all(
    projects.map(async (project) => {
      const taskCounts = await Task.aggregate([
        { $match: { project: project._id } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]);

      const stats = { total: 0, done: 0 };
      taskCounts.forEach(tc => {
        stats.total += tc.count;
        if (tc._id === 'done') stats.done = tc.count;
      });

      return {
        ...project.toObject(),
        taskStats: stats,
        progress: stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0,
      };
    })
  );

  res.json({
    success: true,
    data: projectsWithStats,
    pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / limit) },
  });
});

exports.getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)
    .populate('members', 'name email avatar role')
    .populate('createdBy', 'name avatar');

  if (!project) throw new AppError('Project not found', 404);

  // Check access
  if (req.user.role !== 'admin' && !project.members.some(m => m._id.equals(req.user._id))) {
    throw new AppError('Access denied', 403);
  }

  res.json({ success: true, data: project });
});

exports.createProject = asyncHandler(async (req, res) => {
  const project = await Project.create({
    ...req.body,
    createdBy: req.user._id,
  });

  await Activity.create({
    user: req.user._id,
    action: 'created_project',
    target: project.title,
    targetId: project._id,
    project: project._id,
  });

  const populated = await project.populate([
    { path: 'members', select: 'name email avatar' },
    { path: 'createdBy', select: 'name avatar' },
  ]);

  res.status(201).json({ success: true, data: populated });
});

exports.updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new AppError('Project not found', 404);

  Object.assign(project, req.body);
  await project.save();

  await Activity.create({
    user: req.user._id,
    action: 'updated_project',
    target: project.title,
    targetId: project._id,
    project: project._id,
  });

  const populated = await project.populate([
    { path: 'members', select: 'name email avatar' },
    { path: 'createdBy', select: 'name avatar' },
  ]);

  res.json({ success: true, data: populated });
});

exports.deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new AppError('Project not found', 404);

  // Delete all associated tasks
  await Task.deleteMany({ project: project._id });
  await Activity.create({
    user: req.user._id,
    action: 'deleted_project',
    target: project.title,
    targetId: project._id,
  });
  await project.deleteOne();

  res.json({ success: true, message: 'Project deleted' });
});

exports.addMember = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const project = await Project.findById(req.params.id);
  if (!project) throw new AppError('Project not found', 404);

  if (project.members.includes(userId)) {
    throw new AppError('User is already a member', 400);
  }

  project.members.push(userId);
  await project.save();

  await Activity.create({
    user: req.user._id,
    action: 'added_member',
    target: project.title,
    targetId: project._id,
    project: project._id,
    meta: { memberId: userId },
  });

  const populated = await project.populate('members', 'name email avatar role');
  res.json({ success: true, data: populated });
});

exports.removeMember = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new AppError('Project not found', 404);

  project.members = project.members.filter(m => !m.equals(req.params.userId));
  await project.save();

  await Activity.create({
    user: req.user._id,
    action: 'removed_member',
    target: project.title,
    targetId: project._id,
    project: project._id,
    meta: { memberId: req.params.userId },
  });

  const populated = await project.populate('members', 'name email avatar role');
  res.json({ success: true, data: populated });
});
