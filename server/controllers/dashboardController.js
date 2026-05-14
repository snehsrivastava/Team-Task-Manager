const dashboardService = require('../services/dashboardService');
const asyncHandler = require('../utils/asyncHandler');

exports.getStats = asyncHandler(async (req, res) => {
  const stats = await dashboardService.getStats(req.user._id, req.user.role);
  res.json({ success: true, data: stats });
});

exports.getActivity = asyncHandler(async (req, res) => {
  const { limit = 20 } = req.query;
  const activity = await dashboardService.getRecentActivity(req.user._id, req.user.role, Number(limit));
  res.json({ success: true, data: activity });
});
