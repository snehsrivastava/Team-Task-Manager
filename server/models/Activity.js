const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  action: {
    type: String,
    required: true,
    enum: [
      'created_project', 'updated_project', 'deleted_project',
      'added_member', 'removed_member',
      'created_task', 'updated_task', 'deleted_task',
      'changed_status', 'added_comment',
    ],
  },
  target: { type: String, required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  meta: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

activitySchema.index({ createdAt: -1 });
activitySchema.index({ project: 1 });

module.exports = mongoose.model('Activity', activitySchema);
