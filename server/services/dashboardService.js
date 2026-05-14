const Task = require('../models/Task');
const Project = require('../models/Project');
const Activity = require('../models/Activity');

exports.getStats = async (userId, role) => {
  const projectFilter = role === 'admin' ? {} : { members: userId };
  const projects = await Project.find(projectFilter).select('_id');
  const projectIds = projects.map(p => p._id);

  // Members see tasks in their projects OR assigned to them
  const taskMatch = role === 'admin'
    ? {}
    : { $or: [{ project: { $in: projectIds } }, { assignedTo: userId }] };

  const [totalProjects, taskStats, overdueTasks] = await Promise.all([
    projects.length,
    Task.aggregate([
      { $match: taskMatch },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
    Task.countDocuments({
      ...taskMatch,
      status: { $ne: 'done' },
      dueDate: { $lt: new Date() },
    }),
  ]);

  const statusMap = {};
  taskStats.forEach(s => { statusMap[s._id] = s.count; });

  const totalTasks = Object.values(statusMap).reduce((a, b) => a + b, 0);

  return {
    totalProjects,
    totalTasks,
    completedTasks: statusMap.done || 0,
    pendingTasks: (statusMap.todo || 0) + (statusMap.in_progress || 0) + (statusMap.in_review || 0),
    overdueTasks,
    statusBreakdown: {
      todo: statusMap.todo || 0,
      in_progress: statusMap.in_progress || 0,
      in_review: statusMap.in_review || 0,
      done: statusMap.done || 0,
    },
  };
};

exports.getRecentActivity = async (userId, role, limit = 20) => {
  const filter = role === 'admin' ? {} : { user: userId };
  return Activity.find(filter)
    .populate('user', 'name avatar')
    .sort({ createdAt: -1 })
    .limit(limit);
};
